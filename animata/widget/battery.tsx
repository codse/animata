"use client";

import { BatteryMediumIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type BatteryProps = {
  className?: string;
  /** 0–100 */
  level?: number;
};

export default function Battery({ className, level = 50 }: BatteryProps) {
  const circumference = 2 * Math.PI * 40;
  const gap = ((100 - level) / 100) * circumference;
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = "stroke-dashoffset 0.3s linear";
      circleRef.current.style.strokeDashoffset = String(gap);
    }
  }, [gap]);

  return (
    <div
      className={cn(
        "relative flex size-52 flex-col rounded-3xl bg-linear-to-br from-sky-600/90 to-sky-400/80 p-4 font-sans shadow-md",
        className,
      )}
    >
      <div className="relative size-14 shrink-0">
        <svg viewBox="0 0 100 100" className="size-full" aria-hidden>
          <circle cx={50} cy={50} r={40} className="stroke-white/25" strokeWidth={8} fill="none" />
          <circle
            ref={circleRef}
            cx={50}
            cy={50}
            r={40}
            className="stroke-white"
            strokeWidth={8}
            fill="none"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <BatteryMediumIcon className="text-white/90" size={22} strokeWidth={1.75} />
        </div>
      </div>

      <div className="mt-auto flex items-baseline gap-0.5 text-white">
        <span className="text-[34px] font-normal leading-none tabular-nums tracking-tight">
          {level}
        </span>
        <span className="pb-1 text-[15px] font-medium leading-none">%</span>
      </div>
    </div>
  );
}
