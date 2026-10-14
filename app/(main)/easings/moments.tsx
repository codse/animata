import { Check, ChevronDown } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type Moment = {
  id: string;
  name: string;
  /** Reads after "Made for": "dialogs", "page transitions". */
  plural: string;
  /** Preset ids that suit this moment, best first. */
  suggest: [string, string, ...string[]];
  /** A sensible starting duration for this moment, in milliseconds. */
  duration: number;
  render: (open: boolean) => ReactNode;
};

/** Every transition in a moment uses the pane's curve and duration. */
const move = "duration-(--ez-dur) ease-(--ez-ease)";

/**
 * Two surfaces. The page behind a transition is a window edged by a hairline; whatever
 * moves floats above it on a deeper, layered shadow. The moving element keeps real text,
 * and the context around it stays quiet.
 */
const win =
  "bg-background shadow-[0_0_0_1px_var(--color-border),0_1px_2px_rgb(0_0_0/0.05),0_12px_32px_-14px_rgb(0_0_0/0.18)]";
const pop =
  "bg-background shadow-[0_0_0_1px_var(--color-border),0_2px_6px_rgb(0_0_0/0.06),0_24px_48px_-16px_rgb(0_0_0/0.3)]";

/** Fills the stage above its timeline. `data-open` drives every transition inside. */
function Scene({
  open,
  className,
  children,
}: {
  open: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("group/s absolute inset-x-0 top-0 bottom-9 text-[13px]/[1.45]", className)}
      data-open={open || undefined}
    >
      {children}
    </div>
  );
}

/** The page a transition happens on. */
function Window({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "absolute inset-x-[max(18px,16%)] inset-y-5 flex flex-col gap-4 overflow-hidden rounded-[14px] px-5 py-5 sm:px-6",
        win,
        className,
      )}
    >
      {children}
    </div>
  );
}

function Line({ w, strong }: { w: string; strong?: boolean }) {
  return (
    <span
      className={cn(
        "block h-[7px] shrink-0 rounded-full bg-foreground/[0.07]",
        strong && "h-[9px] bg-foreground/[0.13]",
      )}
      style={{ width: w }}
    />
  );
}

function Rows({ widths }: { widths: string[] }) {
  return widths.map((w) => (
    <span key={w} className="flex items-center gap-3">
      <span className="size-6 shrink-0 rounded-full bg-foreground/[0.07]" />
      <span className="grid flex-1 gap-[7px]">
        <Line w={w} strong />
        <Line w="84%" />
      </span>
    </span>
  ));
}

function Fake({ solid, children }: { solid?: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-[30px] items-center gap-1.5 rounded-[9px] px-3 font-medium whitespace-nowrap",
        solid
          ? "bg-foreground text-background"
          : "bg-background shadow-[0_0_0_1px_var(--color-border)]",
      )}
    >
      {children}
    </span>
  );
}

function Scrim() {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 -bottom-9 bg-black/[0.16] opacity-0 transition-opacity group-data-open/s:opacity-100 dark:bg-black/50",
        move,
      )}
    />
  );
}

