import { cn } from "@/lib/utils";

export function GridBackdrop({
  className,
  fade = "bottom",
}: {
  className?: string;
  fade?: "bottom" | "none" | "both";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.04)_1px,transparent_1px)] bg-size-[72px_72px]",
        fade === "bottom" &&
          "mask-[linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]",
        fade === "both" &&
          "mask-[linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]",
        className,
      )}
    />
  );
}
