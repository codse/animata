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
        "flex size-52 flex-col rounded-3xl border border-border bg-background p-4 font-sans shadow-md",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between">
        <p className="text-[15px] font-semibold leading-none text-foreground">Alarms</p>
        <AlarmClockIcon className="size-[15px] text-muted-foreground" strokeWidth={2} aria-hidden />
      </div>

      <ul className="mt-3 flex flex-col gap-4">
        {visible.map((alarm) => {
          const on = enabledIds.has(alarm.id);
          return (
            <li className="flex items-start justify-between gap-3" key={alarm.id}>
              <div className="min-w-0 pt-0.5">
                <p
                  className={cn(
                    "text-[22px] font-normal leading-none tabular-nums tracking-tight",
                    on ? "text-foreground" : "text-muted-foreground/80",
                  )}
                >
                  {alarm.time}
                </p>
                <p
                  className={cn(
                    "mt-1 text-[13px] leading-none",
                    on ? "text-muted-foreground" : "text-muted-foreground/70",
                  )}
                >
                  {alarm.schedule}
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <ToggleSwitch
                  defaultChecked={on}
                  onChange={(value) => handleToggle(alarm.id, value)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
