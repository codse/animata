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
