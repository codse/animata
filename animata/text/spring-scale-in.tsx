"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "spring-scale-in",
  target: "per-word",
  enter: {
    durationMs: 360,
    staggerMs: 95,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    from: {
      opacity: 0,
      scale: 0.7,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
  },
  exit: {
    durationMs: 200,
    staggerMs: 80,
    easing: "cubic-bezier(0.7, 0, 0.84, 0)",
    from: {
      opacity: 1,
      scale: 1,
    },
    to: {
      opacity: 0,
      scale: 0.8,
    },
  },
  swap: {
    mode: "crossfade",
    overlapMs: 0,
    microDelayMs: 35,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Lands with a small bounce.",
  "Settles after the spring.",
  "A gentle overshoot.",
];

export interface SpringScaleInProps {
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

export default function SpringScaleIn({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: SpringScaleInProps = {}) {
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