export const MOMENTS: Moment[] = [
  {
    id: "dropdown",
    name: "Dropdown",
    plural: "dropdowns",
    suggest: ["snap", "out", "emphasized"],
    duration: 180,
    render: (open) => (
      <Scene open={open}>
        <Window>
          <span className="flex items-center justify-between">
            <Line w="28%" strong />
            <Fake>
              Sort by
              <ChevronDown aria-hidden="true" className="size-3.5 text-muted-foreground" />
            </Fake>
          </span>
          <Rows widths={["46%", "62%", "38%"]} />
        </Window>
        {/* Hangs from the trigger's right edge and grows from there. */}
        <div
          className={cn(
            "absolute top-[72px] right-[calc(max(18px,16%)+16px)] grid w-[196px] origin-top-right rounded-[14px] p-1.5",
            pop,
            "-translate-y-1.5 scale-96 opacity-0 transition-[opacity,translate,scale] will-change-[translate,scale,opacity] backface-hidden",
            "group-data-open/s:translate-y-0 group-data-open/s:scale-100 group-data-open/s:opacity-100",
            move,
          )}
        >
          {["Newest", "Most popular", "Price, low to high", "Price, high to low"].map(
            (item, index) => (
              <span
                key={item}
                className={cn(
                  "flex h-8 items-center justify-between rounded-[8px] px-2.5 text-muted-foreground",
                  index === 1 && "bg-muted font-medium text-foreground",
                )}
              >
                {item}
                {index === 1 ? <Check aria-hidden="true" className="size-3.5" /> : null}
              </span>
            ),
          )}
        </div>
      </Scene>
    ),
  },
  {
    id: "dialog",
    name: "Dialog",
    plural: "dialogs",
    suggest: ["out", "emphasized", "quart-out"],
    duration: 240,
    render: (open) => (
      <Scene open={open}>
        <Window>
          <Line w="30%" strong />
          <Rows widths={["46%", "62%", "38%"]} />
        </Window>
        <Scrim />
        <div
          className={cn(
            "absolute top-1/2 left-1/2 grid w-[min(272px,calc(100%-32px))] -translate-x-1/2 gap-1.5 rounded-[14px] p-5",
            pop,
            "-translate-y-[calc(50%-14px)] scale-97 opacity-0 transition-[opacity,translate,scale] will-change-[translate,scale,opacity] backface-hidden",
            "group-data-open/s:-translate-y-1/2 group-data-open/s:scale-100 group-data-open/s:opacity-100",
            move,
          )}
        >
          <strong className="text-sm font-semibold">Delete project?</strong>
          <span className="text-muted-foreground">
            This removes 24 files for everyone on the team.
          </span>
          <span className="mt-2.5 flex justify-end gap-1.5">
            <Fake>Cancel</Fake>
            <Fake solid>Delete</Fake>
          </span>
        </div>
      </Scene>
    ),
  },
  {
    id: "toast",
    name: "Toast",
    plural: "toasts",
    suggest: ["out", "overshoot", "snap"],
    duration: 320,
    render: (open) => (
      <Scene open={open}>
        <Window>
          <Line w="26%" strong />
          <Rows widths={["46%", "62%", "38%"]} />
        </Window>
        <div
          className={cn(
            "absolute right-[max(10px,calc(16%-18px))] bottom-4 flex max-w-[calc(100%-20px)] items-center gap-3 rounded-[14px] py-3 pr-4 pl-3",
            pop,
            "translate-y-[calc(100%+52px)] opacity-0 transition-[opacity,translate]",
            "group-data-open/s:translate-y-0 group-data-open/s:opacity-100",
            move,
          )}
        >
          <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-foreground text-background">
            <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
          </span>
          <span className="grid min-w-0">
            <strong className="font-semibold">Invoice sent</strong>
            <span className="truncate text-muted-foreground">Mara will get it in a minute.</span>
          </span>
        </div>
      </Scene>
    ),
  },
  {
    id: "drawer",
    name: "Drawer",
    plural: "drawers",
    suggest: ["sheet", "emphasized", "in-out"],
    duration: 500,
    render: (open) => (
      <Scene open={open}>
        <Window className="inset-x-[max(18px,8%)]">
          <span className="flex items-center justify-between">
            <Line w="20%" strong />
            <Fake>Filters</Fake>
          </span>
          <span className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
            {["64%", "48%", "58%"].map((w, index) => (
              <span key={w} className={cn("grid gap-2", index === 2 && "max-sm:hidden")}>
                <span className="aspect-4/3 rounded-[10px] bg-foreground/[0.07]" />
                <Line w={w} strong />
                <Line w="30%" />
              </span>
            ))}
          </span>
        </Window>
        <Scrim />
        <div
          className={cn(
            "absolute top-0 right-0 -bottom-9 z-[1] flex w-[clamp(176px,40%,280px)] flex-col gap-3.5 bg-background p-6 shadow-[-1px_0_0_var(--color-border),-24px_0_48px_-24px_rgb(0_0_0/0.35)]",
            "translate-x-[105%] transition-[translate] group-data-open/s:translate-x-0",
            move,
          )}
        >
          <strong className="text-sm font-semibold">Filters</strong>
          {["In stock", "Free delivery", "On sale"].map((item, index) => (
            <span key={item} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid size-4 place-items-center rounded-[5px] shadow-[inset_0_0_0_1px_var(--color-border)]",
                  index !== 1 && "bg-foreground text-background shadow-none",
                )}
              >
                {index !== 1 ? (
                  <Check aria-hidden="true" className="size-2.5" strokeWidth={3} />
                ) : null}
              </span>
              {item}
            </span>
          ))}
          <span className="mt-auto mb-9 grid">
            <Fake solid>
              <span className="mx-auto">Show 12 results</span>
            </Fake>
          </span>
        </div>
      </Scene>
    ),
  },
  {
    id: "tabs",
    name: "Tabs",
    plural: "tabs",
    suggest: ["in-out", "snap", "out"],
    duration: 300,
    render: (open) => (
      <Scene open={open}>
        <div className="absolute inset-x-[max(18px,16%)] inset-y-5 grid content-start gap-3.5">
          <div className="relative grid grid-cols-3 rounded-[12px] bg-foreground/[0.06] p-1">
            <span
              className={cn(
                "absolute inset-y-1 left-1 w-[calc((100%-8px)/3)] rounded-[9px]",
                pop,
                "transition-[translate] group-data-open/s:translate-x-[200%]",
                move,
              )}
            />
            {["Overview", "Activity", "Settings"].map((tab, index) => (
              <span
                key={tab}
                className={cn(
                  "relative py-2 text-center font-medium text-muted-foreground transition-colors",
                  (open ? index === 2 : index === 0) && "text-foreground",
                  move,
                )}
              >
                {tab}
              </span>
            ))}
          </div>
          {/* Both panels share one cell and cross over in the direction of travel. */}
          <div className={cn("grid overflow-hidden rounded-[14px] p-5", win)}>
            <span
              className={cn(
                "col-start-1 row-start-1 grid gap-4 transition-[opacity,translate]",
                "group-data-open/s:-translate-x-6 group-data-open/s:opacity-0",
                move,
              )}
            >
              <Rows widths={["46%", "62%"]} />
            </span>
            <span
              className={cn(
                "col-start-1 row-start-1 grid translate-x-6 gap-4 opacity-0 transition-[opacity,translate]",
                "group-data-open/s:translate-x-0 group-data-open/s:opacity-100",
                move,
              )}
            >
              {["40%", "56%"].map((w) => (
                <span key={w} className="flex items-center justify-between gap-3">
                  <span className="grid flex-1 gap-[7px]">
                    <Line w={w} strong />
                    <Line w="70%" />
                  </span>
                  <span className="h-[18px] w-8 shrink-0 rounded-full bg-foreground/[0.12]" />
                </span>
              ))}
            </span>
          </div>
        </div>
      </Scene>
    ),
  },
  {
    id: "page",
    name: "Page transition",
    plural: "page transitions",
    suggest: ["glide", "in-out", "sheet"],
    duration: 600,
    render: (open) => (
      <Scene open={open}>
        <Window
          className={cn(
            // Own layer: rasterized once and moved as a bitmap, so text doesn't shimmer
            // while the page scales by sub-pixel amounts.
            "transition-[opacity,translate,scale] will-change-[translate,scale,opacity] backface-hidden",
            "group-data-open/s:-translate-x-[24%] group-data-open/s:scale-95 group-data-open/s:opacity-35",
            move,
          )}
        >
          <strong className="font-semibold">Inbox</strong>
          <Rows widths={["46%", "62%", "38%"]} />
        </Window>
        <Window
          className={cn(
            "translate-x-[135%] transition-[translate] will-change-[translate] backface-hidden group-data-open/s:translate-x-0",
            move,
          )}
        >
          <strong className="font-semibold">Re: Launch plan</strong>
          <Rows widths={["30%"]} />
          <span className="block h-16 shrink-0 rounded-[12px] bg-foreground/[0.07]" />
          <Line w="92%" />
          <Line w="70%" />
        </Window>
      </Scene>
    ),
  },
  {
    id: "accordion",
    name: "Accordion",
    plural: "accordions",
    suggest: ["out", "in-out", "quart-out"],
    duration: 280,
    render: (open) => (
      <Scene open={open}>
        <div className="absolute inset-x-[max(18px,16%)] inset-y-5 grid content-start gap-2">
          {["Can I change plans later?", "Do you offer refunds?", "Is there a team plan?"].map(
            (question, index) => (
              <div key={question} className={cn("rounded-[12px]", win)}>
                <span className="flex items-center justify-between px-4 py-3 font-medium">
                  {question}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-4 text-muted-foreground",
                      index === 0 && "transition-[rotate] group-data-open/s:rotate-180",
                      index === 0 && move,
                    )}
                  />
                </span>
                {index === 0 ? (
                  <div
                    className={cn(
                      "grid grid-rows-[0fr] transition-[grid-template-rows] group-data-open/s:grid-rows-[1fr]",
                      move,
                    )}
                  >
                    <div className="overflow-hidden">
                      <span className="block px-4 pb-3.5 text-muted-foreground">
                        Yes. Switch any time from Billing, and the difference is prorated on your
                        next invoice.
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            ),
          )}
        </div>
      </Scene>
    ),
  },
  {
    id: "list",
    name: "List",
    plural: "lists",
    suggest: ["out", "emphasized", "snap"],
    duration: 360,
    render: (open) => (
      <Scene open={open}>
        <div className="absolute inset-x-[max(18px,16%)] inset-y-5 grid content-center gap-2">
          {["Design review", "Ship billing fixes", "Interview: Platform", "Quarterly planning"].map(
            (item, index) => (
              <span
                key={item}
                className={cn(
                  "flex items-center gap-3 rounded-[12px] px-4 py-2.5",
                  win,
                  "translate-y-3 opacity-0 transition-[opacity,translate] group-data-open/s:translate-y-0 group-data-open/s:opacity-100",
                  // Rows arrive one after another and leave together.
                  "group-data-open/s:delay-[calc(var(--i)*var(--ez-stagger))]",
                  move,
                )}
                style={{ "--i": index } as CSSProperties}
              >
                <span className="h-[15px] w-[3px] rounded-full bg-foreground/20" />
                <span className="font-medium">{item}</span>
                <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">
                  {["09:30", "11:00", "14:00", "16:30"][index]}
                </span>
              </span>
            ),
          )}
        </div>
      </Scene>
    ),
  },
];

export function findMoment(id: string | null | undefined) {
  return MOMENTS.find((moment) => moment.id === id) ?? null;
}
