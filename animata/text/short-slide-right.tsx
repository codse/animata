"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "short-slide-right",
  target: "per-word",
  enter: {
    durationMs: 520,
    staggerMs: 92,
    easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    from: {
      opacity: 1,
      xPx: -24,
      blurPx: 1.2,
    },
    to: {
      opacity: 1,
      xPx: 0,
      blurPx: 0,
    },
  },
  exit: {
    durationMs: 320,
    staggerMs: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    from: {
      opacity: 1,
      xPx: 0,
      blurPx: 0,
    },
    to: {
      opacity: 0,
      xPx: 12,
      blurPx: 1,
    },
  },
  swap: {
    mode: "sequential",
    overlapMs: 0,
    microDelayMs: 70,
  },
  customRenderer: "shared-slide-opacity-stage",
  build: {
    wordOpacityDurationMs: 210,
    wordOpacityFrom: 0,
    wordOpacityTo: 1,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Move with intent.",
  "Words glide across.",
  "Build the rhythm.",
];

export interface ShortSlideRightProps {
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

export default function ShortSlideRight({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: ShortSlideRightProps = {}) {
  const spec = useMemo<TextAnimationSpec>(
    () => ({
      ...BASE_SPEC,
      enter: { ...BASE_SPEC.enter, ...enter },
      exit: { ...BASE_SPEC.exit, ...exit },
    }),
    [enter, exit],
  );
  const samples = useMemo(() => {
    if (text == null) return [...DEFAULT_SAMPLES];
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
