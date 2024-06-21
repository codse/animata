"use client";
import { cn } from "@/lib/utils";
import { AlarmClockIcon } from "lucide-react";
import ToggleSwitch from "@/animata/button/toggle-switch";
import { useState } from "react";

interface AlarmProps {
  alarms: { id?: number; time: string; repetition: string }[];
}

export default function AlarmClock({ alarms }: AlarmProps) {
  const [toggleStates, setToggleStates] = useState(alarms.map(() => false));

  const handleToggleChange = (index: number) => {
    setToggleStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className={cn("group min-h-40 w-52 rounded-3xl bg-gray-800 p-4")}>
      <div className="flex items-center justify-between">
        <p className="text-md font-bold text-white">Alarms</p>
        <AlarmClockIcon size={20} color="white" className="mt-1" />
      </div>
      {alarms.map((alarm, index) => (
        <div className="mt-3 flex items-center justify-between" key={index}>
          <div className="flex-col justify-start">
            <p
              className={`text-md font-bold ${toggleStates[index] ? "text-white" : "text-gray-500"}`}
            >
              {alarm.time}
            </p>
            <p
              className={`text-xs font-bold ${toggleStates[index] ? "text-white" : "text-gray-500"}`}
            >
              {alarm.repetition}
            </p>
          </div>
          <ToggleSwitch
            className="h-5 w-9"
            circleClass="h-3 w-3"
            onChecked={() => handleToggleChange(index)} // Pass index to identify which alarm is toggled
          />
        </div>
      ))}
    </div>
  );
}
