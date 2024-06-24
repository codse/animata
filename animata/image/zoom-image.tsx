import { ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ZoomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  zoom: "zoomIn" | "zoomOut";
}

export default function ZoomImage({ className, zoom, ...props }: ZoomImageProps) {
  const zoomClass = cn({
    "scale-125": !zoom,
    "hover:scale-110": zoom === "zoomIn",
    "hover:scale-90": zoom === "zoomOut",
  });

  return (
    <div className="flex h-52 w-52 gap-7">
      <img
        alt=""
        {...props}
        className={cn(
          "transition-delay-150 h-full w-full object-contain transition-all duration-300",
          zoomClass,
          className,
        )}
      />
    </div>
  );
}
