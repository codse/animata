"use client";
import { useState } from "react";
import { FlagIcon, ShieldBan, ShieldCheck } from "lucide-react";

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
  defaultConnected?: boolean;
}

function SlidingButton({ initialConnected = false, className }: SlidingButtonProps) {
  const [connected, setConnected] = useState(initialConnected);

  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl bg-gray-200/75 transition-colors",
        className,
      )}
      onClick={() => setConnected(!connected)}
    >
      <div className="flex h-12 w-8 items-center justify-center">
        <div
          className={cn("h-3 w-3 rounded-full bg-red-500 transition-opacity", {
            "opacity-0 duration-300": connected,
            "opacity-100": !connected,
          })}
        />
      </div>
      <div
        className={cn(
          "absolute z-10 flex h-11 w-36 flex-1 flex-col items-center justify-center rounded-[14px] bg-white py-2 transition-all duration-200 ease-in-out hover:bg-gray-50/95 active:bg-gray-50/70",
          {
            "left-0.5": connected,
            "left-[34px]": !connected,
          },
        )}
      >
        <strong className="select-none text-sm text-black">
          {connected ? "Connected" : "Disconnected"}
        </strong>
        <span
          className={cn("-mt-1 inline-flex select-none items-center gap-1 text-xs font-semibold", {
            "text-blue-700/50": connected,
            "text-red-700/50": !connected,
          })}
        >
          {connected ? <ShieldCheck size={12} /> : <ShieldBan size={12} />}
          {connected ? "Secured" : "Not Secured"}
        </span>
      </div>
      <div className="flex h-12 w-8 items-center justify-center">
        <div
          className={cn("h-3 w-3 rounded-full bg-green-500 transition-opacity", {
            "opacity-0 duration-300": !connected,
            "opacity-100 group-hover:animate-pulse": connected,
          })}
        />
      </div>
    </div>
  );
}

export default function VpnConnection({
  userName = "Animata",
  latency = "53ms",
  netSpeed = "57.4",
  className,
  defaultConnected = false,
}: VpnConnectionProps) {
  return (
    <div className={className}>
      <div className={cn("group flex size-52 flex-col rounded-3xl bg-blue-900 p-0.5")}>
        <div className="flex items-center gap-2 px-4 pb-2 pt-4">
          <FlagIcon size={24} className="fill-yellow-500 text-yellow-500" />
          <h3 className={cn("text-xl font-semibold tracking-wide text-yellow-500")}>{userName}</h3>
        </div>
        <div className={cn("group flex w-full flex-1 flex-col gap-1 rounded-[22px] bg-white p-3")}>
          <div
            className={cn(
              "inline-flex max-w-fit items-center justify-center gap-1 rounded-xl bg-green-100 px-2 text-sm font-semibold",
            )}
          >
            <div className="animate-sl h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <h6 className="text-green-600">{latency}</h6>
          </div>
          <h2 className={cn("mt-2 text-4xl font-semibold text-zinc-900")}>
            {netSpeed}
            <sup className={cn("font-bold tracking-tighter text-gray-700/50")}>mb</sup>
          </h2>
          <div className="mt-auto">
            <SlidingButton initialConnected={defaultConnected} />
          </div>
        </div>
      </div>
    </div>
  );
}
