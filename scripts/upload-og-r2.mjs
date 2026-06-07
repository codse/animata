// Upload every file under ./.og-out/og/ to the animata R2 bucket (keys match paths).
// Run after `pnpm og:build --no-upload` — the manifest is already written by that step.
//
//   pnpm og:upload
//   pnpm og:upload --dry-run

import { execFile } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const pexec = promisify(execFile);
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const STAGING_DIR = join(ROOT, ".og-out");
const OG_DIR = join(STAGING_DIR, "og");
const BUCKET = process.env.R2_BUCKET || "animata";
const CONCURRENCY = Number(process.env.OG_UPLOAD_CONCURRENCY || 8);
const DRY_RUN = process.argv.includes("--dry-run");

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

async function uploadOne(file) {
  const key = relative(STAGING_DIR, file);
  const contentType = key.endsWith(".gif") ? "image/gif" : "image/png";
  if (DRY_RUN) {
    console.log(`  would upload ${key}`);
    return;
  }
  await pexec(
    "npx",
    [
      "wrangler",
      "r2",
      "object",
      "put",
      `${BUCKET}/${key}`,
      "-f",
      file,
      "--ct",
      contentType,
      "--cc",
      "public,max-age=31536000,immutable",
    ],
    { cwd: ROOT },
  );
  console.log(`  uploaded ${key}`);
}

async function main() {
  if (!statSync(OG_DIR, { throwIfNoEntry: false })?.isDirectory()) {
    throw new Error(`${OG_DIR} missing — run \`pnpm og:build --no-upload\` first`);
  }
  const files = walk(OG_DIR);
  if (!files.length) throw new Error(`No files under ${OG_DIR}`);
  console.log(
    `OG upload: ${files.length} object(s) -> ${BUCKET}${DRY_RUN ? " [dry-run]" : ""}`,
  );

  if (!DRY_RUN) {
    try {
      await pexec("npx", ["wrangler", "whoami"], { cwd: ROOT });
    } catch (err) {
      throw new Error(
        `wrangler auth failed: ${err.message?.split("\n")[0]}. Run \`npx wrangler login\`.`,
      );
    }
  }

  const queue = [...files];
  const workers = Array.from({ length: Math.min(CONCURRENCY, files.length) }, async () => {
    while (queue.length) {
      const file = queue.shift();
      try {
        await uploadOne(file);
      } catch (err) {
        console.error(`  FAILED ${relative(OG_DIR, file)}: ${err.message?.split("\n")[0]}`);
        process.exitCode = 1;
      }
    }
  });
  await Promise.all(workers);
  console.log("OG upload done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
