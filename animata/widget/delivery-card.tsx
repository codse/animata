"use client";

import { LocateIcon, TruckIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type DeliveryCardProps = {
  className?: string;
  progress?: number;
  arrivalTime?: string;
  location?: string;
  timeAgo?: string;
  /** Demo-only: animates progress on an interval. */
  simulateProgress?: boolean;
};

export default function DeliveryCard({
  className,
  progress = 42,
  arrivalTime = "09:26",
  location = "Pokhara",
  timeAgo = "30 min",
  simulateProgress = false,
}: DeliveryCardProps) {
  const [demoProgress, setDemoProgress] = useState(progress);
  const displayProgress = simulateProgress ? demoProgress : progress;
  const clamped = Math.min(100, Math.max(0, displayProgress));
  const status = clamped <= 0 ? "Processing" : clamped >= 100 ? "Delivered" : "In transit";
  const headline = clamped >= 100 ? "Arrived" : "Arrives today";

  useEffect(() => {
    setDemoProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (!simulateProgress) return;
    const id = setInterval(() => {
      setDemoProgress((current) => {
        if (current >= 100) return 0;
        return Math.min(100, current + 30);
      });
    }, 3000);
    return () => clearInterval(id);
  }, [simulateProgress]);

  return (
    <div
      className={cn(
        "relative size-52 overflow-hidden rounded-3xl border border-zinc-900/50 font-sans text-white shadow-md",
        "bg-zinc-800 dark:border-zinc-950 dark:bg-zinc-900",
        className,
      )}
    >
      <div className="absolute right-2 z-10 h-28 w-5 bg-white/30">
        <div className="absolute -bottom-2 z-0 h-4 w-full rotate-45 bg-zinc-700 dark:bg-zinc-800" />
      </div>

      <div className="flex h-full flex-col">
        <div className="relative shrink-0 bg-zinc-600 px-4 pb-2.5 pt-4 dark:bg-zinc-700">
          <div className="absolute right-2 top-0 flex h-full w-5 justify-center">
            <div className="z-20 w-0.5 bg-zinc-600 dark:bg-zinc-700" />
          </div>
          <p className="text-[13px] font-medium leading-none text-white/85">{headline}</p>
          <p className="mt-1 text-[22px] font-normal leading-none tabular-nums tracking-tight">
            {arrivalTime}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col border-t-2 border-t-zinc-900/80 bg-zinc-700 px-4 pb-4 pt-2 dark:border-t-zinc-950 dark:bg-zinc-800">
          <p className="shrink-0 text-[13px] font-medium leading-none text-amber-400 dark:text-amber-300">
            {status}
          </p>

          <div className="relative mx-0.5 mb-5 mt-4 shrink-0 bg-zinc-500 dark:bg-zinc-600">
            <div className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-amber-400 dark:bg-amber-300" />
            <div className="absolute right-0 top-1/2 z-10 size-3 -translate-y-1/2 rounded-full bg-zinc-600 dark:bg-zinc-700" />
            <div
              className="relative h-0.5 bg-amber-400 transition-[width] duration-500 ease-in-out dark:bg-amber-300"
              style={{ width: `${clamped}%` }}
            >
              <TruckIcon className="absolute right-0 top-1/2 z-50 size-8 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-400 p-1.5 text-zinc-900 dark:bg-amber-300 dark:text-zinc-800" />
            </div>
          </div>

          <div className="mt-auto flex items-start gap-1.5">
            <LocateIcon
              className="mt-0.5 size-4 shrink-0 text-zinc-400 dark:text-zinc-500"
              strokeWidth={2}
              aria-hidden
            />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold leading-tight text-white">
                {location}
              </p>
              <p className="mt-0.5 text-[13px] leading-none tabular-nums text-zinc-400 dark:text-zinc-500">
                {timeAgo} ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
