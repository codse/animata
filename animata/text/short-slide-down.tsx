"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationBuildSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "short-slide-down",
  target: "per-word",
  enter: {
    durationMs: 520,
    staggerMs: 0,
    easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    from: {
      opacity: 0,
      yPx: -24,
      blurPx: 2.4,
      scale: 0.992,
    },
    to: {
      opacity: 1,
      yPx: 0,
      blurPx: 0,
      scale: 1,
    },
  },
  exit: {
    durationMs: 320,
    staggerMs: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    from: {
      opacity: 1,
      yPx: 0,
      blurPx: 0,
      scale: 1,
    },
    to: {
      opacity: 0,
      yPx: 10,
      blurPx: 1.2,
      scale: 1,
    },
  },
  swap: {
    mode: "sequential",
    overlapMs: 0,
    microDelayMs: 70,
  },
  customRenderer: "kinetic-top-build",
  build: {
    firstWordDurationMs: 360,
    pushDurationMs: 500,
    exitDurationMs: 320,
    holdMs: 1100,
    betweenPhrasesMs: 180,
    entryOffsetYPx: -28,
    lineGapPx: 12,
    firstWordYPx: -14,
    entryScale: 0.992,
    entryBlurPx: 2.4,
    reflowBlurPx: 0.7,
    exitYPx: 10,
    exitBlurPx: 1.2,
    easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    exitEasing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

const DEFAULT_PHRASES: readonly (readonly string[])[] = [
  ["Drop", "into", "place"],
  ["Words", "settle", "lower"],
  ["Build", "from", "above"],
];

export interface ShortSlideDownProps {
  /** Phrases to cycle through. Each phrase is an array of words. */
  phrases?: string[][];
  /** Override build params (gap, duration, blur, etc.). */
  build?: Partial<TextAnimationBuildSpec>;
  /** Global speed multiplier. Default 0.72. */
  speed?: number;
  /** Hold time between enter and exit in ms. */
  holdMs?: number;
  /** Gap between cycles in ms. */
  gapMs?: number;
  /** Y-travel multiplier for all transforms. */
  yTravel?: number;
  className?: string;
}

export default function ShortSlideDown({
  phrases,
  build,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: ShortSlideDownProps = {}) {
  const spec = useMemo<TextAnimationSpec>(
    () => ({
      ...BASE_SPEC,
      build: { ...BASE_SPEC.build, ...build },
    }),
    [build],
  );
  const effectivePhrases = useMemo(() => phrases ?? DEFAULT_PHRASES.map((p) => [...p]), [phrases]);
  return (
    <TextAnimator
      spec={spec}
      phrases={effectivePhrases}
      speed={speed}
      holdMs={holdMs}
      gapMs={gapMs}
      yTravel={yTravel}
      className={className}
    />
  );
}
