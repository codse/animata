import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join } from "node:path";

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".map": "application/json",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

/** Static server for `public/preview` (Storybook build). Storybook iframes need http://, not file://.
 * Falls back to the Next `public/` root so component demos that reference local assets like
 * `/music.jpg` or `/jumping-man.png` (not copied into the Storybook build) still resolve. */
export function startPreviewServer(previewDir) {
  const publicRoot = dirname(previewDir); // public/preview -> public
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const rel = urlPath === "/" ? "/index.html" : urlPath;
      let filePath = join(previewDir, rel);
      if (!filePath.startsWith(previewDir) || !existsSync(filePath)) {
        const alt = join(publicRoot, rel); // fall back to public/ root for local demo assets
        filePath = alt.startsWith(publicRoot) && existsSync(alt) ? alt : null;
      }
      if (!filePath) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "content-type": MIME[extname(filePath)] || "application/octet-stream" });
      createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

export function previewServerPort(server) {
  return server.address().port;
}
