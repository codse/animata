import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function Reminder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-56 w-full flex-col justify-between rounded-3xl border-[1px] bg-white p-3 shadow-md duration-700",
        className,
      )}
    >
      <p className="text-center text-lg font-semibold">Reminder</p>

      <div className="flex items-center justify-between gap-x-3 p-2">
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-purple-200 p-4 text-3xl font-semibold">
          2
          <p className="border-t-[1px] border-white pt-2 text-center text-base font-normal">
            Work
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-green-200 p-4 text-3xl font-semibold">
          3
          <p className="border-t-[1px] border-white pt-2 text-center text-base font-normal">
            Home
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-1">
        <ArrowRight size={18} className="self-center" />
        <p className="text-md font-semibold">Meeting in 30 mins</p>
      </div>
    </div>
  );
}
