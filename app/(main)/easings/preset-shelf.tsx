"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

import { type CubicBezier, toCssBezier } from "@/lib/motion";
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
      <path
        d={`M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`}
        className="fill-none stroke-current stroke-2 [stroke-linecap:round]"
      />
      <circle cx={px(0)} cy={py(0)} r={2} className="fill-current opacity-40" />
      <circle cx={px(1)} cy={py(1)} r={2.5} className="fill-current" />
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
  /** The first reveal lands instantly; later changes glide. */
  const revealed = useRef(false);

  // Whatever changes the curve (shelf, arrows, links), keep its card in view. Also
  // re-check when the shelf resizes: a layout change can re-snap it to another card.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!selected || !scroller) return;

    const reveal = (behavior: ScrollBehavior) => {
      const card = scroller.querySelector<HTMLElement>(`[data-preset="${selected.id}"]`);
      if (!card) return;
      const { left, right } = card.getBoundingClientRect();
      const bounds = scroller.getBoundingClientRect();
      const inset = Number.parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
      // The fade covers the last 48px, so treat it as outside the view.
      if (left >= bounds.left + inset - 1 && right <= bounds.right - 48) return;
      scroller.scrollTo({
        left: scroller.scrollLeft + left - bounds.left - (bounds.width - card.offsetWidth) / 2,
        behavior,
      });
    };

    reveal(revealed.current ? "smooth" : "auto");
    revealed.current = true;
    const observer = new ResizeObserver(() => reveal("auto"));
    observer.observe(scroller);
    return () => observer.disconnect();
  }, [selected]);

  return (
    <div
      ref={scrollerRef}
      className="-mx-4 flex snap-x scroll-px-4 overflow-x-auto pt-1 pr-12 pb-2 pl-4 [mask-image:linear-gradient(to_right,black_calc(100%-48px),transparent)] [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:pl-6 lg:mx-0 lg:scroll-px-0 lg:pl-0 [&::-webkit-scrollbar]:hidden"
    >
      {groups.map((group, groupIndex) => {
        const items = PRESETS.filter((preset) => preset.group === group);
        return (
          <div
            key={group}
            role="group"
            aria-label={GROUP_LABELS[group]}
            className={cn(
              "grid shrink-0 gap-3",
              groupIndex > 0 && "ml-6 border-l border-border pl-6",
            )}
          >
            <span className="flex items-baseline gap-2 px-0.5 text-xs">
              <span className="font-medium text-foreground">{GROUP_LABELS[group]}</span>
              <span className="text-[11px] text-muted-foreground tabular-nums">{items.length}</span>
            </span>
            <div className="flex gap-2.5">
              {items.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  data-preset={preset.id}
                  aria-pressed={preset === selected}
                  aria-label={`${preset.name}, ${preset.duration} milliseconds. ${preset.use}`}
                  onClick={() => onSelect(preset)}
                  className={cn(
                    "group/card grid w-36 snap-start gap-2.5 rounded-[12px] border border-border bg-background p-1.5 pb-3 text-left text-muted-foreground",
                    "transition-[border-color,color,scale,box-shadow] duration-200 ease-out active:scale-[0.97]",
                    "hover:border-foreground/25 hover:text-foreground focus-visible:text-foreground",
                    group === "baseline" && "border-dashed",
                    "aria-pressed:border-foreground aria-pressed:text-foreground aria-pressed:shadow-[0_0_0_1px_var(--color-foreground),0_10px_28px_-18px_rgb(0_0_0/0.35)]",
                  )}
                >
                  <span className="grid gap-2 rounded-[8px] bg-muted/60 px-2.5 pt-3 pb-2.5">
                    <CurvePreview bezier={preset.bezier} />
                    {/* Hover or focus sends a dot across at this preset's own timing. */}
                    <span
                      aria-hidden="true"
                      className="relative block h-1.5 rounded-full bg-border"
                    >
                      <span
                        className="absolute inset-y-0 left-0 block w-[calc(100%-6px)] transition-transform group-hover/card:translate-x-full group-focus-visible/card:translate-x-full"
                        style={{
                          transitionTimingFunction: toCssBezier(preset.bezier),
                          transitionDuration: `${preset.duration}ms`,
                        }}
                      >
                        <span className="block size-1.5 rounded-full bg-current" />
                      </span>
                    </span>
                  </span>
                  <span className="flex items-baseline justify-between gap-2 px-1.5">
                    <span className="truncate text-xs font-medium">{preset.short}</span>
                    <span className="shrink-0 text-[11px] tabular-nums opacity-60">
                      {preset.duration}ms
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** A curve at icon size, for dense rows. */
export function MiniCurve({ bezier, className }: { bezier: CubicBezier; className?: string }) {
  const [x1, y1, x2, y2] = bezier;
  // 0–1 mapped into a 24×24 box with headroom for overshoot.
  const px = (x: number) => 2 + x * 20;
  const py = (y: number) => 19 - y * 14;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-6 shrink-0 overflow-visible", className)}
    >
      <path
        d={`M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`}
        className="fill-none stroke-current stroke-[1.6] [stroke-linecap:round]"
      />
    </svg>
  );
}

/**
 * Every preset as one row of an index: curve, name, duration. The highlight glides to the
 * chosen row, so moving through the list reads as one continuous object.
 */
export function PresetIndex({
  selected,
  onSelect,
  reducedMotion,
}: PresetShelfProps & { reducedMotion: boolean }) {
  const groups = Object.keys(GROUP_LABELS) as EasingGroup[];
  return (
    <div className="grid gap-6">
      {groups.map((group) => {
        const items = PRESETS.filter((preset) => preset.group === group);
        return (
          <div key={group} role="group" aria-label={GROUP_LABELS[group]} className="grid gap-px">
            <span className="mb-2 flex items-baseline justify-between px-2.5 text-xs">
              <span className="font-medium text-foreground">{GROUP_LABELS[group]}</span>
              <span className="text-[11px] text-muted-foreground tabular-nums">{items.length}</span>
            </span>
            {items.map((preset) => {
              const active = preset === selected;
              return (
                <button
                  key={preset.id}
                  type="button"
                  data-preset={preset.id}
                  aria-pressed={active}
                  aria-label={`${preset.name}, ${preset.duration} milliseconds. ${preset.use}`}
                  onClick={() => onSelect(preset)}
                  className={cn(
                    "relative flex h-8 items-center gap-2.5 rounded-[8px] px-2.5 text-left text-[13px] text-muted-foreground",
                    "transition-[color,scale] duration-150 ease-out hover:text-foreground active:scale-[0.98] aria-pressed:text-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="preset-index"
                      aria-hidden="true"
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: "spring", bounce: 0, duration: 0.4 }
                      }
                      className="absolute inset-0 rounded-[8px] bg-muted shadow-[inset_0_0_0_1px_var(--color-border)]"
                    />
                  ) : null}
                  <MiniCurve bezier={preset.bezier} className="relative size-5" />
                  <span className="relative flex-1 truncate font-medium">{preset.name}</span>
                  <span className="relative text-[11px] tabular-nums opacity-60">
                    {preset.duration}
                  </span>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
