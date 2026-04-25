"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "focus-blur-resolve",
  target: "whole",
  enter: {
    durationMs: 760,
    staggerMs: 0,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    from: {
      opacity: 0,
      yPx: 14,
      blurPx: 14,
      scale: 1.01,
    },
    to: {
      opacity: 1,
      yPx: 0,
      blurPx: 0,
      scale: 1,
    },
  },
  exit: {
    durationMs: 520,
    staggerMs: 0,
    easing: "cubic-bezier(0.64, 0, 0.78, 0)",
    from: {
      opacity: 1,
      yPx: 0,
      blurPx: 0,
      scale: 1,
    },
    to: {
      opacity: 0,
      yPx: -10,
      blurPx: 10,
      scale: 1,
    },
  },
  swap: {
    mode: "sequential",
    microDelayMs: 35,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Focus resolves clearly.",
  "Detail emerges.",
  "Then softly recedes.",
];

export interface FocusBlurResolveProps {
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
  /** Y-travel multiplier for all transforms. Defaults to the runtime default (0.58) when omitted. */
  yTravel?: number;
  className?: string;
}

export default function FocusBlurResolve({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: FocusBlurResolveProps = {}) {
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
