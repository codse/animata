"use client";
import BarChart from "@/animata/graphs/bar-chart";

interface ISleepTrackerProps {
  items: {
    progress: number;
    label: string;
    className?: string;
    containerClassName?: string;
  }[];
  image: string;
}

export const testSleepTrackerProps: ISleepTrackerProps = {
  items: [
    {
      label: "A",
      progress: 45,
      className: "rounded-md dark:bg-blue-400/45 bg-blue-600/45",
    },
    {
      label: "B",
      progress: 25,
      className: "rounded-md dark:bg-blue-400/25 bg-blue-600/25",
    },
    {
      label: "C",
      progress: 15,
      className: "rounded-md dark:bg-blue-400/15 bg-blue-600/15",
    },
    {
      label: "B",
      progress: 10,
      className: "rounded-md dark:bg-blue-400/20 bg-blue-600/20",
    },
    {
      label: "C",
      progress: 15,
      className: "rounded-md dark:bg-blue-300/15 bg-blue-600/15",
    },
    {
      label: "D",
      progress: 30,
      className: "rounded-md dark:bg-blue-300/30 bg-blue-600/30",
    },
    {
      label: "E",
      progress: 70,
      className: "rounded-md dark:bg-blue-300/70 bg-blue-600/70",
    },
    {
      label: "A",
      progress: 45,
      className: "rounded-md dark:bg-blue-300/45 bg-blue-600/45",
    },
    {
      label: "B",
      progress: 10,
      className: "rounded-md dark:bg-blue-300/20 bg-blue-600/20",
    },
    {
      label: "C",
      progress: 15,
      className: "rounded-md dark:bg-blue-300/15 bg-blue-600/15",
    },
    {
      label: "B",
      progress: 10,
      className: "rounded-md dark:bg-blue-300/20 bg-blue-600/20",
    },
    {
      label: "B",
      progress: 10,
      className: "rounded-md dark:bg-blue-300/20 bg-blue-600/20",
    },
    {
      label: "B",
      progress: 10,
      className: "rounded-md dark:bg-blue-300/20 bg-blue-600/20",
    },
    {
      label: "C",
      progress: 85,
      className: "rounded-md dark:bg-blue-300/85 bg-blue-600/85",
    },
    {
      label: "D",
      progress: 90,
      className: "rounded-md dark:bg-blue-300/90 bg-blue-600/90",
    },
    {
      label: "E",
      progress: 15,
      className: "rounded-md dark:bg-blue-300/15 bg-blue-600/15",
    },
  ],
  image:
    "https://plus.unsplash.com/premium_photo-1675107359574-e3ba5f47a1a2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export default function SleepTracker({
  items = testSleepTrackerProps.items,
  image = testSleepTrackerProps.image,
}: ISleepTrackerProps) {
  return (
    <div className="flex size-52 flex-col justify-evenly rounded-3xl border border-gray-200 bg-white p-4 dark:border-zinc-700 dark:bg-slate-800">
      <div className="mb-2 flex flex-row items-center gap-3">
        <div className="icon flex h-4 w-4 items-center justify-center rounded-full bg-red-50">
          <div className="inner-icon h-2 w-2 rounded-full bg-red-500"></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-white">Sleep Tracker</p>
      </div>
      <img className="h-16 w-full rounded-xl object-cover" src={image} alt="Sleep Tracker" />

      <BarChart className="pt-1" items={items} height={40} />
      <div className="activity mt-2 flex flex-row justify-between text-sm">
        <p className="text-primary opacity-70">Activity</p>
        <p className="text-muted-foreground">
          <strong>32m</strong> ago
        </p>
      </div>
    </div>
  );
}
