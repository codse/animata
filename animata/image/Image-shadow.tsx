import { cn } from "@/lib/utils";
import { ImgHTMLAttributes } from "react";

interface ZoomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  shadowSize?: string;
  shadowColor?: string;
}

export default function ShadowImage({
  className,
  shadowSize = "",
  shadowColor = "",
  ...props
}: ZoomImageProps) {
  return (
    <div className="flex h-52 w-52 gap-7">
      <img
        alt=""
        {...props}
        className={cn(
          "mx-auto h-auto max-w-sm cursor-pointer rounded-md shadow-none transition-shadow duration-300",
          shadowSize,
          shadowColor,
          className,
        )}
      />
    </div>
  );
}
