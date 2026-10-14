"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export const MIN_DURATION = 80;
export const MAX_DURATION = 1600;

const QUICK = [
  { label: "Instant", ms: 120 },
  { label: "Fast", ms: 200 },
  { label: "Base", ms: 320 },
  { label: "Slow", ms: 600 },
  { label: "Expressive", ms: 1000 },
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
 * A native range input under a custom track: keyboard, screen readers, and touch keep
 * working, while the fill, thumb, and suggested-duration marker are drawn here.
 */
export function DurationControl({ value, onChange, onCommit, suggested }: DurationControlProps) {
  return (
    <div className="grid gap-2.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] font-medium">Duration</span>
        <output className="font-mono text-[13px] tabular-nums">
          {value}
          <span className="text-muted-foreground">ms</span>
        </output>
      </div>

      <div className="relative h-6" style={{ "--fill": `${percent(value)}%` } as CSSProperties}>
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-border">
          <div className="h-full w-(--fill) rounded-full bg-foreground" />
        </div>
        {suggested !== undefined ? (
          <span
            title={`Suggested: ${suggested}ms`}
            className="absolute top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
            style={{ left: `${percent(suggested)}%` }}
          />
        ) : null}
        <input
          type="range"
          min={MIN_DURATION}
          max={MAX_DURATION}
          step={10}
          value={value}
          aria-label="Duration in milliseconds"
          aria-valuetext={`${value} milliseconds`}
          onChange={(event) => onChange(Number(event.target.value))}
          onPointerUp={onCommit}
          onKeyUp={onCommit}
          className={cn(
            "relative block h-6 w-full cursor-pointer appearance-none bg-transparent outline-none",
            "[&::-webkit-slider-runnable-track]:h-6 [&::-webkit-slider-runnable-track]:bg-transparent",
            "[&::-webkit-slider-thumb]:mt-[3px] [&::-webkit-slider-thumb]:size-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgb(0_0_0/0.2)] [&::-webkit-slider-thumb]:transition-[scale] [&::-webkit-slider-thumb]:duration-150 active:[&::-webkit-slider-thumb]:scale-110",
            "[&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:size-[14px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-foreground [&::-moz-range-thumb]:bg-background",
            "focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-accent focus-visible:[&::-webkit-slider-thumb]:ring-offset-2 focus-visible:[&::-webkit-slider-thumb]:ring-offset-background",
          )}
        />
      </div>

      <div role="group" aria-label="Duration presets" className="grid grid-cols-5 gap-1">
        {QUICK.map((item) => (
          <button
            key={item.ms}
            type="button"
            aria-pressed={value === item.ms}
            onClick={() => {
              onChange(item.ms);
              onCommit();
            }}
            className={cn(
              "grid h-11 place-content-center gap-0.5 rounded-lg text-center text-muted-foreground transition-[background-color,color,scale] duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-[0.97]",
              "aria-pressed:bg-foreground aria-pressed:text-background",
            )}
          >
            <span className="text-[11px] leading-none font-medium">{item.label}</span>
            <span className="font-mono text-[10px] leading-none opacity-70">{item.ms}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
