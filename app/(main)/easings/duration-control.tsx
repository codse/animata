"use client";

import { type CSSProperties, useState } from "react";

import { cn } from "@/lib/utils";

export const MIN_DURATION = 80;
export const MAX_DURATION = 1600;

const QUICK = [
  { label: "Instant", ms: 120 },
  { label: "Fast", ms: 200 },
  { label: "Base", ms: 320 },
  { label: "Slow", ms: 600 },
  { label: "Long", ms: 1000 },
];

const percent = (ms: number) => ((ms - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * 100;

type DurationControlProps = {
  value: number;
  onChange: (ms: number) => void;
  /** Called when a change is finished, to replay the scenes once. */
  onCommit: () => void;
  /** The current preset's suggested duration, marked on the track. */
  suggested?: number;
};

/**
 * A native range input sits on top, invisible, so keyboard, screen readers, and touch keep
 * working. The fill and thumb are drawn underneath: they track the pointer 1:1 while
 * dragging and glide when a quick pick moves them.
 */
export function DurationControl({ value, onChange, onCommit, suggested }: DurationControlProps) {
  const [dragging, setDragging] = useState(false);
  const glide = dragging ? "" : "transition-[width,left] duration-300 ease-out";

  return (
    <div className="grid gap-3">
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] font-medium">Duration</span>
        <output className="font-mono text-[13px] tabular-nums">
          {value}
          <span className="text-muted-foreground">ms</span>
        </output>
      </div>

      <div
        className="group/track relative h-5"
        style={{ "--fill": `${percent(value)}%` } as CSSProperties}
      >
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border">
          <div className={cn("h-full w-(--fill) rounded-full bg-accent", glide)} />
        </div>
        {suggested !== undefined ? (
          <span
            title={`Suggested ${suggested}ms`}
            className="absolute top-1/2 h-2.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/40"
            style={{ left: `${percent(suggested)}%` }}
          />
        ) : null}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 left-(--fill) size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-background shadow-[0_1px_3px_rgb(0_0_0/0.18)]",
            "transition-[scale] duration-150 ease-out group-has-[:active]/track:scale-110 group-has-[:focus-visible]/track:ring-2 group-has-[:focus-visible]/track:ring-accent group-has-[:focus-visible]/track:ring-offset-2 group-has-[:focus-visible]/track:ring-offset-background",
            glide && "transition-[scale,left] duration-300",
          )}
        />
        <input
          type="range"
          min={MIN_DURATION}
          max={MAX_DURATION}
          step={10}
          value={value}
          aria-label="Duration in milliseconds"
          aria-valuetext={`${value} milliseconds`}
          onChange={(event) => onChange(Number(event.target.value))}
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => {
            setDragging(false);
            onCommit();
          }}
          onPointerCancel={() => setDragging(false)}
          onLostPointerCapture={() => setDragging(false)}
          onKeyUp={onCommit}
          className="absolute inset-0 size-full cursor-pointer opacity-0"
        />
      </div>

      <div
        role="group"
        aria-label="Duration presets"
        className="grid grid-cols-5 rounded-[8px] bg-muted p-0.5"
      >
        {QUICK.map((item) => (
          <button
            key={item.ms}
            type="button"
            aria-pressed={value === item.ms}
            title={`${item.ms}ms`}
            onClick={() => {
              onChange(item.ms);
              onCommit();
            }}
            className={cn(
              "h-7 rounded-[6px] text-xs font-medium text-muted-foreground transition-[background-color,color,box-shadow,scale] duration-150 ease-out hover:text-foreground active:scale-[0.97]",
              "aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-[0_1px_2px_rgb(0_0_0/0.08)]",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
