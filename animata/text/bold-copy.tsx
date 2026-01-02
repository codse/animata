// TODO: Re-enable Google Font when network access is available during build
// import { Tourney } from "next/font/google";
// const tourney = Tourney({ subsets: ["latin"] });

import { cn } from "@/lib/utils";

// Temporary fallback font class
const tourney = { className: "font-sans" };

export default function BoldCopy({
  text = "animata",
  className,
  textClassName,
  backgroundTextClassName,
}: {
  text: string;
  className?: string;
  textClassName?: string;
  backgroundTextClassName?: string;
}) {
  if (!text?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-background group relative flex items-center justify-center px-2 py-2 md:px-6 md:py-4",
        tourney.className,
        className,
      )}
    >
      <div
        className={cn(
          "text-foreground/15 text-4xl font-bold uppercase transition-all group-hover:opacity-50 md:text-8xl",
          backgroundTextClassName,
        )}
      >
        {text}
      </div>
      <div
        className={cn(
          "text-md text-foreground absolute font-bold uppercase transition-all group-hover:text-4xl md:text-3xl group-hover:md:text-8xl",
          textClassName,
        )}
      >
        {text}
      </div>
    </div>
  );
}
