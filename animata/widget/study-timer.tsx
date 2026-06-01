import { GraduationCap, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export type StudyTimerSegment = {
  value: number;
  color: string;
};

export type StudyTimerProps = {
  className?: string;
  segments?: StudyTimerSegment[];
  /** Shown in the focus badge (e.g. pomodoro count). */
  sessionCount?: number;
};

const DEFAULT_SEGMENTS: StudyTimerSegment[] = [
  { value: 57, color: "rgb(251 146 60)" },
  { value: 24, color: "rgb(244 114 182)" },
  { value: 26, color: "rgb(250 204 21)" },
];

const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return [hours, minutes].map((n) => String(n).padStart(2, "0")).join(":");
};

function SegmentBar({ segment, totalSum }: { segment: StudyTimerSegment; totalSum: number }) {
  const widthPercent = totalSum > 0 ? (segment.value / totalSum) * 100 : 0;
  return (
    <div
      className="h-full rounded-sm"
      style={{ width: `${widthPercent}%`, backgroundColor: segment.color }}
    />
  );
}

export default function StudyTimer({
  className,
  segments = DEFAULT_SEGMENTS,
  sessionCount = 21,
}: StudyTimerProps) {
  const totalMinutes = segments.reduce((acc, segment) => acc + segment.value, 0);
  const time = formatTime(totalMinutes);

  return (
    <div
      className={cn(
        "flex size-52 flex-col rounded-3xl bg-zinc-900 p-4 font-sans text-white shadow-md",
        className,
      )}
    >
      <div className="flex shrink-0 items-start justify-between">
        <button
          type="button"
          className={cn(
            "relative flex min-h-9 min-w-9 items-center justify-center rounded-full",
            "before:absolute before:inset-0 before:animate-pulse before:rounded-full before:border-2 before:border-sky-500/80",
          )}
          aria-label="Study session"
        >
          <GraduationCap className="relative z-10 size-[18px]" strokeWidth={2} aria-hidden />
        </button>
        <div className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-1">
          <XCircle className="size-3 fill-zinc-900 text-amber-400" aria-hidden />
          <span className="text-[13px] font-medium tabular-nums leading-none text-zinc-900">
            {sessionCount}
          </span>
        </div>
      </div>

      <div className="mt-3 shrink-0">
        <p className="text-[22px] font-normal leading-none tabular-nums tracking-tight">{time}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium leading-none">
          {segments.map((segment, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2"
              style={{ color: segment.color }}
            >
              <span className="tabular-nums">{segment.value}m</span>
              {index !== segments.length - 1 ? (
                <span className="size-1 rounded-full bg-zinc-600" aria-hidden />
              ) : null}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 gap-0.5">
        {segments.map((segment, index) => (
          <SegmentBar key={index} segment={segment} totalSum={totalMinutes} />
        ))}
      </div>
    </div>
  );
}
