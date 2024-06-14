import React, { useState } from "react";
import { FlagIcon, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlidingButtonProps {
  initialConnected?: boolean;
  className?: string;
}

interface VpnConnectionProps {
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
        "relative mt-4 inline-flex h-16 w-44 cursor-pointer items-center rounded-2xl border border-gray-700 bg-gray-300 p-1 transition-colors",
        className,
      )}
      onClick={() => setConnected(!connected)}
    >
      <div
        className={cn(
          "absolute h-6 w-6 transform rounded-full border-4 border-gray-400 bg-gray-300 shadow-md transition-transform",
          connected ? "left-3" : "right-3",
        )}
      ></div>
      <div
        className={cn(
          "absolute flex h-[60px] w-[110px] flex-col items-center justify-center rounded-2xl border-gray-400 bg-white transition-transform",
          connected ? "right-0 text-zinc-900" : "left-0 text-gray-500",
        )}
      >
        <span className="text-base font-medium tracking-tighter">
          {connected ? "Connected" : "Disconnected"}
        </span>
        {connected && (
          <div className="mt-1 flex items-center text-purple-600">
            <Shield size={16} fill="#9333EA" className="mr-1" />
            <span className="text-sm">Secured</span>
          </div>
        )}
      </div>
    </div>
  );
};

const VpnConnection: React.FC<VpnConnectionProps> = ({
  userName = "Drammen",
  latency = "53ms",
  netSpeed = "57.4",
  className,
}) => {
  return (
    <div className={className}>
      <div
        className={cn(
          "group flex min-h-52 w-52 flex-col rounded-3xl bg-[#142e68]",
        )}
      >
        <div className="flex items-center p-4">
          <FlagIcon size={24} className="text-yellow-400" />
          <h3 className={cn("ml-2 text-xl font-semibold tracking-wide")}>
            {userName}
          </h3>
        </div>
        <div
          className={cn(
            "group flex min-h-40 w-52 flex-col rounded-3xl border-4 border-[#142e68] bg-white p-4",
          )}
        >
          <div
            className={cn(
              "flex h-9 w-20 items-center justify-center gap-1 rounded-xl bg-green-100",
            )}
          >
            <div className="h-2 w-2 rounded-full border-[3.5px] border-green-600 bg-white"></div>
            <h6 className="text-xl text-green-600">{latency}</h6>
          </div>
          <h2 className={cn("font-semibol mt-2 text-4xl text-zinc-900")}>
            {netSpeed}
            <sup className={cn("font-medium tracking-tighter text-gray-400")}>
              mb
            </sup>
          </h2>
          <div className="flex justify-center">
            <SlidingButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VpnConnection;
export { SlidingButton };
