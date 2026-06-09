/** Footer ground gold — brand yellow (accents, selection, rules) */
export const FOOTER_GOLD = "#FFCC00";

/** Neutral section fill — Apple-style footer gray */
export const FOOTER_SURFACE = "#f5f5f7";

/** Category column title */
export const FOOTER_CATEGORY_TITLE = "#1d1d1f";

/** Category column links */
export const FOOTER_CATEGORY_LINK = "#515154";

/** Electric blue — accents, borders, hovers (not body copy on gold) */
export const FOOTER_ACCENT = "#1A4FFF";

/** Readable body ink — dark navy in the same family (~8:1 on gold) */
export const FOOTER_INK = "#0F1D42";

/** Secondary copy on gold (~6:1) */
export const FOOTER_INK_MUTED = "#1A2D5C";

/** Stamp imprint — brand blue, faded via opacity in FooterStamp */
export const FOOTER_STAMP = "#9f9f9f";

/** GSAP Power4.out — quint deceleration (≈ cubic-bezier(0.22, 1, 0.36, 1)) */
export const footerEasePower4Out = "cubic-bezier(0.22, 1, 0.36, 1)";

export const footerMotionOutClassName =
  "duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

export const footerMotionOutSlowClassName =
  "duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

/** Section dividers in the footer band */
export const footerRuleClassName =
  "border-[color:color-mix(in_oklab,var(--footer-accent)_22%,var(--footer-ink))]";

export const footerSurfaceClassName = "bg-[#f5f5f7] dark:bg-[hsl(var(--surface-alt))]";

export const footerSurfaceStyle = {
  color: FOOTER_INK,
} as const;

/** Inverted brand — readable on the footer band */
export const footerSelectionClassName =
  "selection:bg-[var(--footer-ink)] selection:text-[var(--footer-gold)]";
