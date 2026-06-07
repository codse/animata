import { createReadStream, existsSync, realpathSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, relative, resolve, sep } from "node:path";

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

/** Parse pathname from a request URL; null on malformed input. */
function parseRequestPath(req) {
  try {
    return new URL(req.url || "/", "http://127.0.0.1").pathname;
  } catch {
    return null;
  }
}

/** Resolve urlPath under a canonical root (realpath), or null if outside root / missing. */
function resolveUnderRoot(rootReal, urlPath) {
  if (!urlPath || urlPath.includes("\0")) return null;
  const rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  if (!rel || rel.includes("\\")) return null;

  const candidate = resolve(rootReal, rel);
  const relToRoot = relative(rootReal, candidate);
  if (relToRoot.startsWith(`..${sep}`) || relToRoot === "..") return null;

  let filePath;
  try {
    filePath = realpathSync(candidate);
  } catch {
    return null;
  }
  if (!filePath.startsWith(`${rootReal}${sep}`) && filePath !== rootReal) return null;
  if (!existsSync(filePath)) return null;
  return filePath;
}

/** Static server for `public/preview` (Storybook build). Storybook iframes need http://, not file://.
 * Falls back to the Next `public/` root so component demos that reference local assets like
 * `/music.jpg` or `/jumping-man.png` (not copied into the Storybook build) still resolve. */
export function startPreviewServer(previewDir) {
  const publicRoot = dirname(previewDir); // public/preview -> public
  const previewRoot = realpathSync(resolve(previewDir));
  const publicRootReal = realpathSync(resolve(publicRoot));

  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      const urlPath = parseRequestPath(req);
      if (!urlPath) {
        res.writeHead(400);
        res.end("bad request");
        return;
      }
      const filePath =
        resolveUnderRoot(previewRoot, urlPath) ?? resolveUnderRoot(publicRootReal, urlPath);
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
