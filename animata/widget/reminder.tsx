import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export default function Reminder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-52 flex-col justify-between rounded-3xl border bg-background p-4 shadow-md dark:border-zinc-700",
        className,
      )}
    >
      <p className="text-center text-lg font-semibold text-foreground">Reminder</p>

      <div className="flex items-center justify-between gap-x-3 p-2">
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-purple-200 p-4 text-3xl font-semibold dark:bg-purple-400">
          2<p className="border-t border-background pt-2 text-center text-base font-normal">Work</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-green-200 p-4 text-3xl font-semibold dark:bg-green-400">
          3<p className="border-t border-background pt-2 text-center text-base font-normal">Home</p>
        </div>
      </div>

      <div className="flex flex-row gap-1 text-muted-foreground">
        <ArrowRight size={18} className="self-center" />
        <p className="text-sm font-semibold">Meeting in 30 mins</p>
      </div>
    </div>
  );
}
