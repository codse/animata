"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "shared-axis-y",
  target: "per-word",
  enter: {
    durationMs: 180,
    staggerMs: 78,
    easing: "steps(1, end)",
    from: {
      opacity: 0,
      yPx: 0,
      scale: 1,
    },
    to: {
      opacity: 1,
      yPx: 0,
      scale: 1,
    },
  },
  exit: {
    durationMs: 140,
    staggerMs: 78,
    easing: "steps(1, end)",
    from: {
      opacity: 1,
      yPx: 0,
      scale: 1,
    },
    to: {
      opacity: 0,
      yPx: 0,
      scale: 1,
    },
  },
  swap: {
    mode: "crossfade",
    overlapMs: 0,
    microDelayMs: 28,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Layered navigation.",
  "Hierarchy made clear.",
  "Depth with restraint.",
];

export interface SharedAxisYProps {
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

export default function SharedAxisY({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: SharedAxisYProps = {}) {
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
