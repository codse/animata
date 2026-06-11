"use client";

import type React from "react";
import { cloneElement, isValidElement } from "react";

import { TEXT_ANIMATOR_INDEX_FRAME_CLASS } from "@/animata/text/text-animator-demo";
import { cn } from "@/lib/utils";

import "@/animata/text/text-animator-demo.css";

type DemoChildProps = { className?: string };

/**
 * Index grid frame for text-animator presets.
 * Demo class lives on this wrapper (not cloneElement → AnimataRenderer) so CSS
 * matches even when the preset is lazy-loaded from MDX.
 */
export function TextAnimatorListDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className={TEXT_ANIMATOR_INDEX_FRAME_CLASS} data-text-animator-demo="">
      {isValidElement<DemoChildProps>(children)
        ? cloneElement(children, {
            className: cn("h-full w-full min-h-0", children.props.className),
          })
        : children}
    </div>
  );
}
