import { cn } from "@/lib/utils";

export default function MirrorText({
  text = "This is a text",
  className,
  direction = "up",
  containerClassName,
}: {
  text: string;
  className?: string;
  /**
   * The direction of the animation
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right";

  containerClassName?: string;
}) {
  const animation = cn("transition-all duration-500 ease-slow", {
    "group-hover:-translate-y-4": direction === "up",
    "group-hover:translate-y-4": direction === "down",
    "group-hover:-translate-x-4": direction === "left",
    "group-hover:translate-x-4": direction === "right",
  });

  const content = (
    <div className={cn("inline-block text-4xl font-light uppercase leading-none", className)}>
      {text}
    </div>
  );

  return (
    <div
      className={cn(
        "group relative w-full justify-end overflow-hidden p-6 text-foreground",
        containerClassName,
      )}
    >
      <div className={cn("h-3 overflow-hidden delay-200", animation)}>{content}</div>
      <div className={cn("h-3 overflow-hidden delay-100", animation)}>{content}</div>
      <div className={cn("h-3 overflow-hidden delay-75", animation)}>{content}</div>
      <div className={animation}>{content}</div>
    </div>
  );
}
