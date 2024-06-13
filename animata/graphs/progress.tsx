import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function Progress({ progress }: { progress: number }) {
  const [width, setWidth] = useState(0);

  const barWidth = 2;
  const gap = 2;

  const bars = Math.floor(width / (barWidth + gap));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(containerRef.current?.offsetWidth ?? 0);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[12px] w-full min-w-4 flex-wrap gap-[2px] overflow-hidden"
    >
      {Array.from(Array(bars)).map((_, index) => {
        const highlight = index / bars < progress / 100;
        return (
          <div
            className={cn(
              "h-full w-[2px] rounded-[1px] transition-all duration-500",
              {
                "bg-blue-100 group-hover:rounded group-hover:bg-zinc-50 group-active:rounded group-active:bg-zinc-50":
                  highlight,
                "bg-zinc-900/30 group-hover:scale-75 group-hover:bg-zinc-900/15 group-active:scale-75 group-active:bg-zinc-900/15":
                  !highlight,
              },
            )}
            key={`bar_${index}`}
          />
        );
      })}
    </div>
  );
}
