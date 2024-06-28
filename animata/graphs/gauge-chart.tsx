import { ReactNode, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface GaugeChartProps {
  showValue?: boolean;
  size: number;
  gap: number;
  progress: number;
  trackClassName?: string;
  progressClassName?: string;
  circleWidth?: number;
  progressWidth?: number;
  rounded?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function GaugeChart({
  showValue,
  size,
  progress,
  gap,
  progressClassName = "text-green-500",
  trackClassName = "text-black/10 dark:text-white/10",
  circleWidth = 16,
  progressWidth = 16,
  rounded = true,
  className,
  children,
}: GaugeChartProps) {
  const [shouldUseValue, setShouldUseValue] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldUseValue(true);
    }, 250);
    return () => clearTimeout(timeout);
  }, []);

  const radius = size / 2 - Math.max(progressWidth, circleWidth);
  const circumference = Math.PI * radius * 2;
  const adjustedProgress = shouldUseValue ? progress : 0;

  // Avoid values less than 0 and greater than 100
  const validatedProgress =
    adjustedProgress < 0 ? 0 : adjustedProgress > 100 ? 100 : adjustedProgress;

  // Calculate the stroke-dashoffset for the progress circle considering the gap
  const strokeDashoffsetProgress =
    circumference - (validatedProgress / 100) * (circumference - gap);

  return (
    <div className={className}>
      <div className="relative" style={{ width: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            r={radius}
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={`${circleWidth}px`}
            strokeDasharray={circumference}
            strokeDashoffset={gap}
            strokeLinecap={rounded ? "round" : "butt"}
            className={cn("duration-500", trackClassName)}
            transform={`rotate(${90 + (gap / (2 * circumference)) * 360} ${size / 2} ${size / 2})`}
          />
          {/* Progress Circle */}
          <circle
            r={radius}
            cx={size / 2}
            cy={size / 2}
            stroke="currentColor"
            className={cn("duration-500", progressClassName)}
            strokeWidth={`${progressWidth}px`}
            strokeLinecap={rounded ? "round" : "butt"}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffsetProgress}
            transform={`rotate(${90 + (gap / (2 * circumference)) * 360} ${size / 2} ${size / 2})`}
          />
        </svg>
        {showValue && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-bold text-foreground"
            style={{ fontSize: size / 4 }}
          >
            {progress}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
