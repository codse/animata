import type { CubicBezier } from "@/lib/motion";

export type CodeFormat = "css" | "tailwind" | "motion" | "gsap";

export const CODE_FORMATS: { id: CodeFormat; label: string }[] = [
  { id: "css", label: "CSS" },
  { id: "tailwind", label: "Tailwind" },
  { id: "motion", label: "Motion" },
  { id: "gsap", label: "GSAP" },
];

/** Trims float noise from dragging: 0.2200000001 -> 0.22. */
export function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function formatBezier(bezier: CubicBezier) {
  return bezier.map(round).join(", ");
}

/** "ease-glide" -> "glide", "Quart out" -> "quart-out"; used as --ease-{slug}. */
function slug(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .replace(/^ease-/, "") || "custom"
  );
}

export function codeFor(format: CodeFormat, bezier: CubicBezier, ms: number, name: string) {
  const values = formatBezier(bezier);
  const id = slug(name);

  switch (format) {
    case "css":
      return `:root {
  --ease-${id}: cubic-bezier(${values});
  --duration-${id}: ${ms}ms;
}

.panel {
  transition:
    transform var(--duration-${id}) var(--ease-${id}),
    opacity var(--duration-${id}) var(--ease-${id});
}`;
    case "tailwind":
      return `/* globals.css (Tailwind v4) */
@theme {
  --ease-${id}: cubic-bezier(${values});
}

<div className="transition-transform duration-${ms} ease-${id}" />`;
    case "motion":
      return `import { motion } from "motion/react";

const ${id.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())} = {
  duration: ${round(ms / 1000)},
  ease: [${values}],
} as const;

<motion.div
  animate={{ opacity: 1, y: 0 }}
  transition={${id.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}}
/>`;
    case "gsap":
      return `import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("${id}", "${values}");

gsap.to(".panel", { y: 0, opacity: 1, duration: ${round(ms / 1000)}, ease: "${id}" });`;
  }
}
