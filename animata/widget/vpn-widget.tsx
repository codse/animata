"use client";

import { FlagIcon, ShieldBan, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type SlidingButtonProps = {
  connected: boolean;
  onConnectedChange: (connected: boolean) => void;
  className?: string;
};

function SlidingButton({ connected, onConnectedChange, className }: SlidingButtonProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={connected}
      className={cn(
        "touch-manipulation relative flex min-h-11 w-full items-center justify-between overflow-hidden rounded-2xl bg-muted transition-colors",
        className,
      )}
      onClick={() => onConnectedChange(!connected)}
    >
      <span className="flex h-11 w-8 items-center justify-center" aria-hidden>
        <span
          className={cn("size-2.5 rounded-full bg-red-500 transition-opacity", {
            "opacity-0": connected,
            "opacity-100": !connected,
          })}
        />
      </span>
      <span
        className={cn(
          "absolute z-10 flex h-10 w-[8.75rem] flex-col items-center justify-center rounded-[14px] bg-background py-1 shadow-sm transition-[left] duration-200 ease-out",
          connected ? "left-0.5" : "left-[34px]",
        )}
      >
        <span className="text-sm font-semibold text-foreground">
          {connected ? "Connected" : "Disconnected"}
        </span>
        <span
          className={cn("inline-flex items-center gap-1 text-xs font-medium", {
            "text-sky-700 dark:text-sky-400": connected,
            "text-red-700 dark:text-red-400": !connected,
          })}
        >
          {connected ? <ShieldCheck size={12} aria-hidden /> : <ShieldBan size={12} aria-hidden />}
          {connected ? "Secured" : "Not secured"}
        </span>
      </span>
      <span className="flex h-11 w-8 items-center justify-center" aria-hidden>
        <span
          className={cn("size-2.5 rounded-full bg-emerald-500 transition-opacity", {
            "opacity-0": !connected,
            "opacity-100": connected,
          })}
        />
      </span>
    </button>
  );
}

export type VpnConnectionProps = {
  className?: string;
  serverName?: string;
  latency?: string;
  downloadMbps?: string;
  defaultConnected?: boolean;
  connected?: boolean;
  onConnectedChange?: (connected: boolean) => void;
};

export default function VpnConnection({
  className,
  serverName = "Tokyo",
  latency = "53 ms",
  downloadMbps = "57.4",
  defaultConnected = false,
  connected: controlledConnected,
  onConnectedChange,
}: VpnConnectionProps) {
  const [internalConnected, setInternalConnected] = useState(defaultConnected);
  const connected = controlledConnected ?? internalConnected;

  const setConnected = (next: boolean) => {
    if (controlledConnected === undefined) {
      setInternalConnected(next);
    }
    onConnectedChange?.(next);
  };

  return (
    <div className={className}>
      <div className="flex size-52 flex-col rounded-3xl border border-sky-900/30 bg-sky-950 p-0.5 shadow-md">
        <div className="flex items-center gap-2 px-3 pb-1.5 pt-3">
          <FlagIcon className="size-5 fill-amber-400 text-amber-400" aria-hidden />
          <p className="truncate text-sm font-semibold tracking-tight text-amber-400">
            {serverName}
          </p>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-[22px] bg-background p-3">
          <div className="inline-flex max-w-fit items-center gap-1.5 rounded-lg bg-emerald-500/15 px-2 py-0.5">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
            <span className="text-xs font-medium tabular-nums text-emerald-700 dark:text-emerald-400">
              {latency}
            </span>
          </div>
          <p className="text-3xl font-semibold tabular-nums tracking-tight text-foreground">
            {downloadMbps}
            <span className="ml-0.5 text-sm font-medium text-muted-foreground">Mbps</span>
          </p>
          <div className="mt-auto">
            <SlidingButton connected={connected} onConnectedChange={setConnected} />
          </div>
        </div>
      </div>
    </div>
  );
}
