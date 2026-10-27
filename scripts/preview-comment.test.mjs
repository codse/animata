import assert from "node:assert/strict";
import { test } from "node:test";
import { validatePreviewUrl } from "./preview-comment.mjs";

test("accepts stable Workers and custom-domain Preview URLs", () => {
  for (const url of [
    "https://pr-123.animata.example.workers.dev",
    "https://pr-123.preview.example.com",
  ]) {
    assert.equal(validatePreviewUrl(url), url);
  }
});

test("rejects missing, malformed and non-HTTPS outputs before posting", () => {
  for (const url of [
    undefined,
    null,
    "",
    "not a URL",
    "http://example.com",
    "javascript:alert(1)",
    "https://example.com\n",
  ]) {
    assert.throws(() => validatePreviewUrl(url), /valid HTTPS Preview URL/);
  }
});
