import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, "src");
const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".mts", ".cts"]);

const patterns = [
  /from\s+["'][^"']*assets\/[^"']*["']/g,
  /import\s+["'][^"']*assets\/[^"']*["']/g,
  /src\s*=\s*["']\/assets\/[^"']*["']/g,
  /href\s*=\s*["']\/assets\/[^"']*["']/g,
];

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const info = await stat(fullPath);
    if (info.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (exts.has(path.extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function getLineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

const files = await walk(srcDir);
const violations = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const regex of patterns) {
    for (const match of content.matchAll(regex)) {
      const index = match.index ?? 0;
      const line = getLineNumber(content, index);
      violations.push({
        file: path.relative(projectRoot, file).replace(/\\/g, "/"),
        line,
        snippet: match[0],
      });
    }
  }
}

if (violations.length > 0) {
  console.error("Runtime asset policy violation: do not reference `assets/` from `src/`.");
  for (const v of violations) {
    console.error(`- ${v.file}:${v.line} -> ${v.snippet}`);
  }
  process.exit(1);
}

console.log("Runtime asset policy check passed.");
