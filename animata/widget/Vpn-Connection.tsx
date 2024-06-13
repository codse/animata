import React, { useState } from "react";
import { FlagIcon, Plus, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlidingButtonProps {
  initialConnected?: boolean;
  className?: string;
}

interface VpmConnectionProps {
  userName?: string;
  latency?: string;
  netSpeed?: string;
  className?: string;
}

const SlidingButton: React.FC<SlidingButtonProps> = ({
  initialConnected = false,
  className,
}) => {
  const [connected, setConnected] = useState(initialConnected);

  return (
    <div
      className={cn(
        "relative mt-4 inline-flex h-16 w-44 cursor-pointer items-center rounded-3xl border p-1 transition-colors",
        connected
          ? "border-gray-700 bg-gray-400"
          : "border-gray-700 bg-gray-300",
        className,
      )}
      onClick={() => setConnected(!connected)}
    >
      <div
        className={cn(
          "top-5.5 absolute left-3 h-6 w-6 transform rounded-full bg-white shadow-md transition-transform",
          connected ? "translate-x-full" : "translate-x-0",
        )}
      ></div>
      <div
        className={cn(
          "text-normal absolute left-[65px] flex h-[60px] w-[110px] flex-col items-center justify-center space-y-1 rounded-3xl border-gray-700 bg-white font-bold",
          connected ? "text-gray-900" : "text-gray-500",
        )}
      >
        <span>{connected ? "Connected" : "Disconnected"}</span>
        <div className="flex items-center text-purple-600">
          <Shield size={10} />
          <span className="text-xs">Secured</span>
        </div>
      </div>
    </div>
  );
};

const VpnConnection: React.FC<VpmConnectionProps> = ({
  userName = "Drammen",
  latency = "5ms",
  netSpeed = "10",
  className,
}) => {
  return (
    <div className={className}>
      <div
        className={cn(
          "group flex min-h-40 w-52 flex-col rounded-3xl bg-blue-900",
        )}
      >
        <div className="flex items-center p-4">
          <FlagIcon size={24} className="text-yellow-400" />
          <h3 className={cn("ml-3 font-bold")}>{userName}</h3>
        </div>
        <div
          className={cn(
            "group m-1 flex min-h-[165px] w-[200px] flex-col rounded-3xl border border-blue-900 bg-white p-4",
          )}
        >
          <div
            className={cn(
              "flex h-8 w-16 items-center gap-1 rounded-xl bg-green-100",
            )}
          >
            <Plus size={12} className="text-green-900" />
            <h6 className="font-medium text-green-900">{latency}</h6>
          </div>
          <h2 className={cn("mt-2 text-3xl font-extrabold text-black")}>
            {netSpeed}
            <sup className={cn("font-medium text-gray-500")}>mb</sup>
          </h2>
          <div>
            <SlidingButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VpnConnection;
export { SlidingButton };
