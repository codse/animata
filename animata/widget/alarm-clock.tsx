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
  const [toggleStates, setToggleStates] = useState(alarms.map(() => false));

  const handleToggleChange = (index: number) => {
    setToggleStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className={cn("group h-52 w-52 rounded-3xl bg-gray-800 p-4")}>
      <div className="flex items-center justify-between">
        <p className="text-md font-bold text-white">Alarms</p>
        <AlarmClockIcon size={20} color="white" className="mt-1" />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {alarms.map((alarm, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex-col justify-start tabular-nums">
              <p
                className={`text-md font-bold ${toggleStates[index] ? "text-foreground" : "text-gray-500"}`}
              >
                {alarm.time}
              </p>
              <p
                className={`text-xs font-medium ${toggleStates[index] ? "text-foreground" : "text-gray-500"}`}
              >
                {alarm.repetition}
              </p>
            </div>
            <ToggleSwitch
              onChecked={() => handleToggleChange(index)} // Pass index to identify which alarm is toggled
            />
          </div>
        ))}
      </div>
    </div>
  );
}
