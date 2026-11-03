"use client";

import { type CSSProperties, useState } from "react";

import { cn } from "@/lib/utils";

export const MIN_DURATION = 80;
export const MAX_DURATION = 1200;

const percent = (ms: number) => ((ms - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * 100;

type DurationControlProps = {
  value: number;
  onChange: (ms: number) => void;
  /** Called when a change is finished, to replay the stage once. */
  onCommit: () => void;
  /** The current curve's suggested duration, marked on the rail. */
  suggested?: number;
};

/**
 * A native range input sits on top, invisible, so keyboard, screen readers, and touch keep
 * working. The rail and knob are drawn underneath and track the pointer 1:1.
 */
export function DurationControl({ value, onChange, onCommit, suggested }: DurationControlProps) {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="grid gap-1">
      <div className="flex items-baseline justify-between text-xs text-muted-foreground">
        <span>Duration</span>
        <output className="font-mono text-[13px] font-medium text-foreground tabular-nums">
          {value}ms
        </output>
      </div>

      <div
        className="group/rail relative h-7"
        style={{ "--fill": `${percent(value)}%` } as CSSProperties}
      >
        <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-foreground/[0.14]" />
        <span className="absolute top-1/2 left-0 h-0.5 w-(--fill) -translate-y-1/2 rounded-full bg-foreground" />
        {suggested !== undefined && suggested !== value ? (
          <span
            title={`Suggested: ${suggested}ms`}
            className="absolute top-1/2 h-2 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/30"
            style={{ left: `${percent(suggested)}%` }}
          />
        ) : null}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 left-(--fill) size-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_1px_var(--color-border),0_2px_6px_rgb(0_0_0/0.15)]",
            "transition-[scale] duration-150 ease-out group-has-[:focus-visible]/rail:ring-2 group-has-[:focus-visible]/rail:ring-foreground/30",
            dragging && "scale-115",
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
          className="absolute inset-0 m-0 size-full cursor-pointer opacity-0"
        />
      </div>

      <div className="flex justify-between font-mono text-[10.5px] text-muted-foreground tabular-nums">
        <span>{MIN_DURATION}</span>
        <span className="font-sans">Quick</span>
        <span className="font-sans">Unhurried</span>
        <span>{MAX_DURATION}</span>
      </div>
    </div>
  );
}
