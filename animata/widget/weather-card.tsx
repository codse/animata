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
        "flex size-52 flex-col rounded-3xl border border-border bg-linear-to-br from-muted/80 to-muted p-4 font-sans shadow-md",
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col justify-start gap-2">
        <p className="text-[15px] font-semibold leading-none text-foreground">{city}</p>
        <div className="flex items-start gap-2">
          <CloudSunRain
            className="mt-1 size-8 shrink-0 text-foreground/75"
            strokeWidth={1.75}
            aria-hidden
          />
          <p className="text-[34px] font-normal leading-none tabular-nums tracking-tight text-foreground">
            {temperature}&deg;
          </p>
        </div>
        <p className="text-[13px] leading-none text-muted-foreground">
          Feels like <span className="tabular-nums">{feelsLike}&deg;</span>
        </p>
      </div>
      <div className="flex shrink-0 justify-between rounded-xl border border-border/60 bg-background/50 px-2.5 py-2 text-[13px] font-medium tabular-nums leading-none backdrop-blur-sm">
        <div className="flex items-center gap-1 text-orange-600 dark:text-orange-300">
          <CircleArrowUp className="size-3.5" strokeWidth={2} aria-hidden />
          {high}&deg;
        </div>
        <span className="text-border/80" aria-hidden>
          |
        </span>
        <div className="flex items-center gap-1 text-sky-700 dark:text-sky-300">
          <CircleArrowUp className="size-3.5 rotate-180" strokeWidth={2} aria-hidden />
          {low}&deg;
        </div>
      </div>
    </div>
  );
}
