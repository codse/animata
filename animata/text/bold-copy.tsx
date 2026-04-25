import { Tourney } from "next/font/google";

import { cn } from "@/lib/utils";

const tourney = Tourney({
  subsets: ["latin"],
});

const sizePresets = {
  sm: {
    title: "text-sm group-hover/bold:text-xl md:text-lg group-hover/bold:md:text-2xl",
    background: "text-xl md:text-2xl",
  },
  md: {
    title: "text-base group-hover/bold:text-2xl md:text-xl group-hover/bold:md:text-4xl",
    background: "text-2xl md:text-4xl",
  },
  xl: {
    title: "text-lg group-hover/bold:text-4xl md:text-3xl group-hover/bold:md:text-8xl",
    background: "text-4xl md:text-8xl",
  },
} as const;

export default function BoldCopy({
  text = "animata",
  size = "xl",
  className,
  textClassName,
  backgroundTextClassName,
}: {
  text: string;
  size?: keyof typeof sizePresets;
  className?: string;
  textClassName?: string;
  backgroundTextClassName?: string;
}) {
  if (!text?.length) {
    return null;
  }

  const preset = size && size in sizePresets ? sizePresets[size] : sizePresets.xl;

  return (
    <div
      className={cn(
        "group/bold relative flex items-center justify-center bg-background px-2 py-2 md:px-6 md:py-4",
        tourney.className,
        className,
      )}
    >
      <div
        className={cn(
          "font-bold uppercase text-foreground/15 transition-all group-hover/bold:opacity-50 select-none",
          preset.background,
          backgroundTextClassName,
        )}
      >
        {text}
      </div>
      <div
        className={cn(
          "absolute font-bold uppercase text-foreground transition-all duration-300",
          preset.title,
          textClassName,
        )}
      >
        {text}
      </div>
    </div>
  );
}
