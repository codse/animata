import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function ShiningButton() {
  return (
    <div className="group cursor-pointer rounded-xl border-4 border-violet-800 border-opacity-0 bg-transparent p-1 transition-all duration-500 hover:border-opacity-100">
      <div className="relative flex items-center justify-center gap-4 overflow-hidden rounded-lg bg-violet-800 px-7 py-3 font-mono text-2xl font-bold text-white">
        See Calendar
        <ArrowRight className="transition-all group-hover:translate-x-2 group-hover:scale-125" />
        <div
          className={cn(
            "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 backdrop:blur-3xl group-hover:left-[calc(100%+1rem)]",
          )}
        ></div>
      </div>
    </div>
  );
}
