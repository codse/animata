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
  arrivalTime = "09 : 26",
  location = "Pokhara",
  timeAgo = "30 min",
}: DeliveryCardProps) => {
  const [adjustedProgress, setAdjustedProgress] = useState(0);
  const status =
    progress <= 0 ? "Processing" : progress >= 100 ? "Delivered" : "In Transit";

  useEffect(() => {
    const timeout = setTimeout(() => {
      const adjustedProgress = Math.min(Math.max(0, progress), 100);
      setAdjustedProgress(adjustedProgress);
    }, 250);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="relative min-h-40 w-52 overflow-hidden rounded-2xl font-mono text-white">
      <div className="absolute right-2 z-10 h-32 w-5 bg-white/30">
        <div className="absolute -bottom-2 h-4 w-full rotate-45 bg-gray-700"></div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="relative w-full bg-gray-500 p-4">
          <div className="absolute right-2 top-0 flex h-full w-5 justify-center">
            <div className="z-20 w-[2px] bg-gray-500"></div>
          </div>
          <p className="text-md">
            {adjustedProgress === 100 ? "Arrived" : "Arrives Today"}
          </p>
          <p className="font-mono text-xl font-bold">{arrivalTime}</p>
        </div>
        <div className="border-t-2 border-t-gray-900 bg-gray-700 p-4">
          <p className="min-h-6 w-full text-yellow-400">{status}</p>
          <div className="relative my-8 bg-gray-400">
            <div className="absolute left-0 top-1/2 size-4 -translate-y-1/2 rounded-full bg-yellow-300"></div>
            <div className="absolute right-0 top-1/2 size-4 -translate-y-1/2 rounded-full bg-gray-400"></div>
            <div
              className="relative h-1 bg-yellow-300 transition-all ease-in-out [transition-duration:1500ms]"
              style={{
                width: `calc(2.5rem + (${adjustedProgress} / 100) * (100% - 2.5rem))`,
              }}
            >
              <TruckIcon
                className={cn(
                  "absolute right-0 top-1/2 size-10 -translate-y-1/2 rounded-full p-2 text-gray-700 transition-all duration-500",
                  adjustedProgress >= 100 ? "bg-green-500" : "bg-yellow-300",
                )}
              />
            </div>
          </div>
          <div className="my-1 line-clamp-1 tracking-tight text-gray-400">
            <LocateIcon className="mr-2 inline" />
            <span className="mr-1">{location}</span>
            <span>{timeAgo} ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
