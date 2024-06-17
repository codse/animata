"use client";
import { useEffect, useState } from "react";
import { Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Watertracker() {
  const [waterIntake, setWaterIntake] = useState(500);
  const dailyGoal = 3000;
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
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
    <div className={cn("group relative h-40 w-52 rounded-3xl bg-gray-800 p-3")}>
      <style jsx>{`
        .progress-bar {
          animation: load 0.5s forwards;
        }

        @keyframes fill {
          from {
            width: 0;
          }
          to {
            width: var(--progress-width);
          }
        }

        .progress-bar-fill {
          animation: fill 0.3s forwards;
        }
      `}</style>
      <div className="flex items-center justify-center gap-1">
        <Droplet color="#1d4ed8" size={22} />
        <p className="text-sm font-semibold text-white">Water</p>
      </div>
      <div className="flex justify-center">
        <h1 className="mt-1 text-xl font-bold text-white">{waterIntake} ml</h1>
      </div>
      <div className="flex justify-center">
        <p className="font-sans text-xs text-gray-400">Today</p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleAddWater}
          className="mt-2 h-8 w-24 transform rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-sm font-semibold text-white transition-transform hover:scale-105 hover:shadow-lg"
        >
          +250 ml
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="relative h-8 w-full overflow-hidden rounded-b-3xl border-t-2 bg-gray-800">
          <div
            className={`absolute left-0 top-0 h-8 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 ease-in-out ${
              initialLoad ? "progress-bar" : "progress-bar-fill"
            }`}
            style={{
              width: `${progress}%`,
              "--progress-width": `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
