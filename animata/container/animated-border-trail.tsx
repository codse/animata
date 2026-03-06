import { cn } from "@/lib/utils";

interface AnimatedTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The duration of the animation.
   * @default "10s"
   */
  duration?: string;

  contentClassName?: string;

  trailColor?: string;
  trailSize?: "sm" | "md" | "lg";
}

const sizes = {
  sm: 5,
  md: 10,
  lg: 20,
};

export default function AnimatedBorderTrail({
  children,
  className,
  duration = "10s",
  trailColor = "purple",
  trailSize = "md",
  contentClassName,
  ...props
}: AnimatedTrailProps) {
  return (
    <div
      {...props}
      className={cn("relative h-fit w-fit overflow-hidden rounded-2xl bg-gray-200 p-px", className)}
    >
      <style>
        {`
          @property --border-trail-angle {
            syntax: "<angle>";
            initial-value: 0deg;
            inherits: false;
          }
          @keyframes border-trail {
            0% { --border-trail-angle: 0deg; }
            100% { --border-trail-angle: 360deg; }
          }
        `}
      </style>
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          animation: `border-trail ${duration ?? "10s"} linear infinite`,
          background: `conic-gradient(from var(--border-trail-angle) at 50% 50%, transparent ${100 - sizes[trailSize]}%, ${trailColor})`,
        }}
      />
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-[15px] bg-white",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
