import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  outerSize?: string;
  childSize?: string;
}
export default function Spinner({
  className,
  outerSize,
  childSize,
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "m-2 h-8 w-8 animate-spin items-center justify-center rounded-full bg-gradient-to-bl from-pink-500 to-blue-600 p-0.5",
        className,
        outerSize,
      )}
    >
      <div className={cn("h-6 w-6 rounded-full bg-white", childSize)} />
    </div>
  );
}
