"use client";

import { useEffect, useRef } from "react";

import type { CubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { type EasingGroup, type EasingPreset, GROUP_LABELS, PRESETS } from "./presets";

/** A curve drawn large enough to read its shape at a glance. */
function CurvePreview({ bezier }: { bezier: CubicBezier }) {
  const [x1, y1, x2, y2] = bezier;
  // 0–1 in a 96×56 box, with headroom for overshoot.
  const px = (x: number) => 4 + x * 88;
  const py = (y: number) => 46 - y * 36;
  return (
    <svg viewBox="0 0 96 56" aria-hidden="true" className="h-14 w-full overflow-visible">
      <line
        x1={px(0)}
        y1={py(0)}
        x2={px(1)}
        y2={py(1)}
        className="stroke-current opacity-15 [stroke-dasharray:2_4]"
      />
      <path
        d={`M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`}
        className="fill-none stroke-current stroke-2 [stroke-linecap:round]"
      />
    </svg>
  );
}

type PresetShelfProps = {
  selected: EasingPreset | null;
  onSelect: (preset: EasingPreset) => void;
};

/** Every preset as a card with its curve, grouped, in one horizontally scrolling row. */
export function PresetShelf({ selected, onSelect }: PresetShelfProps) {
  const groups = Object.keys(GROUP_LABELS) as EasingGroup[];
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Whatever changes the curve (shelf, arrows, links), keep its card in view.
  useEffect(() => {
    if (!selected) return;
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>(`[data-preset="${selected.id}"]`);
    if (!scroller || !card) return;
    const { left, right } = card.getBoundingClientRect();
    const bounds = scroller.getBoundingClientRect();
    // The fade covers the last 48px, so treat it as outside the view.
    if (left < bounds.left || right > bounds.right - 48) {
      scroller.scrollTo({
        left: scroller.scrollLeft + left - bounds.left - (bounds.width - card.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
  }, [selected]);

  return (
    <div
      ref={scrollerRef}
      className="-mx-4 flex snap-x scroll-px-4 gap-6 overflow-x-auto px-4 pb-1 [mask-image:linear-gradient(to_right,black_calc(100%-48px),transparent)] [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {groups.map((group) => (
        <div
          key={group}
          role="group"
          aria-label={GROUP_LABELS[group]}
          className="grid shrink-0 gap-2.5"
        >
          <span className="px-0.5 text-xs font-medium text-muted-foreground">
            {GROUP_LABELS[group]}
          </span>
          <div className="flex gap-2">
            {PRESETS.filter((preset) => preset.group === group).map((preset) => (
              <button
                key={preset.id}
                type="button"
                data-preset={preset.id}
                aria-pressed={preset === selected}
                aria-label={`${preset.name}, ${preset.duration} milliseconds. ${preset.use}`}
                onClick={() => onSelect(preset)}
                className={cn(
                  "grid w-32 snap-start gap-3 rounded-2xl border border-border bg-background p-3 text-left text-foreground",
                  "transition-[border-color,background-color,color,scale,box-shadow] duration-200 ease-out active:scale-[0.97]",
                  "hover:border-foreground/20 hover:shadow-[0_8px_24px_-14px_rgb(0_0_0/0.25)]",
                  group === "baseline" && "border-dashed",
                  "aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:shadow-[0_12px_32px_-16px_rgb(0_0_0/0.45)]",
                )}
              >
                <CurvePreview bezier={preset.bezier} />
                <span className="flex items-baseline justify-between gap-2 font-mono">
                  <span className="truncate text-xs font-medium">{preset.short}</span>
                  <span className="shrink-0 text-[11px] opacity-60">{preset.duration}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
