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

/**
 * Two surfaces. The page behind a transition is a flat sheet edged by a hairline; whatever
 * moves floats above it on a soft, layered shadow. The moving element stays sharp and
 * real, and the context around it stays quiet.
 */
const sheet = "bg-background shadow-[0_0_0_1px_var(--color-border),0_1px_2px_rgb(0_0_0/0.04)]";
const float =
  "bg-background shadow-[0_0_0_1px_var(--color-border),0_2px_4px_rgb(0_0_0/0.04),0_14px_32px_-10px_rgb(0_0_0/0.22)]";

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
    <span
      className={cn("inline-flex h-7 items-center gap-1.5 rounded-[7px] px-2.5 font-medium", sheet)}
    >
      {Icon ? <Icon aria-hidden="true" className="size-3.5" /> : null}
      {children}
    </span>
  );
}

/** A line of placeholder text. `strong` reads as a heading. */
function Line({ w, strong }: { w: string; strong?: boolean }) {
  return (
    <span
      className={cn(
        "block h-1.5 shrink-0 rounded-full bg-foreground/[0.08]",
        strong && "h-2 bg-foreground/[0.16]",
      )}
      style={{ width: w }}
    />
  );
}

/** A placeholder list row: a round avatar and two lines. */
function Row({ w = "62%", className }: { w?: string; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="size-5 shrink-0 rounded-full bg-foreground/[0.09]" />
      <span className="grid flex-1 gap-1.5">
        <Line w={w} strong />
        <Line w="88%" />
      </span>
    </span>
  );
}

function Page({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "absolute inset-4 flex flex-col gap-3.5 overflow-hidden rounded-[10px] p-4",
        sheet,
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
        "absolute inset-0 bg-black/20 opacity-0 transition-opacity group-data-open/s:opacity-100 dark:bg-black/50",
        move,
      )}
    />
  );
}

/** Monochrome primary button. */
function Solid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center justify-center rounded-[7px] bg-foreground px-2.5 font-medium text-background",
        className,
      )}
    >
      {children}
    </span>
  );
}

