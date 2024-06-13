import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface HistogramProps {
  /**
   * The items to display in the histogram.
   */
  items: {
    progress: number;
    label: string;
    className?: string;
    containerClassName?: string;
  }[];

  /**
   * The height of the histogram.
   */
  height?: number;

  className?: string;
}

export default function Histogram({
  items,
  className,
  height: providedHeight,
}: HistogramProps) {
  const [{ height }, setSize] = useState({
    height: providedHeight ?? 12,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSize({
      height: providedHeight ?? containerRef.current?.offsetHeight ?? 12,
    });
  }, [providedHeight]);

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
        const barHeight = (clampedProgress / 100) * height;
        return (
          <div
            className={cn(
              "flex h-full flex-1 flex-col-reverse",
              item.containerClassName,
            )}
            key={`bar_${index}`}
          >
            <div style={{ height: barHeight }} className={cn(item.className)} />
          </div>
        );
      })}
    </div>
  );
}
