import { cn } from "@/lib/utils";

/* eslint-disable @next/next/no-img-element */
interface ImageSource {
  src: string;
  alt: string;
}

interface ShowImageListItemProps {
  text: string;
  images: [ImageSource, ImageSource];
}

export default function RevealImageListItem({
  text,
  images,
}: ShowImageListItemProps) {
  const container = "absolute right-4 top-1/3 z-40 h-20 w-16";
  const effect =
    "relative duration-300 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-16 h-16 overflow-hidden rounded-full transition-all group-hover:rounded-md";

  return (
    <div className="group relative h-fit w-fit overflow-visible py-24">
      <h1 className="text-7xl font-black text-gray-500 transition-all duration-300 group-hover:opacity-40">
        {text}
      </h1>
      <div className={container}>
        <div className={effect}>
          <img
            alt={images[1].alt}
            src={images[1].src}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        className={cn(
          container,
          "translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-300 group-hover:-translate-x-6 group-hover:translate-y-6 group-hover:-rotate-12",
        )}
      >
        <div className={cn(effect, "delay-150")}>
          <img
            alt={images[0].alt}
            src={images[0].src}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
