"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "top-down-letters",
  target: "per-character",
  enter: {
    durationMs: 400,
    staggerMs: 88,
    easing: "cubic-bezier(0.18, 1, 0.32, 1)",
    from: {
      opacity: 0,
      yPx: -46,
    },
    to: {
      opacity: 1,
      yPx: 0,
    },
  },
  exit: {
    durationMs: 280,
    staggerMs: 28,
    easing: "cubic-bezier(0.7, 0, 0.84, 0)",
    from: {
      opacity: 1,
      yPx: 0,
    },
    to: {
      opacity: 0,
      yPx: 14,
    },
  },
  swap: {
    mode: "sequential",
    overlapMs: 0,
    microDelayMs: 35,
  },
};

const DEFAULT_SAMPLES: readonly string[] = ["Signal", "Header", "Vector"];

export interface TopDownLettersProps {
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

export default function TopDownLetters({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: TopDownLettersProps = {}) {
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