export const SCENES: Scene[] = [
  {
    id: "dropdown",
    title: "Dropdown",
    hint: "Opens from its trigger",
    category: "overlays",
    render: (open) => (
      <Stage open={open}>
        <Page>
          <span className="flex items-center justify-between">
            <Line w="34%" strong />
            <Fake icon={ArrowUpDown}>Sort by</Fake>
          </span>
          <Row w="48%" />
          <Row w="64%" />
          <Row w="40%" />
        </Page>
        {/* Anchored under the trigger's right edge, and grows from there. */}
        <div
          className={cn(
            "absolute top-[62px] right-6 grid w-[min(176px,calc(100%-48px))] origin-top-right rounded-[10px] p-1",
            float,
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
                  "flex h-7 items-center justify-between rounded-[6px] px-2 text-muted-foreground",
                  index === 1 && "bg-muted font-medium text-foreground",
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
          <Line w="38%" strong />
          <Row w="52%" />
          <Row w="44%" />
          <Row w="60%" />
        </Page>
        <Scrim />
        <div
          className={cn(
            "absolute top-1/2 left-1/2 grid w-[min(228px,calc(100%-32px))] -translate-x-1/2 gap-1.5 rounded-[12px] p-4",
            float,
            "-translate-y-[calc(50%-16px)] scale-97 opacity-0 transition-[opacity,translate,scale] will-change-[translate,scale,opacity] backface-hidden",
            "group-data-open/s:-translate-y-1/2 group-data-open/s:scale-100 group-data-open/s:opacity-100",
            move,
          )}
        >
          <strong className="text-[13px]">Delete project?</strong>
          <span className="text-muted-foreground">
            This removes 24 files for everyone on the team.
          </span>
          <div className="mt-2 flex justify-end gap-1.5">
            <Fake>Cancel</Fake>
            <Solid>Delete</Solid>
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
          <Line w="30%" strong />
          <Row w="58%" />
          <Row w="42%" />
          <Row w="50%" />
        </Page>
        <div
          className={cn(
            "absolute right-3 bottom-3 flex max-w-[calc(100%-24px)] items-center gap-2.5 rounded-[12px] py-2.5 pr-3.5 pl-2.5",
            float,
            "translate-y-[calc(100%+16px)] opacity-0 transition-[opacity,translate]",
            "group-data-open/s:translate-y-0 group-data-open/s:opacity-100",
            move,
          )}
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-background">
            <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
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
          <span className="flex items-center justify-between">
            <Line w="22%" strong />
            <Fake>Filters</Fake>
          </span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["70%", "52%", "64%", "46%"].map((w) => (
              <span key={w} className="grid gap-1.5">
                <span className="aspect-4/3 rounded-[7px] bg-foreground/[0.06]" />
                <Line w={w} strong />
                <Line w="34%" />
              </span>
            ))}
          </div>
        </Page>
        <Scrim />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(58%,248px)] flex-col gap-3 bg-background p-4 shadow-[-1px_0_0_var(--color-border),-16px_0_40px_-20px_rgb(0_0_0/0.35)]",
            "translate-x-[105%] transition-[translate] group-data-open/s:translate-x-0",
            move,
          )}
        >
          <div className="mb-1 flex items-center justify-between">
            <strong className="text-[13px]">Filters</strong>
            <X aria-hidden="true" className="size-3.5 text-muted-foreground" />
          </div>
          {["In stock", "Free delivery", "On sale"].map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-3.5 place-items-center rounded-[4px] shadow-[inset_0_0_0_1px_var(--color-border)]",
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
          <Solid className="mt-auto h-8">Show 12 results</Solid>
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
      <Stage open={open} className="grid content-start gap-3 p-4">
        <div className="relative grid grid-cols-3 rounded-[10px] bg-foreground/[0.06] p-1">
          <span
            className={cn(
              "absolute inset-y-1 left-1 w-[calc((100%-8px)/3)] rounded-[7px]",
              float,
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
        {/* Both panels share one cell and cross over in the direction of travel. */}
        <div className={cn("grid overflow-hidden rounded-[10px] p-4", sheet)}>
          <span
            className={cn(
              "col-start-1 row-start-1 grid gap-3.5 transition-[opacity,translate]",
              "group-data-open/s:-translate-x-6 group-data-open/s:opacity-0",
              move,
            )}
          >
            <Row w="54%" />
            <Row w="40%" />
          </span>
          <span
            className={cn(
              "col-start-1 row-start-1 grid translate-x-6 gap-3 opacity-0 transition-[opacity,translate]",
              "group-data-open/s:translate-x-0 group-data-open/s:opacity-100",
              move,
            )}
          >
            {["44%", "58%"].map((w) => (
              <span key={w} className="flex items-center justify-between gap-3">
                <span className="grid flex-1 gap-1.5">
                  <Line w={w} strong />
                  <Line w="70%" />
                </span>
                <span className="h-4 w-7 shrink-0 rounded-full bg-foreground/[0.12]" />
              </span>
            ))}
          </span>
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
            // Own layer: rasterized once and moved as a bitmap, so text and icons don't
            // shimmer while the page scales by sub-pixel amounts.
            "transition-[opacity,translate,scale] will-change-[translate,scale,opacity] backface-hidden",
            "group-data-open/s:-translate-x-[24%] group-data-open/s:scale-96 group-data-open/s:opacity-40",
            move,
          )}
        >
          <span className="flex items-center gap-1.5 text-[13px] font-semibold">
            <Inbox aria-hidden="true" className="size-3.5 shrink-0" /> Inbox
          </span>
          <Row w="46%" className="-mx-2 rounded-[8px] bg-foreground/[0.04] px-2 py-1.5" />
          <Row w="58%" />
          <Row w="38%" />
          <Row w="52%" />
          <Row w="44%" />
        </Page>
        <Page
          className={cn(
            "translate-x-[calc(100%+28px)] transition-[translate] will-change-[translate] backface-hidden group-data-open/s:translate-x-0",
            move,
          )}
        >
          <strong className="text-[13px]">Re: Launch plan</strong>
          <Row w="30%" />
          <span className="block h-14 shrink-0 rounded-[8px] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-foreground)_12%,transparent),color-mix(in_oklab,var(--color-foreground)_4%,transparent))]" />
          <Line w="92%" />
          <Line w="84%" />
          <Line w="60%" />
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
      <Stage open={open} className="grid content-center gap-2 px-5">
        {[
          { icon: Bell, label: "Notifications", live: true },
          { icon: Settings, label: "Weekly digest", live: false },
        ].map(({ icon: Icon, label, live }) => (
          <span
            key={label}
            className={cn(
              "flex items-center gap-2.5 rounded-[10px] px-3.5 py-3 font-medium",
              sheet,
              !live && "text-muted-foreground",
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
            <span
              className={cn(
                "relative ml-auto h-5 w-[34px] rounded-full bg-foreground/15 transition-colors",
                live && "group-data-open/s:bg-foreground",
                move,
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 size-4 rounded-full bg-background shadow-[0_1px_2px_rgb(0_0_0/0.25)] transition-[translate]",
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
      <Stage open={open} className="grid content-start gap-2 p-4">
        <div className={cn("rounded-[10px]", sheet)}>
          <span className="flex items-center justify-between px-3 py-[11px] font-medium">
            Can I change plans later?
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "size-3.5 text-muted-foreground transition-[rotate] group-data-open/s:rotate-180",
                move,
              )}
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
        {["Do you offer refunds?", "Is there a team plan?"].map((question) => (
          <div key={question} className={cn("rounded-[10px]", sheet)}>
            <span className="flex items-center justify-between px-3 py-[11px] font-medium">
              {question}
              <ChevronDown aria-hidden="true" className="size-3.5 text-muted-foreground" />
            </span>
          </div>
        ))}
      </Stage>
    ),
  },
  {
    id: "search",
    title: "Search field",
    hint: "Expands from its icon",
    category: "controls",
    render: (open) => (
      <Stage open={open} className="grid content-start gap-2.5 px-5 pt-6">
        <div
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-full px-[13px]",
            sheet,
            "[clip-path:inset(-2px_calc(100%-42px)_-2px_-2px_round_999px)] transition-[clip-path] group-data-open/s:[clip-path:inset(-2px_-2px_-2px_-2px_round_999px)]",
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
              "ml-auto rounded-[5px] px-1.5 py-px text-[11px] text-muted-foreground opacity-0 shadow-[inset_0_0_0_1px_var(--color-border)] transition-opacity group-data-open/s:opacity-100",
              move,
            )}
          >
            ⌘K
          </span>
        </div>
        {/* Recent searches follow the field in, one after another. */}
        {["58%", "44%", "66%"].map((w, index) => (
          <span
            key={w}
            className={cn(
              "flex items-center gap-2.5 px-3",
              "-translate-y-1 opacity-0 transition-[opacity,translate] group-data-open/s:translate-y-0 group-data-open/s:opacity-100",
              move,
              staggered,
            )}
            style={{ "--i": index + 1 } as CSSProperties}
          >
            <Search aria-hidden="true" className="size-3 shrink-0 text-muted-foreground/60" />
            <Line w={w} />
          </span>
        ))}
      </Stage>
    ),
  },
  {
    id: "list",
    title: "List reveal",
    hint: "Rows arrive one after another",
    category: "content",
    render: (open) => (
      <Stage open={open} className="grid content-center gap-1.5 px-5">
        {["Design review", "Ship billing fixes", "Interview: Platform", "Quarterly planning"].map(
          (item, index) => (
            <span
              key={item}
              className={cn(
                "flex h-[34px] items-center gap-2.5 rounded-[9px] px-3 font-medium",
                sheet,
                "translate-y-2.5 opacity-0 transition-[opacity,translate] group-data-open/s:translate-y-0 group-data-open/s:opacity-100",
                move,
                staggered,
              )}
              style={{ "--i": index } as CSSProperties}
            >
              <span className="h-3.5 w-[3px] rounded-full bg-foreground/25" />
              {item}
              <span className="ml-auto text-muted-foreground tabular-nums">
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
            "relative w-[58%] max-w-[210px] overflow-hidden rounded-[12px]",
            sheet,
            "transition-[translate] group-data-open/s:-translate-y-1.5",
            "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:shadow-[0_22px_40px_-18px_rgb(0_0_0/0.4)] after:transition-opacity after:duration-(--ez-dur) after:ease-(--ez-ease) group-data-open/s:after:opacity-100",
            move,
          )}
        >
          <div
            className={cn(
              "relative aspect-4/3 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--color-foreground)_16%,transparent),color-mix(in_oklab,var(--color-foreground)_5%,transparent))]",
              "transition-[scale] group-data-open/s:scale-107",
              move,
            )}
          >
            <span className="absolute top-[30%] left-[58%] size-[22%] rounded-full bg-background/70" />
          </div>
          <div className="relative flex justify-between bg-background px-3 py-2.5">
            <strong>Studio lamp</strong>
            <span className="text-muted-foreground tabular-nums">$148</span>
          </div>
          <span
            className={cn(
              "absolute top-2 right-2 grid size-[26px] place-items-center rounded-full",
              float,
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
      <Stage open={open} className="grid content-center gap-1 px-6">
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
            "text-muted-foreground opacity-0 transition-opacity group-data-open/s:opacity-100",
            move,
          )}
        >
          <span className="font-medium text-foreground">+52%</span> from last month
        </span>
      </Stage>
    ),
  },
];
