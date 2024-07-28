import { useCallback, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

export default function GithubCardShiny({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    if (!overlayRef.current) {
      return;
    }

    const { width, height } = overlayRef.current?.getBoundingClientRect() ?? {};
    const xOffset = x - width / 2;
    const yOffset = y - height / 2;

    overlayRef.current?.style.setProperty("--x", `${xOffset}px`);
    overlayRef.current?.style.setProperty("--y", `${yOffset}px`);
  }, []);

  useMousePosition(containerRef, update);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-96 min-w-fit max-w-full overflow-hidden rounded-md border border-border bg-zinc-700 p-6 text-zinc-200 shadow-lg",
        className,
      )}
    >
      <div
        ref={overlayRef}
        // Adjust height & width as required
        className="-z-1 absolute h-64 w-64 rounded-full bg-white opacity-0 bg-blend-soft-light blur-3xl transition-opacity group-hover:opacity-20"
        style={{
          transform: "translate(var(--x), var(--y))",
        }}
      />

      <div className="font-mono text-sm">
        cmake.yml
        <div className="text-xs text-zinc-400">on: push</div>
      </div>

      <div className="z-10 mt-10 flex w-full min-w-fit flex-col gap-2 rounded-md bg-zinc-600 p-4 shadow-2xl">
        {[
          {
            title: "Install dependencies",
            time: "1m 20s",
          },
          {
            title: "Build",
            time: "2m 10s",
          },
          {
            title: "Test",
            time: "1m 30s",
          },
        ].map((step) => {
          return (
            <div className="flex w-full items-center gap-2" key={step.title}>
              <CheckCircle2 className="flex-shrink-0 fill-green-400 text-zinc-600" />
              <strong className="text-xs md:flex-shrink-0 md:text-base">{step.title}</strong>

              <span className="ml-auto inline-block flex-shrink-0 text-xs opacity-75">
                {step.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
