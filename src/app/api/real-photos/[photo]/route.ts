import { readFile } from "node:fs/promises";
import path from "node:path";

const PHOTO_DIRECTORY = path.join(process.cwd(), "assets", "real photos");
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function getMimeType(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  return "image/jpeg";
}

export async function GET(_: Request, context: { params: Promise<{ photo: string }> }) {
  const { photo } = await context.params;
  const decodedPhoto = decodeURIComponent(photo);
  const sanitizedName = path.basename(decodedPhoto);

  if (
    sanitizedName !== decodedPhoto ||
    !ALLOWED_EXTENSIONS.has(path.extname(sanitizedName).toLowerCase())
  ) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(PHOTO_DIRECTORY, sanitizedName);

  try {
    const file = await readFile(filePath);
    return new Response(file, {
      headers: {
        "Content-Type": getMimeType(sanitizedName),
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
