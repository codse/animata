"use client";

import { cn } from "@/lib/utils";

import "./glitch-text.css";

export interface GlitchTextProps extends Omit<React.ComponentPropsWithoutRef<"span">, "children"> {
  children: string;
  /** Unitless multiplier on `--glitch-step`. @default 5 (via CSS) */
  intensity?: number;
  /** Base offset unit — em scales with font size. @default "0.01em" */
  step?: string;
  /** Glitch burst cycle. Numbers are seconds (`2.5` → `2.5s`). @default 2.5 */
  duration?: number | string;
  /** Main layer color (on top). @default "#ffffff" */
  baseColor?: string;
  /** Back ghost layer A. @default "#ff00ff" */
  colorA?: string;
  /** Back ghost layer B. @default "#00ffff" */
  colorB?: string;
  /** Ghost layer blend mode. @default "screen" */
  blendMode?: "screen" | "normal";
}

function glitchDuration(duration: number | string) {
  return typeof duration === "number" ? `${duration}s` : duration;
}

/**
 * RGB glitch via stacked text layers — ghosts animate transform only (compositor),
 * base stays full-color on top. Props map to CSS variables; defaults live in `glitch-text.css`.
 */
export default function GlitchText({
  children,
  className,
  intensity,
  step,
  duration,
  baseColor,
  colorA,
  colorB,
  blendMode,
  style,
  ...props
}: GlitchTextProps) {
  return (
    <span
      {...props}
      className={cn("glitch-text", className)}
      style={
        {
          ...(intensity !== undefined && { "--glitch-intensity": intensity }),
          ...(step !== undefined && { "--glitch-step": step }),
          ...(duration !== undefined && {
            "--glitch-duration": glitchDuration(duration),
          }),
          ...(baseColor !== undefined && { "--glitch-color-base": baseColor }),
          ...(colorA !== undefined && { "--glitch-color-a": colorA }),
          ...(colorB !== undefined && { "--glitch-color-b": colorB }),
          ...(blendMode !== undefined && { "--glitch-blend-mode": blendMode }),
          ...style,
        } as React.CSSProperties
      }
    >
      <span aria-hidden className="glitch-text__ghost-a select-none">
        {children}
      </span>
      <span aria-hidden className="glitch-text__ghost-b select-none">
        {children}
      </span>
      <span className="glitch-text__base">{children}</span>
    </span>
  );
}
