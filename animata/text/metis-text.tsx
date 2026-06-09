import type React from "react";

import { cn } from "@/lib/utils";

import "./metis-text.css";

export interface MetisTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "span" | "a" | "p";
  /**
   * When true, the underline reacts to an ancestor with `.group` on
   * `:hover` / `:focus-visible` — useful inside card links.
   * @default false
   */
  groupHover?: boolean;
  /** Classes for the inner label wrapper — put `truncate` / `line-clamp-*` here. */
  labelClassName?: string;
}

/**
 * Codrops Metis underline — scaleX reveal with flipped transform-origin on enter/exit.
 * Keep truncation on `labelClassName`, not the root, so the line is not clipped.
 * @see https://github.com/codrops/LineHoverStyles/
 */
export default function MetisText({
  children,
  as: Tag = "span",
  groupHover = false,
  className,
  labelClassName,
  ...props
}: MetisTextProps) {
  return (
    <Tag className={cn("metis-text", groupHover && "metis-text--group", className)} {...props}>
      <span className={cn("metis-text__label", labelClassName)}>{children}</span>
    </Tag>
  );
}
