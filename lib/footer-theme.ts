/**
 * Footer color tokens — defined in `styles/globals.css` under `:root` and `.dark`.
 * Components reference `var(--footer-*)` so the band tracks site theme.
 */

/** GSAP Power4.out — quint deceleration (≈ cubic-bezier(0.22, 1, 0.36, 1)) */
export const footerEasePower4Out = "cubic-bezier(0.22, 1, 0.36, 1)";

export const footerMotionOutClassName =
  "duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

export const footerMotionOutSlowClassName =
  "duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

/** Section dividers in the footer band */
export const footerRuleClassName =
  "border-[color:color-mix(in_oklab,var(--footer-accent)_22%,var(--footer-ink))]";

export const footerSurfaceClassName = "bg-[var(--footer-surface)] text-[var(--footer-ink)]";

/** Inverted brand — readable on the footer band */
export const footerSelectionClassName =
  "selection:bg-[var(--footer-ink)] selection:text-[var(--footer-gold)]";
