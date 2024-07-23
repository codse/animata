import { useCallback, useRef } from "react";

import { useMousePosition } from "@/hooks/use-mouse-position";

export default function CursorTracker() {
  const divRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    // We need to offset the position to center the info div
    const offsetX = (infoRef.current?.offsetWidth || 0) / 2;
    const offsetY = (infoRef.current?.offsetHeight || 0) / 2;

    // Use CSS variables to position the info div instead of state to avoid re-renders
    infoRef.current?.style.setProperty("--x", `${x - offsetX}px`);
    infoRef.current?.style.setProperty("--y", `${y - offsetY}px`);
  }, []);

  useMousePosition(divRef, update);

  return (
    <div
      ref={divRef}
      className="group relative w-64 cursor-none rounded-3xl bg-violet-50 p-6 text-violet-800"
    >
      {/* Actual content */}
      <h1 className="mb-4 text-3xl font-semibold leading-none">
        Elevate your design with <span className="underline decoration-wavy">Animata</span>
      </h1>
      <div className="mb-8">
        Move your mouse over the box to reveal the text and the cursor position.
      </div>

      {/* Cursor tracker */}
      <div
        ref={infoRef}
        style={{
          transform: "translate(var(--x), var(--y))",
        }}
        className="pointer-events-none absolute left-0 top-0 z-50 rounded-full bg-blue-800/80 px-4 py-2 text-sm font-bold text-white opacity-0 duration-0 group-hover:opacity-100"
      >
        Read more &rarr;
      </div>
    </div>
  );
}
