import { Suspense } from "react";

import { createPageMetadata } from "@/lib/metadata";

import { EasingPlayground } from "./easing-playground";

export const metadata = createPageMetadata({
  title: "Easing Playground | Animata",
  description:
    "Find the timing that feels right for a dropdown, dialog, drawer, or page transition. Try suggested curves, compare two side by side, and copy CSS, Tailwind, Motion, or GSAP code.",
  path: "/easings",
  keywords: [
    "easing",
    "cubic-bezier",
    "easing curves",
    "CSS transitions",
    "animation timing",
    "motion design",
  ],
});

export default function EasingsPage() {
  return (
    <Suspense>
      <EasingPlayground />
    </Suspense>
  );
}
