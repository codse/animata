/**
 * Footer color tokens — defined in `styles/globals.css` under `:root` and `.dark`.
 * Components reference `var(--footer-*)` so the band tracks site theme.
 */

export const footerSurfaceClassName = "bg-[var(--footer-surface)] text-[var(--footer-ink)]";

/** Inverted brand — readable on the footer band */
export const footerSelectionClassName =
  "selection:bg-[var(--footer-ink)] selection:text-[var(--footer-gold)]";
