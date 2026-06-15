"use client";

import type { ComponentProps, CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { useSplitReveal } from "./context";

export function SplitRevealOverlay({
  className,
  children,
  style,
  ...props
}: ComponentProps<"div">) {
  const { phase, zIndex, revealDuration, progressFadeMs, isActive } = useSplitReveal();

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 overscroll-none touch-none",
        phase === "loading" ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
      style={
        {
          ...style,
          zIndex,
          "--split-reveal-duration": `${revealDuration}s`,
          "--split-reveal-progress-fade": `${progressFadeMs}ms`,
        } as CSSProperties
      }
      data-phase={phase}
      aria-busy={phase === "loading"}
      aria-live="polite"
      data-split-reveal-overlay=""
      {...props}
    >
      {children}
    </div>
  );
}
