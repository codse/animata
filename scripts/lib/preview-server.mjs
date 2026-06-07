import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, resolve, sep } from "node:path";

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

function isWithinRoot(root, filePath) {
  const rootResolved = resolve(root);
  const fileResolved = resolve(filePath);
  return fileResolved === rootResolved || fileResolved.startsWith(`${rootResolved}${sep}`);
}

/** Resolve a URL path to a file under root, or null if missing / outside root. */
function safeFileUnderRoot(root, urlPath) {
  if (!urlPath || urlPath.includes("\0") || urlPath.includes("\\")) return null;
  const rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const candidate = resolve(root, rel);
  if (!isWithinRoot(root, candidate) || !existsSync(candidate)) return null;
  return candidate;
}

/** Static server for `public/preview` (Storybook build). Storybook iframes need http://, not file://.
 * Falls back to the Next `public/` root so component demos that reference local assets like
 * `/music.jpg` or `/jumping-man.png` (not copied into the Storybook build) still resolve. */
export function startPreviewServer(previewDir) {
  const publicRoot = dirname(previewDir); // public/preview -> public
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const filePath =
        safeFileUnderRoot(previewDir, urlPath) ?? safeFileUnderRoot(publicRoot, urlPath);
      if (!filePath) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "content-type": MIME[extname(filePath)] || "application/octet-stream" });
      createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolvePromise(server));
  });
}

export function previewServerPort(server) {
  return server.address().port;
}
