import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type ReminderBucket = {
  label: string;
  count: number;
  /** Tailwind classes for the bucket chip (e.g. `bg-violet-200 dark:bg-violet-500/35`). */
  className?: string;
};

export type ReminderProps = {
  className?: string;
  title?: string;
  buckets?: ReminderBucket[];
  /** Next commitment — the primary glance line. */
  nextLabel?: string;
};

const DEFAULT_BUCKETS: ReminderBucket[] = [
  { label: "Work", count: 2, className: "bg-violet-200 dark:bg-violet-500/35" },
  { label: "Home", count: 3, className: "bg-emerald-200 dark:bg-emerald-500/35" },
];

export default function Reminder({
  className,
  title = "Today",
  buckets = DEFAULT_BUCKETS,
  nextLabel = "Meeting in 30 min",
}: ReminderProps) {
  return (
    <div
      className={cn(
        "flex size-52 flex-col justify-between rounded-3xl border border-border bg-background p-4 shadow-md",
        className,
      )}
    >
      <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </p>

      <div className="flex items-stretch justify-between gap-2">
        {buckets.slice(0, 2).map((bucket) => (
          <div
            key={bucket.label}
            className={cn(
              "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-3",
              bucket.className,
            )}
          >
            <span className="text-2xl font-semibold tabular-nums leading-none text-foreground">
              {bucket.count}
            </span>
            <span className="w-full border-t border-border/60 pt-1.5 text-center text-xs font-medium text-muted-foreground">
              {bucket.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-1.5 text-foreground">
        <ArrowRight size={16} className="mt-0.5 shrink-0 text-muted-foreground" aria-hidden />
        <p className="line-clamp-2 text-sm font-medium leading-snug">{nextLabel}</p>
      </div>
    </div>
  );
}
