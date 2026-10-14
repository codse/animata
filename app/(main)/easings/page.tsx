import { Suspense } from "react";

import { createPageMetadata } from "@/lib/metadata";

import { EasingPlayground } from "./easing-playground";

export const metadata = createPageMetadata({
  title: "Easing Playground | Animata",
  description:
    "Try easing curves on real interface transitions: dropdowns, dialogs, drawers, tabs, page transitions, and more. Tune the curve and duration, then copy CSS, Tailwind, Motion, or GSAP code.",
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
