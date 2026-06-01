import { cn } from "@/lib/utils";

export type CalendarEventVariant = "violet" | "cyan" | "emerald" | "amber" | "rose";

export type CalendarEventItem = {
  title: string;
  time: string;
  variant?: CalendarEventVariant;
};

export type CalendarEventProps = {
  className?: string;
  /** Defaults to today. */
  date?: Date;
  events: CalendarEventItem[];
  maxVisible?: number;
};

const VARIANT_STYLES: Record<
  CalendarEventVariant,
  { chip: string; bar: string; title: string; time: string }
> = {
  violet: {
    chip: "bg-violet-100 dark:bg-violet-500/20",
    bar: "bg-violet-600",
    title: "text-violet-950 dark:text-violet-100",
    time: "text-violet-700 dark:text-violet-300",
  },
  cyan: {
    chip: "bg-cyan-100 dark:bg-cyan-500/20",
    bar: "bg-cyan-600",
    title: "text-cyan-950 dark:text-cyan-100",
    time: "text-cyan-700 dark:text-cyan-300",
  },
  emerald: {
    chip: "bg-emerald-100 dark:bg-emerald-500/20",
    bar: "bg-emerald-600",
    title: "text-emerald-950 dark:text-emerald-100",
    time: "text-emerald-700 dark:text-emerald-300",
  },
  amber: {
    chip: "bg-amber-100 dark:bg-amber-500/20",
    bar: "bg-amber-600",
    title: "text-amber-950 dark:text-amber-100",
    time: "text-amber-800 dark:text-amber-300",
  },
  rose: {
    chip: "bg-rose-100 dark:bg-rose-500/20",
    bar: "bg-rose-600",
    title: "text-rose-950 dark:text-rose-100",
    time: "text-rose-700 dark:text-rose-300",
  },
};

function EventRow({ event }: { event: CalendarEventItem }) {
  const variant = VARIANT_STYLES[event.variant ?? "violet"];
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center gap-2 overflow-hidden rounded-lg pl-1",
        variant.chip,
      )}
    >
      <span className={cn("h-8 w-1 shrink-0 rounded-sm", variant.bar)} aria-hidden />
      <div className="min-w-0 py-0.5">
        <p className={cn("truncate text-sm font-semibold leading-tight", variant.title)}>
          {event.title}
        </p>
        <p className={cn("truncate text-xs tabular-nums", variant.time)}>{event.time}</p>
      </div>
    </div>
  );
}

export default function CalendarEvent({
  className,
  date = new Date(),
  events,
  maxVisible = 2,
}: CalendarEventProps) {
  const list = events ?? [];
  const visible = list.slice(0, maxVisible);
  const extra = list.length - maxVisible;

  return (
    <div
      className={cn(
        "flex size-52 flex-col overflow-hidden rounded-3xl border border-border bg-background p-4 shadow-md",
        className,
      )}
    >
      <div className="flex items-baseline gap-1.5">
        <p className="text-lg font-bold text-rose-500">
          {date.toLocaleString("default", { weekday: "short" })}
        </p>
        <p className="text-lg font-bold tabular-nums text-foreground">{date.getDate()}</p>
      </div>

      <div className="my-2 flex min-h-0 flex-1 flex-col justify-center gap-2">
        {visible.length > 0 ? (
          visible.map((event, index) => <EventRow key={`${event.title}-${index}`} event={event} />)
        ) : (
          <p className="text-center text-xs text-muted-foreground">No events today</p>
        )}
      </div>

      {extra > 0 ? (
        <div className="flex h-8 items-center justify-between rounded-lg border border-border bg-muted/50 px-2">
          <p className="text-xs font-semibold text-foreground">+{extra} more</p>
          <p className="text-[10px] tabular-nums text-muted-foreground">
            {list[maxVisible]?.time.split(" - ")[0] ?? ""}
          </p>
        </div>
      ) : null}
    </div>
  );
}
