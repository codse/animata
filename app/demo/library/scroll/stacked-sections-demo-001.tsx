"use client";

import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import StackedSections from "@/animata/scroll/stacked-sections";
import { cn } from "@/lib/utils";

import { StackedSectionsDemo001Notes } from "./stacked-sections-demo-001-notes";

/** PickFont — Tech + Minimal (Space Grotesk + Inter): https://pickfont.com */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/** Peek band when the next pane covers this one — no eyebrow strip, just color + type */
const STACK_OFFSET = 40;

const PAD_X = "px-6 sm:px-8";
const PAD_Y = "py-8 sm:py-9";

const typeDisplay = "font-(family-name:--font-display) font-semibold tracking-[-0.04em]";
const typeCopy = "font-(family-name:--font-sans) font-medium tracking-[-0.01em]";
const typeBody = "font-(family-name:--font-sans) font-normal tracking-normal";

const light = {
  bg: "bg-[#f4f5f8] text-[#0f1011]",
  muted: "text-[#0f1011]/72",
  panel: "border-[#0f1011]/10 bg-white/80",
  accent: "bg-[#5e6ad2] text-white",
  accentMuted: "bg-[#5e6ad2]/12 text-[#4a52a8]",
  dot: "bg-[#5e6ad2]",
};

const dark = {
  bg: "bg-[#0f1011] text-[#eeeef0]",
  muted: "text-[#eeeef0]/72",
  panel: "border-[#eeeef0]/12 bg-[#1a1b1e]",
  accent: "bg-[#8b93ff] text-[#0f1011]",
  accentMuted: "bg-[#8b93ff]/14 text-[#b4b9ff]",
  dot: "bg-[#8b93ff]",
};

type Tone = typeof light;

function ReleaseChapter({
  title,
  lead,
  body,
  tone,
  children,
}: {
  title: string;
  lead: string;
  body: string;
  tone: Tone;
  children?: ReactNode;
}) {
  return (
    <section className={cn("flex w-full shrink-0 flex-col overflow-hidden rounded-2xl", tone.bg)}>
      <div className={cn("flex flex-col gap-6", PAD_X, PAD_Y)}>
        <div className="flex flex-col gap-2.5">
          <h2
            className={cn(
              typeDisplay,
              "text-[clamp(1.75rem,7vw,2.75rem)] leading-[1.05] tracking-[-0.03em]",
            )}
          >
            {title}
          </h2>
          <p className={cn("text-[15px] leading-snug", typeBody, tone.muted)}>{lead}</p>
          <p className={cn("max-w-prose text-sm leading-[1.65]", typeBody, tone.muted)}>{body}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function ScatteredTools({ tone }: { tone: Tone }) {
  const rows = [
    { label: "Standup notes", where: "Slack thread" },
    { label: "Cycle scope", where: "Spreadsheet" },
    { label: "Customer ask", where: "Email" },
  ];
  return (
    <div className={cn("flex flex-col gap-2 rounded-xl border p-3", tone.panel)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between gap-3 rounded-lg bg-black/[0.03] px-3 py-2.5 dark:bg-white/[0.04]"
        >
          <span className={cn("text-sm", typeCopy)}>{row.label}</span>
          <span className={cn("text-xs", typeBody, tone.muted)}>{row.where}</span>
        </div>
      ))}
    </div>
  );
}

