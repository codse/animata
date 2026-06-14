import { cn } from "@/lib/utils";

export function SplitRevealProgressTrack({
  progress,
  foregroundColor,
  className,
}: {
  progress: number;
  foregroundColor: string;
  className?: string;
}) {
  return (
    <div
      className={cn("h-px w-full", className)}
      style={{ backgroundColor: `color-mix(in srgb, ${foregroundColor} 8%, transparent)` }}
    >
      <div
        className="h-px transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%`, backgroundColor: foregroundColor }}
      />
    </div>
  );
}
