"use client";

import DonutChart from "@/animata/graphs/donut-chart";

import { cn } from "@/lib/utils";

const DEFAULT_IMAGE =
  "https://plus.unsplash.com/premium_vector-1689096672037-98309fdc7f44?bg=FFFFFF&q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3";

export type CalorieCounterProps = {
  className?: string;
  goal?: number;
  fulfilled?: number;
  /** @deprecated Use `avatarUrl` */
  image?: string;
  avatarUrl?: string;
  weekday?: string;
  dateLabel?: string;
};

export default function CalorieCounter({
  className,
  goal = 4000,
  fulfilled = 120,
  image,
  avatarUrl = image ?? DEFAULT_IMAGE,
  weekday = "Monday",
  dateLabel = "25 October",
}: CalorieCounterProps) {
  const progress = goal > 0 ? Math.min(100, (fulfilled / goal) * 100) : 0;

  return (
    <div
      className={cn(
        "calorie-container relative flex h-96 w-52 flex-col items-center justify-start gap-4 rounded-3xl border-2 border-gray-200 bg-gray-100 px-5 py-3 sm:w-72 dark:border-none dark:bg-slate-800",
        className,
      )}
    >
      <div className="flex w-full flex-row items-center justify-between pt-2">
        <div>
          <p className="text-gray-400">{weekday}</p>
          <p className="text-xl dark:text-white">{dateLabel}</p>
        </div>
        <img
          alt=""
          src={avatarUrl}
          className="h-10 w-10 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://avatar.vercel.sh/calorie";
          }}
        />
      </div>

      <div className="relative m-2 grid size-[180px] shrink-0 place-items-center">
        <DonutChart
          progress={progress}
          circleWidth={18}
          progressWidth={18}
          size={180}
          progressClassName="text-green-400 dark:text-cyan-300"
          className="col-start-1 row-start-1"
        />
        <div className="col-start-1 row-start-1 flex flex-col items-center text-center">
          <p className="text-gray-400 dark:text-gray-200">Today</p>
          <p className="text-xl dark:text-white">{fulfilled}Cal</p>
        </div>
      </div>

      <div className="flex h-14 w-full mt-auto shrink-0 items-center justify-between rounded-xl border-gray-100 bg-gray-400/10 px-4 backdrop-blur-sm sm:w-64">
        <p className="dark:text-white">Your goal</p>
        <p className="font-bold text-orange-300">{goal}Cal</p>
      </div>
    </div>
  );
}
