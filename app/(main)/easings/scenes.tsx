import {
  ArrowUpDown,
  Bell,
  Check,
  ChevronDown,
  Heart,
  Inbox,
  type LucideIcon,
  Search,
  Settings,
  X,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SceneCategory = "overlays" | "navigation" | "controls" | "content";

export const CATEGORY_LABELS: Record<SceneCategory, string> = {
  overlays: "Overlays",
  navigation: "Navigation",
  controls: "Controls",
  content: "Content",
};

export type Scene = {
  id: string;
  title: string;
  /** What this transition is, in a few words. */
  hint: string;
  category: SceneCategory;
  /** Gets a wide card in the full gallery: the motion travels across the frame. */
  wide?: boolean;
  render: (open: boolean) => ReactNode;
};

/** Every scene transition uses the playground's current curve and duration. */
const move = "duration-(--ez-dur) ease-(--ez-ease)";
/** Staggered children wait --i steps. */
const staggered = "delay-[calc(var(--i)*var(--ez-stagger))]";

function Stage({
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
      className={cn("group/s absolute inset-0 overflow-hidden text-xs/[1.4]", className)}
      data-open={open || undefined}
    >
      {children}
    </div>
  );
}

/** Decorative stand-ins for real controls. The scene card itself is the button. */
function Fake({ icon: Icon, children }: { icon?: LucideIcon; children?: ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 font-medium">
      {Icon ? <Icon aria-hidden="true" className="size-3.5" /> : null}
      {children}
    </span>
  );
}

function Line({ w, strong }: { w: string; strong?: boolean }) {
  return (
    <span
      className={cn(
        "block h-[7px] rounded bg-border",
        strong && "mb-1 h-2.5 bg-muted-foreground/35",
      )}
      style={{ width: w }}
    />
  );
}

function Page({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "absolute inset-[18px] flex flex-col gap-[9px] rounded-[10px] border border-border bg-background p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Scrim() {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-black/30 opacity-0 transition-opacity group-data-open/s:opacity-100",
        move,
      )}
    />
  );
}

