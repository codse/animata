import { BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";

export type WeeklyProgressProps = {
  className?: string;
  author?: string;
  title?: string;
  percent?: number;
};

const DAYS = ["M", "T", "W", "TH", "F", "S", "SU"] as const;

export default function WeeklyProgress({
  className,
  author = "Chris Dixon",
  title = "Read Write Own",
  percent = 30,
}: WeeklyProgressProps) {
  return (
    <div
      className={cn(
        "flex size-52 flex-col rounded-3xl border border-border bg-amber-50 p-4 font-sans shadow-md dark:bg-amber-950/40",
        className,
      )}
    >
      <div className="shrink-0">
        <p className="text-[13px] leading-none text-muted-foreground">{author}</p>
        <p className="mt-1 text-[15px] font-semibold leading-snug text-foreground">{title}</p>
      </div>

      <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/60 px-2.5 py-1.5">
        <BookOpen
          className="size-4 text-amber-600 dark:text-amber-400"
          strokeWidth={2}
          aria-hidden
        />
        <p className="text-[13px] font-medium tabular-nums leading-none text-foreground">
          {percent}%
        </p>
      </div>

      <div className="mt-2 flex flex-wrap justify-start gap-0.5">
        {DAYS.map((day, index) => (
          <svg
            key={day}
            width="40"
            height="40"
            viewBox="-25 -25 250 250"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            style={{ transform: "rotate(-90deg)" }}
            aria-hidden
          >
            <circle
              r="90"
              cx="100"
              cy="100"
              fill="transparent"
              className="stroke-border"
              strokeWidth="16px"
              strokeDasharray="565.48px"
              strokeDashoffset="0"
            />
            <circle
              r="90"
              cx="100"
              cy="100"
              className="stroke-amber-500"
              strokeWidth="16px"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray="565.48px"
              strokeDashoffset="565.48px"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="565.48"
                to="118.692"
                dur={`${0.5 + index * 0.1}s`}
                fill="freeze"
              />
            </circle>
            <text
              className="fill-foreground text-[56px] font-medium"
              x="100px"
              y="105px"
              dominantBaseline="middle"
              textAnchor="middle"
              style={{ transform: "rotate(90deg) translate(0px, -196px)" }}
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur={`${0.5 + index * 0.1}s`}
                fill="freeze"
              />
              {day}
            </text>
          </svg>
        ))}
      </div>
    </div>
  );
}
