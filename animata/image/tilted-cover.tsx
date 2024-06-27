import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TiltedCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "left" | "right";

  /**
   * The content to be displayed on the cover
   */
  cover?: ReactNode;

  /**
   * Determines if the cover should tilt with the background
   */
  tiltCover?: boolean;

  /**
   * The content to be displayed on the background
   */
  children?: ReactNode;

  /**
   * The image to be displayed on the cover. Takes precedence over `children`.
   */
  image?: React.ComponentPropsWithoutRef<"img">;
}

export default function TiltedCover({
  children,
  direction = "left",
  tiltCover = true,
  cover,
  image,
}: TiltedCoverProps) {
  const tiltLeft = direction === "left";
  const factor = tiltLeft ? 1 : -1;

  return (
    // The container has height and width set to the size of the content + padding.
    <div className="flex h-64 w-52 items-center justify-center overflow-hidden">
      <div className="group relative h-52 w-40">
        {/* Background content */}
        <div
          className="border-box border-1 pointer-events-none relative h-full w-full overflow-hidden rounded-xl border bg-background transition-all duration-500 ease-slow group-hover:!transform-none dark:border-zinc-700"
          style={{
            transform: `perspective(400px) rotateY(${factor * 20}deg) scale(0.85) translateX(${-factor * 20}%)`,
          }}
        >
          {children}
          <div className="absolute inset-0 h-full w-full bg-gray-400/10 transition-all group-hover:bg-transparent" />
        </div>

        {/* Cover Content */}
        <div
          className={cn(
            "border-box pointer-events-none absolute inset-0 h-full w-full rounded-xl border-[6px] bg-white transition-all delay-75 duration-500 ease-slow group-hover:!transform-none group-hover:opacity-0 dark:bg-gray-800",
            {
              "group-hover:left-[200%]": tiltLeft,
              "group-hover:-left-[200%]": !tiltLeft,
            },
          )}
          style={{
            transform: tiltCover ? `perspective(400px) rotateY(${factor * 20}deg)` : undefined,
          }}
        >
          <div className="h-full w-full rounded-md object-cover">
            {image ? (
              /* Use `next/image` and remove the line below. */
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src=""
                alt=""
                {...image}
                className={cn("h-full w-full rounded-md object-cover", image?.className)}
              />
            ) : (
              cover
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
