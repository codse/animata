import { cn } from "@/lib/utils";
import { LocateIcon, TruckIcon } from "lucide-react";
import React from "react";

interface DeliveryCardProps {
  progress: number;
  arrivalTime: string;
  status: "Pending" | "Processing" | "In Transit" | "Delivered" | "Cancelled";
  location: string;
  timeAgo: string;
}

const DeliveryCard = ({
  progress,
  arrivalTime,
  status,
  location,
  timeAgo,
}: DeliveryCardProps) => {
  return (
    <div className="relative min-h-40 w-52 overflow-hidden rounded-2xl text-white">
      <div
        className={cn(
          "absolute right-2 z-10 w-5 bg-white/30",
          progress < 100 ? "h-32" : "h-24",
        )}
      >
        <div className="absolute -bottom-[10px] left-[2px] h-4 w-full rotate-45 bg-gray-700"></div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="relative w-full bg-gray-500 p-4">
          <div className="absolute right-2 top-0 flex h-full w-5 justify-center">
            <div className="z-20 w-[2px] bg-gray-500"></div>
          </div>
          <p className="text-md font-mono">
            {progress >= 100 ? "Delivered" : "Arrives Today"}
          </p>
          {progress < 100 && (
            <p className="font-mono text-xl font-bold">{arrivalTime}</p>
          )}
        </div>
        <div className="border-t-2 border-t-gray-900 bg-gray-700 p-4">
          <p className="text-yellow-400">{status}</p>

          <div className="progress-bar relative my-4 flex h-4 items-center rounded-3xl transition-all">
            <div className="absolute h-1 w-[calc(100%-10px)] rounded-3xl bg-gray-500"></div>
            <div className="absolute size-3 rounded-full bg-yellow-300"></div>
            <div className="absolute right-[10px] size-4 rounded-full bg-gray-500"></div>
            <div className="relative -ml-1 flex w-full items-center p-1">
              <div
                className="h-1 bg-yellow-300"
                style={{
                  width: `${progress < 0 ? 0 : progress > 100 ? 100 : progress}%`,
                }}
              ></div>
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full p-1",
                  progress >= 100 ? "bg-green-500" : "bg-yellow-300",
                )}
              >
                <TruckIcon color="black" size={18} />
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-gray-400">
            <LocateIcon />
            <p>
              {location} {timeAgo} ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
