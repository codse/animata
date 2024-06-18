import { cn } from "@/lib/utils";
import { Tourney } from "next/font/google";

const tourney = Tourney({
  subsets: ["latin"],
});

export default function BoldCopy({
  text = "animata",
  className,
}: {
  text: string;
  className?: string;
}) {
  if (!text?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center bg-background px-2 py-2 md:px-6 md:py-4",
        className,
      )}
    >
      <div
        className={cn(
          "text-4xl font-bold uppercase text-foreground/15 transition-all group-hover:opacity-50 md:text-8xl",
          tourney.className,
        )}
      >
        {text}
      </div>
      <div
        className={cn(
          "text-md absolute font-bold uppercase text-foreground md:text-3xl",
          tourney.className,
        )}
      >
        {text}
      </div>
    </div>
  );
}