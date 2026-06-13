/** Referral tag appended to external links leaving animata.design */
const OUTBOUND_REF = "animata.design";

/** Append ?ref=animata.design to http(s) URLs. Query string stays before any #hash. */
export function withOutboundRef(href: string, ref = OUTBOUND_REF) {
  if (!/^https?:\/\//i.test(href)) {
    return href;
  }

  try {
    const url = new URL(href);
    if (!url.searchParams.has("ref")) {
      url.searchParams.set("ref", ref);
    }
    return url.toString();
  } catch {
    return href;
  }
}
