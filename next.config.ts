import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

/** Set only for GitHub Pages project sites (e.g. `/Cryptita-Plays`). Leave unset for Vercel or local dev. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || undefined;

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
