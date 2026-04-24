"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "per-word-crossfade",
  target: "per-word",
  enter: {
    durationMs: 700,
    staggerMs: 70,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    from: {
      opacity: 0,
      yPx: 8,
    },
    to: {
      opacity: 1,
      yPx: 0,
    },
  },
  exit: {
    durationMs: 500,
    staggerMs: 40,
    easing: "cubic-bezier(0.7, 0, 0.84, 0)",
    from: {
      opacity: 1,
      yPx: 0,
    },
    to: {
      opacity: 0,
      yPx: -6,
    },
  },
  swap: {
    mode: "crossfade",
    overlapMs: 170,
    microDelayMs: 70,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Beautifully simple.",
  "Designed for focus.",
  "Built for people.",
];

export interface PerWordCrossfadeProps {
  /** Text(s) to animate. String = single, array = cycle through. */
  text?: string | string[];
  /** Override enter phase (merged with default). */
  enter?: Partial<TextAnimationPhaseSpec>;
  /** Override exit phase (merged with default). */
  exit?: Partial<TextAnimationPhaseSpec>;
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

export default function PerWordCrossfade({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: PerWordCrossfadeProps = {}) {
  const spec = useMemo<TextAnimationSpec>(
    () => ({
      ...BASE_SPEC,
      enter: { ...BASE_SPEC.enter, ...enter },
      exit: { ...BASE_SPEC.exit, ...exit },
    }),
    [enter, exit],
  );
  const samples = useMemo(() => {
    if (text == null) return DEFAULT_SAMPLES as string[];
    return Array.isArray(text) ? text : [text];
  }, [text]);
  return (
    <TextAnimator
      spec={spec}
      samples={samples}
      speed={speed}
      holdMs={holdMs}
      gapMs={gapMs}
      yTravel={yTravel}
      className={className}
    />
  );
}
