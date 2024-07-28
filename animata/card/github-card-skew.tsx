import { useCallback, useRef } from "react";

import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

function calculateCardRotation({
  currentX,
  currentY,
  centerX,
  centerY,
  maxRotationX,
  maxRotationY,
}: {
  currentX: number;
  currentY: number;
  centerX: number;
  centerY: number;
  maxRotationX: number;
  maxRotationY: number;
}) {
  // Calculate the distance from the center
  const deltaX = currentX - centerX;
  const deltaY = currentY - centerY;

  // Calculate the maximum distance (assuming a rectangular area)
  const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
  // Calculate the actual distance
  const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  // Calculate the rotation factor (0 to 1)
  const rotationFactor = distance / maxDistance;

  // Calculate rotations (inverted for natural tilt effect)
  const rotationY = ((-deltaX / centerX) * maxRotationY * rotationFactor).toFixed(2);
  const rotationX = ((deltaY / centerY) * maxRotationX * rotationFactor).toFixed(2);
  return { rotationX, rotationY };
}

export default function GithubCardSkew({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<NodeJS.Timeout>();

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    if (!containerRef.current) {
      return;
    }

    const { width, height } = containerRef.current.getBoundingClientRect();
    const { rotationX, rotationY } = calculateCardRotation({
      centerX: width / 2,
      centerY: height / 2,
      currentX: x,
      currentY: y,
      maxRotationX: 4,
      maxRotationY: 6,
    });
    containerRef.current.style.setProperty("--x", `${rotationX}deg`);
    containerRef.current.style.setProperty("--y", `${rotationY}deg`);
  }, []);

  useMousePosition(containerRef, update);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex max-w-80 transform-gpu flex-col gap-4 rounded-3xl border border-border bg-zinc-700 p-10 text-zinc-200 shadow-lg transition-transform ease-linear will-change-transform",
        className,
      )}
      style={{
        transform: "perspective(400px) rotateX(var(--x)) rotateY(var(--y))",
        transitionDuration: "50ms",
      }}
      onMouseEnter={() => {
        resetRef.current = setTimeout(() => {
          if (!containerRef.current) {
            return;
          }

          // Reset the transition duration to 0 so that the mouse movement is smooth
          containerRef.current.style.transitionDuration = "0ms";
        }, 300);
      }}
      onMouseLeave={() => {
        clearTimeout(resetRef.current);
        if (!containerRef.current) {
          return;
        }

        containerRef.current.style.transitionDuration = "50ms";
        containerRef.current.style.setProperty("--x", "0deg");
        containerRef.current.style.setProperty("--y", "0deg");
      }}
    >
      <h1 className="font-mono text-6xl tracking-tight">55%</h1>

      <p className="text-xl font-medium text-zinc-400">Developer preference for GitHub Copilot</p>

      <span className="mt-4 text-sm text-zinc-400">Stack Overflow 2023 Survey</span>
    </div>
  );
}
