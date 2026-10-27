import assert from "node:assert/strict";
import { test } from "node:test";
import { upsertPreviewComment, validatePreviewUrl } from "./preview-comment.mjs";

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

const context = { repo: { owner: "codse", repo: "animata" }, issue: { number: 123 } };
const url = "https://pr-123.animata.example.workers.dev";

function fixture(comments = []) {
  const calls = { list: [], create: [], update: [] };
  const github = {
    paginate: async (method, params) => {
      assert.equal(method, github.rest.issues.listComments);
      calls.list.push(params);
      return comments;
    },
    rest: {
      issues: {
        listComments() {},
        createComment: async (params) => calls.create.push(params),
        updateComment: async (params) => calls.update.push(params),
      },
    },
  };
  return { github, calls };
}

test("creates one marked comment when none exists", async () => {
  const { github, calls } = fixture();
  await upsertPreviewComment(github, context, url);
  assert.equal(calls.create.length, 1);
  assert.equal(calls.update.length, 0);
  assert.match(calls.create[0].body, /<!-- animata-worker-preview -->/);
  assert.ok(calls.create[0].body.endsWith(url));
  assert.equal(calls.create[0].issue_number, 123);
});

test("updates the existing bot comment across paginated results", async () => {
  const comments = Array.from({ length: 100 }, (_, id) => ({ id, body: "Discussion" }));
  comments.push({
    id: 101,
    user: { login: "github-actions[bot]" },
    body: "<!-- animata-worker-preview -->\nPrevious deployment",
  });
  const { github, calls } = fixture(comments);
  await upsertPreviewComment(github, context, url);
  assert.equal(calls.list[0].per_page, 100);
  assert.equal(calls.create.length, 0);
  assert.equal(calls.update.length, 1);
  assert.equal(calls.update[0].comment_id, 101);
  assert.ok(calls.update[0].body.endsWith(url));
});

test("adopts the old deployment comment instead of posting another", async () => {
  const { github, calls } = fixture([
    {
      id: 7,
      user: { login: "github-actions[bot]" },
      body: "🚀 Preview deployed to: https://old.example.com",
    },
  ]);
  await upsertPreviewComment(github, context, url);
  assert.equal(calls.create.length, 0);
  assert.equal(calls.update[0].comment_id, 7);
});

test("does not edit matching comments from people or other bots", async () => {
  const { github, calls } = fixture([
    { id: 1, user: { login: "contributor" }, body: "<!-- animata-worker-preview -->" },
    {
      id: 2,
      user: { login: "another-bot[bot]" },
      body: "🚀 Preview deployed to: https://old.example.com",
    },
  ]);
  await upsertPreviewComment(github, context, url);
  assert.equal(calls.update.length, 0);
  assert.equal(calls.create.length, 1);
});

test("rejects an empty output before any GitHub API call", async () => {
  const { github, calls } = fixture();
  await assert.rejects(upsertPreviewComment(github, context, ""), /valid HTTPS Preview URL/);
  assert.deepEqual(calls, { list: [], create: [], update: [] });
});
