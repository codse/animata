import { Outfit } from "next/font/google";

/** Brand wordmark — logo label, OG cards, footer wordmark */
export const brandFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-brand",
  display: "swap",
});

export { brandLabelClassName } from "@/lib/brand-label";