function CycleBoard({ tone }: { tone: Tone }) {
  const lanes = [
    { name: "Backlog", fill: 28 },
    { name: "In progress", fill: 62 },
    { name: "Review", fill: 44 },
    { name: "Done", fill: 91 },
  ];
  return (
    <div className={cn("rounded-xl border p-4", tone.panel)}>
      <p className={cn("mb-3 text-xs", typeCopy, tone.muted)}>Cycle · Apr 7 → Apr 21</p>
      <div className="flex flex-col gap-3">
        {lanes.map((lane) => (
          <div key={lane.name} className="flex items-center gap-3">
            <span className={cn("w-24 shrink-0 text-xs", typeBody, tone.muted)}>{lane.name}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/8 dark:bg-white/10">
              <div
                className={cn("h-full rounded-full", tone.dot)}
                style={{ width: `${lane.fill}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequestInbox({ tone }: { tone: Tone }) {
  const items = [
    { title: "Export audit log to S3", votes: 48 },
    { title: "Guest role for contractors", votes: 31 },
    { title: "Slack → issue from reaction", votes: 27 },
  ];
  return (
    <ul className={cn("flex flex-col gap-2 rounded-xl border p-3", tone.panel)}>
      {items.map((item) => (
        <li
          key={item.title}
          className="flex items-start justify-between gap-3 rounded-lg px-3 py-2.5"
        >
          <span className={cn("text-sm leading-snug", typeCopy)}>{item.title}</span>
          <span
            className={cn(
              "shrink-0 rounded-md px-2 py-0.5 text-[11px] tabular-nums",
              typeCopy,
              tone.accentMuted,
            )}
          >
            {item.votes}
          </span>
        </li>
      ))}
    </ul>
  );
}

function WorkspaceCta({ tone }: { tone: Tone }) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-xl border p-4", tone.panel)}>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-lg text-sm font-bold",
            tone.accent,
          )}
        >
          P
        </span>
        <div>
          <p className={cn("text-sm", typeCopy)}>acme.workspace</p>
          <p className={cn("text-xs", typeBody, tone.muted)}>42 members · Pro plan</p>
        </div>
      </div>
      <div
        className={cn(
          "flex h-11 items-center justify-center rounded-lg text-sm font-semibold",
          typeCopy,
          tone.accent,
        )}
      >
        Turn on spring features
      </div>
    </div>
  );
}

export default function StackedSectionsDemo001() {
  return (
    <>
      <div
        className={cn(
          display.variable,
          display.className,
          sans.variable,
          sans.className,
          "bg-[#e8eaef] text-[#0f1011]",
        )}
      >
        <div className={cn("mx-auto w-full max-w-3xl", PAD_X)}>
          <header className="flex min-h-[min(30svh,260px)] flex-col justify-center gap-3 pb-[var(--demo-chrome-reserve,5rem)] pt-[max(1.25rem,env(safe-area-inset-top))]">
            <h1
              className={cn(
                typeDisplay,
                "max-w-[14ch] text-[clamp(2rem,8vw,3rem)] leading-[1.02] tracking-[-0.03em]",
              )}
            >
              Spring release, one scroll
            </h1>
            <p className={cn("max-w-md text-sm leading-[1.65] text-[#0f1011]/68", typeBody)}>
              A product update page for a project tool — four chapters pin and stack as you read
              through what shipped this quarter.
            </p>
          </header>

          <StackedSections
            stackOffset={STACK_OFFSET}
            withDramaEffect
            scrollRunway="min(50vh, 24rem)"
            className="w-full"
          >
            <ReleaseChapter
              title="Stop chasing context"
              lead="Issues, cycles, and customer asks lived in three places."
              body="This release pulls triage into one surface so leads can answer “what are we building and why?” without opening five tabs."
              tone={light}
            >
              <ScatteredTools tone={light} />
            </ReleaseChapter>

            <ReleaseChapter
              title="Cycles that match reality"
              lead="Two-week rhythm with capacity hints built in."
              body="Teams see load per lane before the sprint starts — scope slips show up as bar drift, not a surprise retro topic."
              tone={dark}
            >
              <CycleBoard tone={dark} />
            </ReleaseChapter>

            <ReleaseChapter
              title="Customer requests, ranked"
              lead="Votes roll up from support and sales without a spreadsheet."
              body="Product can promote a request to an issue in one gesture; the inbox stays the source of truth for what users asked for."
              tone={light}
            >
              <RequestInbox tone={light} />
            </ReleaseChapter>

            <ReleaseChapter
              title="Ship it on your workspace"
              lead="Flags roll out per team — no all-hands required."
              body="Admins enable the spring bundle when ready. Everyone else sees what changed in the changelog the moment they log in."
              tone={dark}
            >
              <WorkspaceCta tone={dark} />
            </ReleaseChapter>
          </StackedSections>

          <footer
            className={cn(
              "flex min-h-[min(16svh,120px)] items-center justify-center pb-[var(--demo-chrome-reserve,5rem)] text-sm text-[#0f1011]/45",
              typeBody,
            )}
          >
            End of release notes
          </footer>
        </div>
      </div>

      <StackedSectionsDemo001Notes />
    </>
  );
}
