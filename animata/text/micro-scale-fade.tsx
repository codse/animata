"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "micro-scale-fade",
  target: "whole",
  enter: {
    durationMs: 600,
    staggerMs: 0,
    easing: "cubic-bezier(0.32, 0.72, 0, 1)",
    from: {
      opacity: 0,
      scale: 0.96,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
  },
  exit: {
    durationMs: 400,
    staggerMs: 0,
    easing: "cubic-bezier(0.7, 0, 0.84, 0)",
    from: {
      opacity: 1,
      scale: 1,
    },
    to: {
      opacity: 0,
      scale: 0.96,
    },
  },
  swap: {
    mode: "crossfade",
    overlapMs: 0,
    microDelayMs: 20,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "A whisper of motion.",
  "Barely a gesture.",
  "Subtle by design.",
];

export interface MicroScaleFadeProps {
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

export default function MicroScaleFade({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: MicroScaleFadeProps = {}) {
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
