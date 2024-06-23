import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IGetStartedButtonProps {
  text: string;
}

export default function GetStartedButton({ text }: IGetStartedButtonProps) {
  return (
    <div className="min-h-12 w-48">
      <button
        className={cn(
          "group flex h-12 w-40 items-center justify-center gap-3 rounded-lg bg-red-900 p-2 font-bold transition-colors duration-100 hover:bg-green-600",
        )}
      >
        <span className={cn("text-white group-hover:text-black")}>{text}</span>
        <span
          className={cn(
            "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition-transform duration-100",
            "bg-green-600 group-hover:bg-red-900",
          )}
        >
          <div className="absolute left-0 flex h-7 w-14 -translate-x-1/2 items-center justify-center transition-all group-hover:translate-x-0 group-hover:duration-200 group-hover:ease-in">
            <ArrowRight
              size={16}
              className={cn(
                "size-7 transform p-1 text-black opacity-0 group-hover:opacity-100",
              )}
            />
            <ArrowRight
              size={16}
              className={cn(
                "size-7 transform p-1 text-black opacity-100 transition-transform duration-300 ease-in-out group-hover:opacity-0",
              )}
            />
          </div>
        </span>
      </button>
    </div>
  );
}
