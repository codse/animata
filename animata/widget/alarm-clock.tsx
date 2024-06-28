"use client";

import { useState } from "react";
import { AlarmClockIcon } from "lucide-react";

import ToggleSwitch from "@/animata/button/toggle-switch";
import { cn } from "@/lib/utils";

interface AlarmProps {
  alarms: { id?: number; time: string; repetition: string }[];
}

export default function AlarmClock({
  // Placeholder data
  alarms = [
    { id: 0, time: "7:30 AM", repetition: "Once" },
    { id: 1, time: "8:00 AM", repetition: "Daily" },
    { id: 2, time: "9:00 AM", repetition: "Weekdays" },
  ],
}: AlarmProps) {
  const [toggleStates, setToggleStates] = useState(new Set<number>());

  const handleToggleChange = (value: boolean, index: number) => {
    setToggleStates((prevStates) => {
      const newStates = new Set(prevStates);
      if (value) {
        newStates.add(index);
      } else {
        newStates.delete(index);
      }
      return newStates;
    });
  };

  return (
    <div className={cn("group size-52 rounded-3xl border bg-background p-4 dark:border-zinc-700")}>
      <div className="flex items-center justify-between">
        <p className="text-md font-bold text-foreground">Alarms</p>
        <AlarmClockIcon size={20} className="mt-1 text-muted-foreground" />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {alarms.map((alarm, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex-col justify-start tabular-nums">
              <p
                className={`text-md font-bold ${toggleStates.has(index) ? "text-foreground" : "text-muted-foreground"}`}
              >
                {alarm.time}
              </p>
              <p
                className={`text-xs font-medium ${toggleStates.has(index) ? "text-foreground" : "text-muted-foreground"}`}
              >
                {alarm.repetition}
              </p>
            </div>
            <ToggleSwitch
              defaultChecked={toggleStates.has(index)}
              onChange={(value) => handleToggleChange(value, index)} // Pass index to identify which alarm is toggled
            />
          </div>
        ))}
      </div>
    </div>
  );
}
