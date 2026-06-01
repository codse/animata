import { TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

export type SecurityAlertProps = {
  className?: string;
  title?: string;
  riskValue?: string;
  timeAgo?: string;
  scanLabel?: string;
  issueCount?: number;
};

export default function SecurityAlert({
  className,
  title = "Security at risk",
  riskValue = "139,532",
  timeAgo = "30m",
  scanLabel = "Quick scan",
  issueCount = 2,
}: SecurityAlertProps) {
  return (
    <div
      className={cn(
        "flex size-52 flex-col overflow-hidden rounded-3xl bg-zinc-950 font-sans shadow-md",
        className,
      )}
    >
      <div className="h-1.5 w-full shrink-0 bg-striped" aria-hidden />

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <p className="text-[15px] font-semibold leading-snug text-zinc-300">{title}</p>

        <p className="mt-2 text-[22px] font-normal leading-none tabular-nums tracking-tight text-white">
          {riskValue}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <p className="text-[13px] leading-none text-zinc-500">{timeAgo} ago</p>
          <button
            type="button"
            className="touch-manipulation rounded-lg bg-zinc-800 px-2.5 py-1.5 text-[13px] font-medium leading-none text-zinc-200"
          >
            {scanLabel}
          </button>
        </div>

        <div className="mt-auto flex min-h-11 animate-blink-red items-center justify-center gap-2 rounded-2xl border-2 border-red-500/90 px-4 py-2">
          <TriangleAlert className="size-4 fill-red-500 stroke-red-900" aria-hidden />
          <span className="text-[15px] font-medium leading-none text-red-500">
            {issueCount} {issueCount === 1 ? "item" : "items"}
          </span>
        </div>
      </div>
    </div>
  );
}
