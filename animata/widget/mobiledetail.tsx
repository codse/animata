import { BatteryMedium, Cpu, Database, Volume1 } from "lucide-react";
import React from "react";

interface ProgressBarData {
  label: string;
  value: number;
  max: number;
  icon?: JSX.Element;
}

export default function MobileDetail() {
  const progressBarsData: ProgressBarData[] = [
    {
      label: "Battery",
      value: 25,
      max: 100,
      icon: <BatteryMedium size={10} color="#a29b9c" />,
    },
    {
      label: "Volume",
      value: 50,
      max: 100,
      icon: <Volume1 size={10} color="#a29b9c" />,
    },
    {
      label: "Ram",
      value: 75,
      max: 100,
      icon: <Cpu size={10} color="#a29b9c" />,
    },
    {
      label: "Storage",
      value: 90,
      max: 100,
      icon: <Database size={10} color="#a29b9c" />,
    },
  ];

  return (
    <div className="m-h-40 w-52 rounded-3xl bg-zinc-900 p-2 pt-5">
      <div className="flex flex-wrap items-center justify-center">
        {progressBarsData.map((bar, index) => {
          const percentage = (bar.value / bar.max) * 100;

          return (
            <div key={index} className="mb-4 p-2">
              <div className="relative flex h-[75px] w-[75px] flex-col-reverse overflow-hidden rounded-md bg-zinc-800">
                <div
                  className="w-[75px] bg-stone-700"
                  style={{ height: `${percentage}%` }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {bar.icon && (
                    <div className="absolute left-1 top-1">{bar.icon}</div>
                  )}
                  <p className="text-[9px] font-bold text-[#a29b9c]">
                    {bar.label}
                  </p>
                  <p className="text-[10px] font-bold text-[#a29b9c]">
                    {percentage}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
