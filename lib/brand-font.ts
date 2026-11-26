import localFont from "next/font/local";

/** Brand wordmark — logo label, OG cards, footer wordmark */
export const brandFont = localFont({
  src: [
    {
      path: "../public/og-fonts/outfit-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/og-fonts/outfit-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export { brandLabelClassName } from "@/lib/brand-label";
