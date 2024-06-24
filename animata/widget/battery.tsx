"use client";
import { useEffect, useRef } from "react";
import { BatteryMediumIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Battery = () => {
  const batteryLevel = 50;
  const circumference = 2 * Math.PI * 40;
  const gap = ((100 - batteryLevel) / 100) * circumference;

  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = "stroke-dashoffset 0.3s linear";
      circleRef.current.style.strokeDashoffset = String(gap);
    }
  }, [gap]);

  return (
    <div className="relative size-52 rounded-3xl bg-opacity-25 bg-gradient-to-br from-blue-500 to-blue-200 p-4">
      <div className="relative size-16">
        <svg viewBox="0 0 100 100" className="absolute right-0 size-full">
          <circle cx={50} cy={50} r={40} stroke="#5d5" strokeWidth={8} fill="none" />
          <circle
            ref={circleRef}
            cx={50}
            cy={50}
            r={40}
            stroke="#2a2"
            strokeWidth={8}
            fill="none"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex size-full items-center justify-center">
          <BatteryMediumIcon className="text-slate-200" size={24} />
        </div>
      </div>
      <div className={cn("absolute bottom-4 left-4 text-center text-7xl font-light text-white")}>
        {batteryLevel}
        <small className="text-sm">%</small>
      </div>
    </div>
  );
};

export default Battery;
