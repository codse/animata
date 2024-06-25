"use client";
import { useEffect, useState } from "react";
import React from "react";
import { LocateIcon, TruckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface DeliveryCardProps {
  progress?: number;
  arrivalTime?: string;
  location?: string;
  timeAgo?: string;
}

const DeliveryCard = ({
  progress = 10,
  arrivalTime = "09:26",
  location = "Pokhara",
  timeAgo = "30 min",
}: DeliveryCardProps) => {
  const [adjustedProgress, setAdjustedProgress] = useState(progress);
  const status = progress <= 0 ? "Processing" : progress >= 100 ? "Delivered" : "In Transit";

  useEffect(() => {
    const timeout = setInterval(() => {
      setAdjustedProgress((currentProgress) => {
        let newProgress = currentProgress;
        if (newProgress >= 100) {
          return 0;
        }
        newProgress += 30;
        return Math.min(Math.max(0, newProgress), 100);
      });
    }, 3000);
    return () => clearInterval(timeout);
  }, []);

  return (
    <div className="relative size-52 overflow-hidden rounded-3xl font-mono text-white">
      <div className="absolute right-2 z-10 h-28 w-5 bg-white/30">
        <div className="absolute -bottom-2 z-0 h-4 w-full rotate-45 bg-gray-700"></div>
      </div>

      <div className="flex h-full flex-col justify-between">
        <div className="relative w-full bg-gray-500 px-4 pb-2 pt-4">
          <div className="absolute right-2 top-0 flex h-full w-5 justify-center">
            <div className="z-20 w-[2px] bg-gray-500"></div>
          </div>
          <p className="text-md">{adjustedProgress === 100 ? "Arrived" : "Arrives Today"}</p>
          <p className="font-mono text-xl font-bold">{arrivalTime}</p>
        </div>

        <div className="border-t-2 border-t-gray-900 bg-gray-700 px-4 pb-4 pt-2">
          <p className="w-full text-yellow-400">{status}</p>
          <div className="relative mx-0.5 mb-6 mt-5 bg-gray-400">
            <div className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-yellow-300"></div>
            <div className="absolute right-0 top-1/2 z-10 size-3 -translate-y-1/2 rounded-full bg-gray-400"></div>
            <div
              className="relative h-0.5 bg-yellow-300 transition-all ease-in-out [transition-duration:500ms]"
              style={{
                width: `${adjustedProgress}%`,
              }}
            >
              <TruckIcon
                className={cn(
                  "absolute right-0 top-1/2 z-50 size-8 -translate-y-1/2 translate-x-1/2 rounded-full bg-yellow-300 p-1.5 text-gray-700 transition-all duration-500",
                )}
              />
            </div>
          </div>

          <div className="my-1 flex gap-1 tracking-tight text-gray-400">
            <LocateIcon className="inline size-4" />
            <div>
              <span className="line-clamp-1 text-sm leading-none">{location}</span>
              <span className="text-sm leading-none">{timeAgo} ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
