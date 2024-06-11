import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export default function MovingGradient({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const backgroundClassName =
    "pointer-events-none absolute -z-10 h-full w-full";
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "animate-bg-position bg-size bg-gradient-to-r from-yellow-500 from-30% via-yellow-700 via-50% to-pink-500 to-80% bg-[length:300%_auto] opacity-15",
          {
            [backgroundClassName]: true,
          },
        )}
      />
      <div className={cn(backgroundClassName, "z-1 blur-lg")} />
      {children}
    </div>
  );
}
