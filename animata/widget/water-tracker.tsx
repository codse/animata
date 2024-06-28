"use client";
import { useEffect, useState } from "react";
import { Droplet } from "lucide-react";

import { cn } from "@/lib/utils";

interface WaterTrackerProps {
  dailyGoal: number;
}

export default function WaterTracker({ dailyGoal = 5000 }: WaterTrackerProps) {
  const [waterIntake, setWaterIntake] = useState(0);

  useEffect(() => {
    setWaterIntake(1500);
  }, []);

  const handleAddWater = () => {
    setWaterIntake((prevIntake) => {
      if (prevIntake + 250 <= dailyGoal) {
        return prevIntake + 250;
      }
      return prevIntake;
    });
  };

  const progress = (waterIntake / dailyGoal) * 100;

  return (
    <div className={cn("group relative flex size-52 rounded-3xl bg-gray-800")}>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-center gap-1">
          <Droplet className="fill-blue-500 text-blue-500" size={22} />
          <p className="text-sm font-semibold text-white">Water</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="text-xl font-bold text-white">{waterIntake}ml</h1>
          <p className="font-sans text-xs text-gray-400">Today</p>
        </div>
        <div className="mb-2 flex justify-center">
          <button
            onClick={handleAddWater}
            disabled={waterIntake >= dailyGoal}
            className={cn(
              "transform rounded-full bg-gradient-to-r px-6 py-2 text-sm font-semibold text-white",
              {
                "cursor-not-allowed from-gray-600 to-gray-500 opacity-80": waterIntake >= dailyGoal,
                "from-blue-500 to-blue-700 transition-transform hover:scale-105 hover:shadow-lg":
                  waterIntake < dailyGoal,
              },
            )}
          >
            +250 ml
          </button>
        </div>
      </div>

      <div className="relative flex w-10 flex-col items-end">
        <div className="absolute bottom-0 right-0 h-full w-10 overflow-hidden rounded-r-3xl border-l-2 border-gray-700 bg-gray-800">
          <div
            className={
              "absolute bottom-0 right-0 w-full bg-gradient-to-t from-blue-500 to-blue-700 transition-all duration-100 ease-out"
            }
            style={{
              height: `${progress}%`,
              "--progress-height": `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
