import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

/** Set only for GitHub Pages project sites (e.g. `/Cryptita-Plays`). Leave unset for Vercel or local dev. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || undefined;

// #region agent log
{
  const cwd = process.cwd();
  const raw = process.env.NEXT_PUBLIC_BASE_PATH;
  fetch("http://127.0.0.1:7282/ingest/c5064a4c-f1b4-4fcd-801c-1edd4355fe1e", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "f9b26e" },
    body: JSON.stringify({
      sessionId: "f9b26e",
      location: "next.config.ts:config-load",
      message: "Resolved next.config values at load",
      data: {
        hypothesis_H1_envMissing: !raw && process.env.VERCEL === "1",
        hypothesis_H2_rootMismatch: projectRoot !== cwd,
        hypothesis_H3_basePathSet: Boolean(basePath),
        hypothesis_H4_rawLen: raw?.length ?? 0,
        projectRoot,
        cwd,
        basePath: basePath ?? null,
        rawNEXT_PUBLIC_BASE_PATH: raw ?? null,
        vercel: process.env.VERCEL ?? null,
      },
      timestamp: Date.now(),
      hypothesisId: "CONFIG-RESOLUTION",
    }),
  }).catch(() => {});
}
// #endregion

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
