"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

function Beam({ index }: { index: number }) {
  const flag = index % 8 === 0;
  return (
    <div
      className={cn("h-full animate-meteor", {
        "[--duration:7s]": flag,
        "[--duration:11s]": !flag,
      })}
      style={{
        width: "6px",
        transform: "translateY(-20%)",
        "--delay": `${index * 0.5}s`,
      }}
    >
      <div
        style={{
          clipPath: "polygon(54% 0, 54% 0, 60% 100%, 40% 100%)",
        }}
        className={cn("w-full", {
          "h-8": flag,
          "h-12": !flag,
        })}
      >
        <div className="h-full w-full bg-gradient-to-b from-neutral-50/50 via-neutral-100 via-75% to-neutral-50" />
      </div>
    </div>
  );
}

function useGridCount() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      const width = rect.width;
      const cellSize = 40;
      setCount(Math.ceil(width / cellSize));
    };

    updateCount();

    // Can be debounced if needed
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return {
    count,
    containerRef,
  };
}

function Background() {
  const { count, containerRef } = useGridCount();

  return (
    <div
      ref={containerRef}
      className="-z-1 absolute inset-0 flex h-full w-full flex-row justify-between bg-gradient-to-t from-indigo-900 to-indigo-950"
    >
      <div
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%,#072a39 0%,rgb(7,42,57) 50%,rgba(7,42,57,0) 100%)",
        }}
        className="absolute inset-0 top-1/2 h-full w-full rounded-full opacity-40"
      />
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="relative h-full w-px rotate-12 bg-gray-100 bg-opacity-10">
          {(1 + i) % 4 === 0 && <Beam index={i + 1} />}
        </div>
      ))}
    </div>
  );
}

export default function AnimatedBeam({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("storybook-fix relative w-full overflow-hidden", className)}>
      <Background />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
