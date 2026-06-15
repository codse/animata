"use client";

import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { useSplitReveal } from "./context";

export function SplitRevealShutter({
  side,
  className,
  style,
  ...props
}: ComponentProps<"div"> & { side: "top" | "bottom" }) {
  const { backgroundColor } = useSplitReveal();

  return (
    <div
      className={cn(
        "absolute inset-x-0 h-1/2 will-change-transform",
        side === "top" ? "top-0" : "bottom-0",
        className,
      )}
      style={{ backgroundColor, ...style }}
      data-split-reveal-shutter={side}
      {...props}
    />
  );
}
