import { cn } from "@/lib/utils";

export function SplitRevealProgressCount({
  loaded,
  total,
  foregroundColor,
  className,
}: {
  loaded: number;
  total: number;
  foregroundColor: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-3 text-center text-[11px] font-medium tabular-nums tracking-[0.12em]",
        className,
      )}
      style={{ color: `color-mix(in srgb, ${foregroundColor} 45%, transparent)` }}
    >
      {String(loaded).padStart(2, "0")}
      <span style={{ color: `color-mix(in srgb, ${foregroundColor} 20%, transparent)` }}> / </span>
      {String(total).padStart(2, "0")}
    </p>
  );
}
