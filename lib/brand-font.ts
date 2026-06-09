import { Outfit } from "next/font/google";

/** Brand wordmark — logo label, OG cards, footer wordmark */
export const brandFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-brand",
  display: "swap",
});

/** Crisp geometric wordmark beside the logo mark */
export const brandLabelClassName =
  "font-(family-name:--font-brand) text-[1em] font-semibold lowercase tracking-[-0.045em]";
