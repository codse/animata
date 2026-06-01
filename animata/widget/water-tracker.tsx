"use client";

import { Droplet } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type WaterTrackerProps = {
  className?: string;
  dailyGoal?: number;
  sipMl?: number;
  defaultIntake?: number;
  intake?: number;
  onIntakeChange?: (ml: number) => void;
};

export default function WaterTracker({
  className,
  dailyGoal = 2000,
  sipMl = 250,
  defaultIntake = 750,
  intake: controlledIntake,
  onIntakeChange,
}: WaterTrackerProps) {
  const [internalIntake, setInternalIntake] = useState(defaultIntake);
  const intake = controlledIntake ?? internalIntake;
  const atGoal = intake >= dailyGoal;
  const progress = Math.min(100, (intake / dailyGoal) * 100);

  const addWater = () => {
    if (atGoal) return;
    const next = Math.min(dailyGoal, intake + sipMl);
    if (controlledIntake === undefined) {
      setInternalIntake(next);
    }
    onIntakeChange?.(next);
  };

  return (
    <div
      className={cn(
        "relative flex size-52 overflow-hidden rounded-3xl border border-border bg-card shadow-md",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-center justify-center gap-1.5">
          <Droplet className="size-5 fill-sky-500 text-sky-500" aria-hidden />
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Water</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-0.5">
          <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
            {intake}
            <span className="text-sm font-medium text-muted-foreground"> ml</span>
          </p>
          <p className="text-xs text-muted-foreground">of {dailyGoal.toLocaleString()} ml today</p>
        </div>
        <button
          type="button"
          onClick={addWater}
          disabled={atGoal}
          className={cn(
            "touch-manipulation mx-auto min-h-11 rounded-full px-5 text-sm font-semibold transition-transform",
            atGoal
              ? "cursor-not-allowed bg-muted text-muted-foreground"
              : "bg-sky-600 text-white hover:scale-[1.02] active:scale-[0.98]",
          )}
        >
          +{sipMl} ml
        </button>
      </div>

      <div className="relative w-10 shrink-0 border-l border-border bg-muted/30" aria-hidden>
        <div
          className="absolute inset-x-0 bottom-0 bg-linear-to-t from-sky-600 to-sky-400 transition-[height] duration-300 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
    </div>
  );
}
