"use client";

import { AlarmClockIcon } from "lucide-react";
import { useState } from "react";

import ToggleSwitch from "@/animata/button/toggle-switch";
import { cn } from "@/lib/utils";

export type AlarmItem = {
  id: string | number;
  time: string;
  schedule: string;
};

export type AlarmClockProps = {
  className?: string;
  alarms?: AlarmItem[];
  defaultEnabledIds?: Array<string | number>;
};

const DEFAULT_ALARMS: AlarmItem[] = [
  { id: "weekday", time: "7:30 AM", schedule: "Weekdays" },
  { id: "weekend", time: "9:00 AM", schedule: "Sat & Sun" },
];

export default function AlarmClock({
  className,
  alarms = DEFAULT_ALARMS,
  defaultEnabledIds = ["weekday"],
}: AlarmClockProps) {
  const visible = alarms.slice(0, 2);
  const [enabledIds, setEnabledIds] = useState(() => new Set(defaultEnabledIds));

  const handleToggle = (id: string | number, on: boolean) => {
    setEnabledIds((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <div
      className={cn(
        "flex size-52 flex-col rounded-3xl border border-border bg-background p-4 shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Alarms</p>
        <AlarmClockIcon className="size-4 text-muted-foreground" aria-hidden />
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col justify-center gap-3">
        {visible.map((alarm) => {
          const on = enabledIds.has(alarm.id);
          return (
            <div className="flex items-center justify-between gap-2" key={alarm.id}>
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-lg font-semibold tabular-nums tracking-tight",
                    on ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {alarm.time}
                </p>
                <p className={cn("text-xs", on ? "text-foreground" : "text-muted-foreground")}>
                  {alarm.schedule}
                </p>
              </div>
              <ToggleSwitch
                defaultChecked={on}
                onChange={(value) => handleToggle(alarm.id, value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
