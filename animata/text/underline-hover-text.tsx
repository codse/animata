"use client";
import type React from "react";

import { cn } from "@/lib/utils";

export interface UnderlineHoverTextProps {
  text: string;
  /**
   * Resting text color. Tailwind class string.
   */
  textColor?: string;
  /**
   * Text color applied on hover. Pass `hover:text-foo` style class, or leave
   * empty to keep the resting color.
   */
  hoverTextColor?: string;
  /**
   * Color class for the underline stroke on hover. Plain class like
   * `bg-zinc-900` — the component handles the hover trigger itself, so passing
   * a `hover:`-prefixed class is unnecessary and just gets stripped.
   */
  hoverColor?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
}

const UnderlineHoverText: React.FC<UnderlineHoverTextProps> = ({
  text,
  textColor = "text-zinc-900 dark:text-zinc-100",
  hoverTextColor = "",
  hoverColor = "bg-zinc-900 dark:bg-zinc-100",
  fontSize = "text-2xl",
  fontWeight = "font-medium",
  className,
}) => {
  return (
    <span
      className={cn(
        "group/underline relative inline-block cursor-pointer px-1 pb-1.5",
        "tracking-tight",
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "will-change-transform hover:-translate-y-[2px]",
        fontSize,
        textColor,
        fontWeight,
        hoverTextColor,
        className,
      )}
    >
      <span className="relative z-10">{text}</span>
      {/* Soft baseline — always present, muted */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-current opacity-25"
      />
      {/* Hover stroke — sweeps outward from the center */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-px left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full",
          "transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/underline:w-full",
          hoverColor,
        )}
      />
    </span>
  );
};

export default UnderlineHoverText;
