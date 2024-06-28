import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface BarChartProps {
  /**
   * The items to display in the BarChart.
   */
  items: {
    progress: number;
    label: string;
    className?: string;
    containerClassName?: string;
  }[];

  /**
   * The height of the BarChart.
   */
  height?: number;

  className?: string;
}

export default function BarChart({ items, className, height: providedHeight }: BarChartProps) {
  const [{ height }, setSize] = useState({
    height: providedHeight ?? 12,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSize({
      height: providedHeight ?? containerRef.current?.offsetHeight ?? 12,
    });
  }, [providedHeight]);

  const [shouldUseValue, setShouldUseValue] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // This is a hack to force the animation to run for the first time.
      // We can use framer-motion to achieve this but just keeping it simple for now.
      setShouldUseValue(true);
    }, 250);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative box-border flex min-h-4 w-full flex-wrap items-end gap-[2px] overflow-hidden",
        className,
      )}
      style={{ height }}
    >
      {items.map((item, index) => {
        const clampedProgress = Math.min(100, Math.max(0, item.progress));
        const barHeight = shouldUseValue ? (clampedProgress / 100) * height : 0;
        return (
          <div
            className={cn("flex h-full flex-1 flex-col-reverse", item.containerClassName)}
            key={`bar_${index}`}
            title={item.label}
          >
            <div
              style={{ height: barHeight }}
              className={cn("transition-all duration-200", item.className)}
            />
          </div>
        );
      })}
    </div>
  );
}
