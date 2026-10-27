/** Require a usable Preview URL before publishing a deployment comment. */
export function validatePreviewUrl(url) {
  try {
    if (typeof url !== "string" || /\s/.test(url) || new URL(url).protocol !== "https:") {
      throw new Error("Invalid Preview URL");
    }
  } catch {
    throw new Error("The deployment did not return a valid HTTPS Preview URL");
  }
  return url;
}

/** Update this workflow's existing Preview comment, or create it once. */
export async function upsertPreviewComment(github, context, url) {
  const previewUrl = validatePreviewUrl(url);
  const marker = "<!-- animata-worker-preview -->";
  const target = { ...context.repo, issue_number: context.issue.number };
  const comments = await github.paginate(github.rest.issues.listComments, {
    ...target,
    per_page: 100,
  });
  const previous = comments.find(
    (comment) =>
      comment.user?.login === "github-actions[bot]" &&
      (comment.body?.includes(marker) || comment.body?.startsWith("🚀 Preview deployed to: ")),
  );
  const body = `${marker}\n🚀 Preview deployed to: ${previewUrl}`;
  if (previous) {
    return github.rest.issues.updateComment({
      ...context.repo,
      comment_id: previous.id,
      body,
    });
  }
  return github.rest.issues.createComment({ ...target, body });
}
