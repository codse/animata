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
      style={{ color: `${foregroundColor}73` }}
    >
      {String(loaded).padStart(2, "0")}
      <span style={{ color: `${foregroundColor}33` }}> / </span>
      {String(total).padStart(2, "0")}
    </p>
  );
}
