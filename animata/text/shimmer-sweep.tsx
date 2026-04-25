"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "shimmer-sweep",
  target: "whole",
  enter: {
    durationMs: 850,
    staggerMs: 0,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    from: {
      opacity: 0,
      xPx: -22,
      blurPx: 8,
    },
    to: {
      opacity: 1,
      xPx: 0,
      blurPx: 0,
    },
  },
  exit: {
    durationMs: 650,
    staggerMs: 0,
    easing: "cubic-bezier(0.7, 0, 0.84, 0)",
    from: {
      opacity: 1,
      xPx: 0,
      blurPx: 0,
    },
    to: {
      opacity: 0,
      xPx: 22,
      blurPx: 8,
    },
  },
  swap: {
    mode: "crossfade",
    overlapMs: 0,
    microDelayMs: 36,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Shiny details.",
  "Glide with intent.",
  "Soft and precise.",
];

export interface ShimmerSweepProps {
  /** Text(s) to animate. String = single, array = cycle through. */
  text?: string | string[];
  /** Override enter phase (merged with default). */
  enter?: Partial<TextAnimationPhaseSpec>;
  /** Override exit phase (merged with default). */
  exit?: Partial<TextAnimationPhaseSpec>;
  /** Global speed multiplier. Defaults to the runtime default (0.72) when omitted. */
  speed?: number;
  /** Hold time between enter and exit in ms. Defaults to the runtime default (550) when omitted. */
  holdMs?: number;
  /** Gap between cycles in ms. Defaults to the runtime default (320) when omitted. */
  gapMs?: number;
  /**
   * Y-travel multiplier for all transforms. This preset only animates
   * `xPx` and `blurPx`, so this prop is a no-op here — kept for API symmetry
   * with the rest of the text presets.
   */
  yTravel?: number;
  className?: string;
}

export default function ShimmerSweep({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: ShimmerSweepProps = {}) {
  const spec = useMemo<TextAnimationSpec>(
    () => ({
      ...BASE_SPEC,
      enter: {
        ...BASE_SPEC.enter,
        ...enter,
        from: { ...BASE_SPEC.enter.from, ...enter?.from },
        to: { ...BASE_SPEC.enter.to, ...enter?.to },
      },
      exit: {
        ...BASE_SPEC.exit,
        ...exit,
        from: { ...BASE_SPEC.exit.from, ...exit?.from },
        to: { ...BASE_SPEC.exit.to, ...exit?.to },
      },
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
