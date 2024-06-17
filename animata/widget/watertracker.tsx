"use client";
import { useEffect, useState } from "react";
import { Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

interface Watertracker {
  dailyGoal: number;
}

export default function Watertracker({ dailyGoal }: Watertracker) {
  const [waterIntake, setWaterIntake] = useState(1500);
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
    <div
      className={cn("group relative flex h-40 w-44 rounded-3xl bg-gray-800")}
    >
      <style jsx>{`
        .progress-bar {
          animation: load 0.5s forwards;
        }

        @keyframes fill {
          from {
            height: 0;
          }
          to {
            height: var(--progress-height);
          }
        }

        .progress-bar-fill {
          animation: fill 2s forwards;
        }
      `}</style>
      <div className="flex w-full flex-col pr-9 pt-2">
        <div className="mb-auto flex items-center justify-center gap-1">
          <Droplet color="#1d4ed8" size={22} />
          <p className="text-sm font-semibold text-white">Water</p>
        </div>
        <div className="mb-auto flex justify-center">
          <h1 className="mt-1 text-xl font-bold text-white">
            {waterIntake} ml
          </h1>
        </div>
        <div className="mb-auto flex justify-center">
          <p className="font-sans text-xs text-gray-400">Today</p>
        </div>
        <div className="mb-2 flex justify-center">
          <button
            onClick={handleAddWater}
            className="h-8 w-24 transform rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-sm font-semibold text-white transition-transform hover:scale-105 hover:shadow-lg"
          >
            +250 ml
          </button>
        </div>
      </div>

      <div className="relative flex flex-col items-end">
        <div className="absolute bottom-0 right-0 h-full w-10 overflow-hidden rounded-r-3xl border-l-2 border-gray-700 bg-gray-800">
          <div
            className={`absolute bottom-0 right-0 w-full bg-gradient-to-t from-blue-500 to-blue-700 transition-all duration-300 ease-in ${
              initialLoad ? "progress-bar" : "progress-bar-fill"
            }`}
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