export const SCENES: Scene[] = [
  {
    id: "dropdown",
    title: "Dropdown",
    hint: "Opens from its trigger",
    category: "overlays",
    render: (open) => (
      <Stage open={open} className="p-[22px]">
        <Fake icon={ArrowUpDown}>Sort by</Fake>
        <div
          className={cn(
            "absolute top-[58px] left-[22px] grid w-[min(200px,calc(100%-44px))] origin-top-left rounded-[10px] border border-border bg-background p-[5px] shadow-[0_12px_32px_-12px_rgb(0_0_0/0.25)]",
            "-translate-y-1.5 scale-96 opacity-0 transition-[opacity,translate,scale]",
            "group-data-open/s:translate-y-0 group-data-open/s:scale-100 group-data-open/s:opacity-100",
            move,
          )}
        >
          {["Newest", "Most popular", "Price, low to high", "Price, high to low"].map(
            (item, index) => (
              <span
                key={item}
                className={cn(
                  "flex h-7 items-center justify-between rounded-md px-2",
                  index === 1 && "bg-muted font-medium",
                )}
              >
                {item}
                {index === 1 ? <Check aria-hidden="true" className="size-3.5" /> : null}
              </span>
            ),
          )}
        </div>
      </Stage>
    ),
  },
  {
    id: "dialog",
    title: "Dialog",
    hint: "Rises over a dimmed page",
    category: "overlays",
    render: (open) => (
      <Stage open={open}>
        <Page>
          <Line w="40%" strong />
          <Line w="85%" />
          <Line w="70%" />
          <Line w="78%" />
        </Page>
        <Scrim />
        <div
          className={cn(
            "absolute top-1/2 left-1/2 grid w-[min(230px,calc(100%-32px))] -translate-x-1/2 gap-1.5 rounded-xl bg-background p-4 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.35)]",
            "-translate-y-[calc(50%-16px)] scale-97 opacity-0 transition-[opacity,translate,scale]",
            "group-data-open/s:-translate-y-1/2 group-data-open/s:scale-100 group-data-open/s:opacity-100",
            move,
          )}
        >
          <strong>Delete project?</strong>
          <span className="text-muted-foreground">
            This removes 24 files for everyone on the team.
          </span>
          <div className="mt-1.5 flex justify-end gap-1.5">
            <Fake>Cancel</Fake>
            <span className="inline-flex h-7 items-center rounded-lg bg-destructive px-2.5 font-medium text-white">
              Delete
            </span>
          </div>
        </div>
      </Stage>
    ),
  },
  {
    id: "toast",
    title: "Toast",
    hint: "Slides up from the edge",
    category: "overlays",
    render: (open) => (
      <Stage open={open}>
        <Page>
          <Line w="55%" strong />
          <Line w="90%" />
          <Line w="65%" />
        </Page>
        <div
          className={cn(
            "absolute right-3.5 bottom-3.5 flex max-w-[calc(100%-28px)] items-center gap-2.5 rounded-xl border border-border bg-background py-2.5 pr-3.5 pl-2.5 shadow-[0_16px_32px_-16px_rgb(0_0_0/0.3)]",
            "translate-y-[calc(100%+18px)] opacity-0 transition-[opacity,translate]",
            "group-data-open/s:translate-y-0 group-data-open/s:opacity-100",
            move,
          )}
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-green-600 text-white">
            <Check aria-hidden="true" className="size-3.5" />
          </span>
          <span className="grid min-w-0">
            <strong>Invoice sent</strong>
            <span className="truncate text-muted-foreground">Mara will get it in a minute.</span>
          </span>
        </div>
      </Stage>
    ),
  },
  {
    id: "drawer",
    title: "Drawer",
    hint: "Travels in from the side",
    category: "navigation",
    wide: true,
    render: (open) => (
      <Stage open={open}>
        <Page>
          <Line w="35%" strong />
          <Line w="80%" />
          <Line w="72%" />
          <Line w="60%" />
        </Page>
        <Scrim />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(58%,260px)] flex-col gap-3 bg-background p-4 shadow-[-16px_0_40px_-20px_rgb(0_0_0/0.35)]",
            "translate-x-[105%] transition-[translate] group-data-open/s:translate-x-0",
            move,
          )}
        >
          <div className="mb-1 flex items-center justify-between">
            <strong>Filters</strong>
            <X aria-hidden="true" className="size-3.5" />
          </div>
          {["In stock", "Free delivery", "On sale"].map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              <span
                className={cn(
                  "size-3.5 rounded border border-border",
                  index !== 1 && "border-foreground bg-foreground",
                )}
              />
              {item}
            </span>
          ))}
        </div>
      </Stage>
    ),
  },
  {
    id: "tabs",
    title: "Tabs",
    hint: "Indicator moves between tabs",
    category: "navigation",
    render: (open) => (
      <Stage open={open} className="pt-[22px]">
        <div className="relative mx-[18px] grid grid-cols-3 rounded-[10px] bg-border/70 p-1">
          <span
            className={cn(
              "absolute inset-y-1 left-1 w-[calc((100%-8px)/3)] rounded-[7px] bg-background shadow-sm",
              "transition-[translate] group-data-open/s:translate-x-[200%]",
              move,
            )}
          />
          {["Overview", "Activity", "Settings"].map((tab, index) => (
            <span
              key={tab}
              className={cn(
                "relative py-[7px] text-center font-medium text-muted-foreground transition-colors",
                (open ? index === 2 : index === 0) && "text-foreground",
                move,
              )}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="mx-[18px] mt-3 flex flex-col gap-[9px] rounded-[10px] border border-border bg-background p-4">
          <Line w="60%" strong />
          <Line w="88%" />
        </div>
      </Stage>
    ),
  },
  {
    id: "page",
    title: "Page transition",
    hint: "One view hands off to the next",
    category: "navigation",
    wide: true,
    render: (open) => (
      <Stage open={open}>
        <Page
          className={cn(
            "transition-[opacity,translate,scale]",
            "group-data-open/s:-translate-x-[24%] group-data-open/s:scale-96 group-data-open/s:opacity-40",
            move,
          )}
        >
          <span className="mb-1 flex items-center gap-1.5 font-semibold">
            <Inbox aria-hidden="true" className="size-3.5" /> Inbox
          </span>
          <Line w="80%" />
          <Line w="64%" />
          <Line w="72%" />
        </Page>
        <Page
          className={cn(
            "translate-x-[calc(100%+28px)] transition-[translate] group-data-open/s:translate-x-0",
            move,
          )}
        >
          <span className="mb-1 font-semibold">Re: Launch plan</span>
          <span className="block h-[46px] rounded-lg bg-linear-to-br from-orange-500 to-pink-600" />
          <Line w="86%" />
          <Line w="58%" />
        </Page>
      </Stage>
    ),
  },
  {
    id: "toggle",
    title: "Switch",
    hint: "Thumb and track change together",
    category: "controls",
    render: (open) => (
      <Stage open={open} className="grid content-center gap-2.5 px-[22px]">
        {[
          { icon: Bell, label: "Notifications", live: true },
          { icon: Settings, label: "Weekly digest", live: false },
        ].map(({ icon: Icon, label, live }) => (
          <span
            key={label}
            className={cn(
              "flex items-center gap-2.5 rounded-[10px] border border-border bg-background px-3.5 py-3 font-medium",
              !live && "opacity-55",
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
            <span
              className={cn(
                "relative ml-auto h-5 w-[34px] rounded-full bg-border transition-colors",
                live && "group-data-open/s:bg-accent",
                move,
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.25)] transition-[translate]",
                  live && "group-data-open/s:translate-x-3.5",
                  move,
                )}
              />
            </span>
          </span>
        ))}
      </Stage>
    ),
  },
  {
    id: "accordion",
    title: "Accordion",
    hint: "Opens to its content height",
    category: "controls",
    render: (open) => (
      <Stage open={open} className="grid content-start gap-2 p-[22px]">
        <div className="rounded-[10px] border border-border bg-background">
          <span className="flex items-center justify-between px-3 py-[11px] font-medium">
            Can I change plans later?
            <ChevronDown
              aria-hidden="true"
              className={cn("size-3.5 transition-[rotate] group-data-open/s:rotate-180", move)}
            />
          </span>
          <div
            className={cn(
              "grid grid-rows-[0fr] transition-[grid-template-rows] group-data-open/s:grid-rows-[1fr]",
              move,
            )}
          >
            <div className="overflow-hidden">
              <span className="block px-3 pb-3 text-muted-foreground">
                Yes. Switch at any time from Billing, and we prorate the difference on your next
                invoice.
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-[10px] border border-border bg-background">
          <span className="flex items-center justify-between px-3 py-[11px] font-medium">
            Do you offer refunds?
            <ChevronDown aria-hidden="true" className="size-3.5" />
          </span>
        </div>
      </Stage>
    ),
  },
  {
    id: "search",
    title: "Search field",
    hint: "Expands from its icon",
    category: "controls",
    render: (open) => (
      <Stage open={open} className="grid place-items-center px-[22px]">
        <div
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-full border border-border bg-background px-[13px]",
            "[clip-path:inset(0_calc(100%-40px)_0_0_round_999px)] transition-[clip-path] group-data-open/s:[clip-path:inset(0_0_0_0_round_999px)]",
            move,
          )}
        >
          <Search aria-hidden="true" className="size-3.5 shrink-0" />
          <span
            className={cn(
              "text-muted-foreground opacity-0 transition-opacity group-data-open/s:opacity-100",
              move,
            )}
          >
            Search projects
          </span>
          <span
            className={cn(
              "ml-auto rounded-[5px] border border-border px-1.5 py-px text-[11px] text-muted-foreground opacity-0 transition-opacity group-data-open/s:opacity-100",
              move,
            )}
          >
            ⌘K
          </span>
        </div>
      </Stage>
    ),
  },
  {
    id: "list",
    title: "List reveal",
    hint: "Rows arrive one after another",
    category: "content",
    render: (open) => (
      <Stage open={open} className="grid content-center gap-1.5 px-[22px]">
        {["Design review", "Ship billing fixes", "Interview: Platform", "Quarterly planning"].map(
          (item, index) => (
            <span
              key={item}
              className={cn(
                "flex h-[34px] items-center gap-2.5 rounded-[9px] border border-border bg-background px-3 font-medium",
                "translate-y-2.5 opacity-0 transition-[opacity,translate] group-data-open/s:translate-y-0 group-data-open/s:opacity-100",
                move,
                staggered,
              )}
              style={{ "--i": index } as CSSProperties}
            >
              <span className="size-[7px] rounded-full bg-accent" />
              {item}
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                {["9:30", "11:00", "14:00", "16:30"][index]}
              </span>
            </span>
          ),
        )}
      </Stage>
    ),
  },
  {
    id: "card",
    title: "Card hover",
    hint: "Lifts, zooms, reveals an action",
    category: "content",
    render: (open) => (
      <Stage open={open} className="grid place-items-center">
        <div
          className={cn(
            "relative w-[58%] max-w-[220px] overflow-hidden rounded-xl border border-border bg-background",
            "transition-[translate] group-data-open/s:-translate-y-1.5",
            "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:shadow-[0_22px_40px_-18px_rgb(0_0_0/0.4)] after:transition-opacity after:duration-(--ez-dur) after:ease-(--ez-ease) group-data-open/s:after:opacity-100",
            move,
          )}
        >
          <div
            className={cn(
              "aspect-4/3 bg-[radial-gradient(circle_at_60%_35%,#fde68a_0_14%,transparent_15%),linear-gradient(160deg,#a5b4fc,#6366f1_60%,#312e81)]",
              "transition-[scale] group-data-open/s:scale-107",
              move,
            )}
          />
          <div className="relative flex justify-between bg-background px-3 py-2.5">
            <strong>Studio lamp</strong>
            <span>$148</span>
          </div>
          <span
            className={cn(
              "absolute top-2 right-2 grid size-[26px] place-items-center rounded-full bg-white text-neutral-900",
              "scale-60 opacity-0 transition-[opacity,scale] group-data-open/s:scale-100 group-data-open/s:opacity-100",
              move,
            )}
          >
            <Heart aria-hidden="true" className="size-3.5" />
          </span>
        </div>
      </Stage>
    ),
  },
  {
    id: "counter",
    title: "Number change",
    hint: "Digits roll to a new value",
    category: "content",
    render: (open) => (
      <Stage open={open} className="grid content-center gap-1 px-[26px]">
        <span className="text-muted-foreground">Revenue this month</span>
        <span
          className="flex text-[40px] leading-[1.1] font-semibold tracking-[-0.03em] tabular-nums"
          aria-hidden="true"
        >
          $
          {["1", "2", "4", "8"].map((from, index) => {
            const to = ["1", "9", "6", "2"][index];
            return (
              <span key={`${from}${to}${index}`} className="inline-block h-[1.1em] overflow-hidden">
                <span
                  className={cn(
                    "flex flex-col transition-[translate] group-data-open/s:-translate-y-1/2",
                    move,
                    staggered,
                  )}
                  style={{ "--i": index } as CSSProperties}
                >
                  <span>{from}</span>
                  <span>{to}</span>
                </span>
              </span>
            );
          })}
        </span>
        <span
          className={cn(
            "text-green-600 opacity-0 transition-opacity group-data-open/s:opacity-100",
            move,
          )}
        >
          +52% from last month
        </span>
      </Stage>
    ),
  },
];
