import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function Reminder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-60 w-52 flex-col justify-between rounded-3xl border-[1px] bg-white p-3 shadow-md duration-700",
        className,
      )}
    >
      <p className="text-center text-xl font-semibold">Reminder</p>
      <div className="bg-red-7 flex min-h-32 w-full flex-row items-center justify-center gap-x-3">
        <div className="flex min-h-24 w-1/2 flex-col justify-center rounded-lg bg-purple-200 px-2 text-center text-3xl font-semibold">
          2
          <p className="border-t-[1px] border-white pt-2 text-base font-normal">
            Work
          </p>
        </div>
        <div className="flex min-h-24 w-1/2 flex-col justify-center rounded-lg bg-green-200 text-center text-3xl font-semibold">
          3
          <p className="border-t-[1px] border-white pt-2 text-base font-normal">
            Personal
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <ArrowRight size={18} className="self-center" />
        Meeting in 30 mins
      </div>
    </div>
  );
}
