import { HtmlHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface PhotoBoothProps extends HtmlHTMLAttributes<HTMLDivElement> {
  collections: string[];
}
const PhotoBooth = ({ collections, className, ...props }: PhotoBoothProps) => {
  return (
    <div
      className="group flex w-full max-w-3xl justify-center rounded-lg bg-gray-100 p-3"
      {...props}
    >
      <div className="grid min-w-full grid-cols-2 place-content-center place-items-center gap-5 p-3 sm:grid-cols-4">
        {collections.map((image, index) => (
          <div
            key={`alt_${index}`}
            className="relative h-[110px] w-[110px] transition-transform duration-700"
          >
            <img
              src={image}
              alt="photo_booth"
              className={cn(
                "absolute inset-0 h-full w-full max-w-full rounded-lg object-cover transition-transform duration-500 hover:scale-125",
                className,
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoBooth;
