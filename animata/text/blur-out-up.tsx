"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "blur-out-up",
  target: "per-word",
  enter: {
    durationMs: 560,
    staggerMs: 28,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    from: {
      opacity: 0,
      yPx: 10,
      blurPx: 6,
    },
    to: {
      opacity: 1,
      yPx: 0,
      blurPx: 0,
    },
  },
  exit: {
    durationMs: 480,
    staggerMs: 24,
    easing: "cubic-bezier(0.64, 0, 0.78, 0)",
    from: {
      opacity: 1,
      yPx: 0,
      blurPx: 0,
    },
    to: {
      opacity: 0,
      yPx: -14,
      blurPx: 8,
    },
  },
  swap: {
    mode: "crossfade",
    overlapMs: 170,
    microDelayMs: 35,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Clear in, airy out.",
  "Lightweight typography.",
  "Exit with grace.",
];

export interface BlurOutUpProps {
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

export default function BlurOutUp({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: BlurOutUpProps = {}) {
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
