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
        "relative size-52 overflow-hidden rounded-3xl font-mono text-white shadow-md",
        className,
      )}
    >
      <div className="absolute right-2 z-10 h-28 w-5 bg-white/30">
        <div className="absolute -bottom-2 z-0 h-4 w-full rotate-45 bg-zinc-800" />
      </div>

      <div className="flex h-full flex-col justify-between">
        <div className="relative w-full bg-zinc-500 px-4 pb-2 pt-4">
          <div className="absolute right-2 top-0 flex h-full w-5 justify-center">
            <div className="z-20 w-0.5 bg-zinc-500" />
          </div>
          <p className="text-xs font-medium uppercase tracking-wide text-white/80">{headline}</p>
          <p className="text-xl font-semibold tabular-nums tracking-tight">{arrivalTime}</p>
        </div>

        <div className="border-t-2 border-t-zinc-900 bg-zinc-700 px-4 pb-4 pt-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">{status}</p>
          <div className="relative mx-0.5 mb-6 mt-5 bg-zinc-400">
            <div className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-amber-300" />
            <div className="absolute right-0 top-1/2 z-10 size-3 -translate-y-1/2 rounded-full bg-zinc-400" />
            <div
              className="relative h-0.5 bg-amber-300 transition-[width] duration-500 ease-in-out"
              style={{ width: `${clamped}%` }}
            >
              <TruckIcon className="absolute right-0 top-1/2 z-50 size-8 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-300 p-1.5 text-zinc-800" />
            </div>
          </div>

          <div className="flex gap-1.5 text-zinc-300">
            <LocateIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-tight text-white">{location}</p>
              <p className="text-xs tabular-nums text-zinc-400">{timeAgo} ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
