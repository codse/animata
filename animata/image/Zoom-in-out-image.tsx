import { cn } from "@/lib/utils";
import { ImgHTMLAttributes } from "react";

interface ZoomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  zoom?: "zoomIn" | "zoomOut";
}

export default function ZoomImage({
  className,
  zoom,
  ...props
}: ZoomImageProps) {
  let zoomClass = "scale-125";
  if (zoom === "zoomIn") {
    zoomClass = "hover:scale-110";
  } else if (zoom === "zoomOut") {
    zoomClass = "hover:scale-90";
  }
  return (
    <div className={`flex h-52 w-52 gap-7`}>
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
