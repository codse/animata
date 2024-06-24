import { ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface SkewImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

/**
 * All the props are passed to the img element.
 */
export default function SkewImage({ className, ...props }: SkewImageProps) {
  return (
    <div
      className={
        "h-52 w-40 transition-all duration-300 ease-in-out [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)] hover:scale-95 hover:[clip-path:polygon(0_5%,_100%_0,_100%_95%,_0%_100%)] hover:[&_img]:scale-125"
      }
    >
      {/* Use `next/image` and remove the line below. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        {...props}
        className={cn(
          "transition-delay-150 h-full w-full object-cover transition-all duration-300 ease-in-out",
          className,
        )}
      />
    </div>
  );
}
