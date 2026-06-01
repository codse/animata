import { CircleArrowUp, CloudSunRain } from "lucide-react";

import { cn } from "@/lib/utils";

export type WeatherCardProps = {
  className?: string;
  city?: string;
  temperature?: number;
  feelsLike?: number;
  high?: number;
  low?: number;
};

export default function WeatherCard({
  className,
  city = "Tokyo",
  temperature = 19,
  feelsLike = 21,
  high = 24,
  low = 9,
}: WeatherCardProps) {
  return (
    <div
      className={cn(
        "flex size-52 flex-col rounded-3xl border border-border bg-linear-to-br from-muted/80 to-muted p-4 shadow-md",
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{city}</p>
        <div className="flex items-center gap-2">
          <CloudSunRain className="size-9 shrink-0 text-foreground/80" aria-hidden />
          <p className="text-4xl font-semibold tabular-nums tracking-tight text-foreground">
            {temperature}&deg;
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Feels like <span className="tabular-nums">{feelsLike}&deg;</span>
        </p>
      </div>
      <div className="flex justify-between rounded-xl border border-border/60 bg-background/50 px-2 py-1.5 text-sm font-medium tabular-nums backdrop-blur-sm">
        <div className="flex items-center gap-1 text-orange-600 dark:text-orange-300">
          <CircleArrowUp className="size-4" aria-hidden />
          {high}&deg;
        </div>
        <span className="text-border" aria-hidden>
          |
        </span>
        <div className="flex items-center gap-1 text-sky-700 dark:text-sky-300">
          <CircleArrowUp className="size-4 rotate-180" aria-hidden />
          {low}&deg;
        </div>
      </div>
    </div>
  );
}
