import { Outfit } from "next/font/google";

/** Brand wordmark — logo label, OG cards, footer wordmark */
export const brandFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-outfit",
  display: "swap",
  // Fallback behind Alcyone; preloading it would compete with the fonts that render.
  preload: false,
});

export { brandLabelClassName } from "@/lib/brand-label";
