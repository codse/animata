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
        "relative flex size-52 overflow-hidden rounded-3xl border border-border bg-card font-sans shadow-md",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex shrink-0 items-center gap-1.5">
          <Droplet className="size-[15px] fill-sky-500 text-sky-500" aria-hidden />
          <p className="text-[15px] font-semibold leading-none text-foreground">Water</p>
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <p className="text-[22px] font-normal leading-none tabular-nums tracking-tight text-foreground">
            {intake.toLocaleString()}
            <span className="text-[13px] font-medium text-muted-foreground"> ml</span>
          </p>
          <p className="text-[13px] leading-none text-muted-foreground">
            of {dailyGoal.toLocaleString()} ml today
          </p>
        </div>

        <button
          type="button"
          onClick={addWater}
          disabled={atGoal}
          className={cn(
            "touch-manipulation mt-auto min-h-11 w-full rounded-full text-[15px] font-medium leading-none transition-transform",
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
