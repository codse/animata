"use client";

import { motion } from "motion/react";

import type { CubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { sampleBezier } from "./curve-editor";

const HEIGHT = 132;
/** Rows and side padding as fractions, shared by every layout so the marker lines up. */
const TIME_Y = 22;
const PLACE_Y = 104;
const PAD = 0.024;
/** Overshooting curves travel past the end; leave room for it. */
const SPAN = 0.93;
const MAX_PROGRESS = 1 / SPAN;

/** Phones get fewer, larger slices; wider screens get the full comb. */
const LAYOUTS = [
  { width: 400, steps: 10, className: "sm:hidden" },
  { width: 1000, steps: 16, className: "hidden sm:block" },
] as const;

/** 0 to 1 progress as a fraction of the figure's width. */
const toFraction = (progress: number) => PAD + progress * (1 - PAD * 2) * SPAN;

type SpacingCombProps = {
  bezier: CubicBezier;
  durationMs: number;
  /** Toggles on every play, sending the marker across. */
  open: boolean;
  reducedMotion: boolean;
  className?: string;
};

/**
 * Easing as spacing. The top row is time, cut into equal slices; the bottom row is where
 * the object is at each slice. Wide gaps read as fast, tight gaps as slow. The lines morph
 * when the curve changes, and a marker plays the motion along the bottom row.
 */
export function SpacingComb({
  bezier,
  durationMs,
  open,
  reducedMotion,
  className,
}: SpacingCombProps) {
  const spring = reducedMotion
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0, duration: 0.6 } as const);

  return (
    <figure className={cn("m-0", className)}>
      <div className="relative">
        {LAYOUTS.map(({ width, steps, className: visibility }) => {
          const toX = (progress: number) => toFraction(progress) * width;
          return (
            <svg
              key={width}
              viewBox={`0 0 ${width} ${HEIGHT}`}
              className={cn("h-auto w-full overflow-visible", visibility)}
              role="img"
              aria-label="Equal slices of time mapped to the object's position along the curve"
            >
              <line x1={toX(0)} y1={TIME_Y} x2={toX(1)} y2={TIME_Y} className="stroke-border" />
              <line x1={toX(0)} y1={PLACE_Y} x2={toX(1)} y2={PLACE_Y} className="stroke-border" />
              {Array.from({ length: steps + 1 }, (_, index) => {
                const t = index / steps;
                // Keep extreme curves inside the figure: slightly behind the start, at most
                // the right edge past the end.
                const progress = Math.min(MAX_PROGRESS, Math.max(-0.03, sampleBezier(bezier, t)));
                const place = toX(progress);
                return (
                  <g key={t}>
                    <motion.line
                      x1={toX(t)}
                      y1={TIME_Y}
                      y2={PLACE_Y}
                      initial={false}
                      animate={{ x2: place }}
                      transition={spring}
                      className="stroke-foreground/20"
                    />
                    <circle cx={toX(t)} cy={TIME_Y} r={3} className="fill-muted-foreground/60" />
                    <motion.circle
                      cy={PLACE_Y}
                      r={4.5}
                      initial={false}
                      animate={{ cx: place }}
                      transition={spring}
                      className="fill-background stroke-foreground stroke-[1.5]"
                    />
                  </g>
                );
              })}
            </svg>
          );
        })}

        {/* The marker rides the bottom row with the live curve and duration. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: `${(PLACE_Y / HEIGHT) * 100}%`,
            left: `${toFraction(0) * 100}%`,
            width: `${(toFraction(1) - toFraction(0)) * 100}%`,
          }}
        >
          {/* A full-width runner moves by its own width, so the motion stays a transform. */}
          <div
            className={cn(
              "absolute top-0 left-0 w-full transition-transform duration-(--ez-dur) ease-(--ez-ease)",
              open && "translate-x-full",
            )}
          >
            <span className="absolute top-0 left-0 block size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent)_18%,transparent)]" />
          </div>
        </div>
      </div>

      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[13px] text-muted-foreground">
        <span>
          <span className="font-medium text-foreground">Time</span>, in equal slices of {durationMs}
          ms, above. <span className="font-medium text-foreground">Position</span> at each slice,
          below.
        </span>
        <span>Wide gaps move fast. Tight gaps move slow.</span>
      </figcaption>
    </figure>
  );
}
