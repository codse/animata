"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "fade-through",
  target: "whole",
  enter: {
    durationMs: 420,
    staggerMs: 0,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    from: {
      opacity: 0,
      yPx: 6,
      scale: 0.99,
      blurPx: 2,
    },
    to: {
      opacity: 1,
      yPx: 0,
      scale: 1,
      blurPx: 0,
    },
  },
  exit: {
    durationMs: 260,
    staggerMs: 0,
    easing: "cubic-bezier(0.4, 0, 1, 1)",
    from: {
      opacity: 1,
      yPx: 0,
      scale: 1,
      blurPx: 0,
    },
    to: {
      opacity: 0,
      yPx: -4,
      scale: 1,
      blurPx: 0,
    },
  },
  swap: {
    mode: "crossfade",
    overlapMs: 20,
    microDelayMs: 60,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Calm transitions.",
  "Fade through content.",
  "Focus shifts smoothly.",
];

export interface FadeThroughProps {
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

export default function FadeThrough({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: FadeThroughProps = {}) {
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
