import BarChart from "@/animata/graphs/bar-chart";

import { cn } from "@/lib/utils";

export type ScoreBoardItem = {
  progress: number;
  label: string;
  className?: string;
  containerClassName?: string;
};

export type ScoreBoardProps = {
  className?: string;
  items?: ScoreBoardItem[];
  statusLabel?: string;
  statusTone?: "good" | "warning" | "neutral";
  overallPercent?: number;
  overallCaption?: string;
};

const DEFAULT_ITEMS: ScoreBoardItem[] = [
  { label: "A", progress: 34, className: "rounded-md bg-green-500" },
  { label: "B", progress: 14, className: "rounded-md bg-red-500" },
  { label: "C", progress: 34, className: "rounded-md bg-green-500" },
  { label: "D", progress: 70, className: "rounded-md bg-green-500" },
  { label: "E", progress: 52, className: "rounded-md bg-green-500" },
  { label: "F", progress: 30, className: "rounded-md bg-green-500" },
  { label: "G", progress: 37, className: "rounded-md bg-green-500" },
  { label: "H", progress: 72, className: "rounded-md bg-green-500" },
  { label: "I", progress: 42, className: "rounded-md bg-green-500" },
];

const STATUS_TONE_CLASS = {
  good: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  neutral: "text-foreground",
} as const;

export default function ScoreBoard({
  className,
  items = DEFAULT_ITEMS,
  statusLabel = "Good",
  statusTone = "good",
  overallPercent = 80,
  overallCaption = "score, progress",
}: ScoreBoardProps) {
  return (
    <div
      className={cn(
        "flex size-52 flex-col rounded-3xl border border-border bg-background p-4 font-sans shadow-md",
        className,
      )}
    >
      <p className="shrink-0 text-[15px] font-semibold leading-none text-foreground">
        Status{" "}
        <span className={cn("font-semibold", STATUS_TONE_CLASS[statusTone])}>{statusLabel}</span>
      </p>

      <div className="mt-2 min-h-0 w-full flex-1">
        <BarChart height={90} items={items} />
      </div>

      <div className="mt-3 shrink-0">
        <p className="text-[13px] leading-none text-muted-foreground">Overall progress</p>
        <p className="mt-1 text-[22px] font-normal leading-none tabular-nums tracking-tight text-foreground">
          {overallPercent}%
          <span className="ml-1 text-[13px] font-normal text-muted-foreground">
            ({overallCaption})
          </span>
        </p>
      </div>
    </div>
  );
}
