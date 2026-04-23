import { readdir } from "node:fs/promises";
import path from "node:path";

const PHOTO_DIRECTORY = path.join(process.cwd(), "assets", "real photos");
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export async function getRealPhotoSlides(): Promise<string[]> {
  try {
    const files = await readdir(PHOTO_DIRECTORY, { withFileTypes: true });
    return files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => ALLOWED_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((fileName) => `/api/real-photos/${encodeURIComponent(fileName)}`);
  } catch {
    return [];
  }
}
