import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type NotesCardProps = {
  className?: string;
  title?: string;
  children?: ReactNode;
};

export function NotesCard({ className, title = "Note", children }: NotesCardProps) {
  return (
    <div
      className={cn(
        "flex h-64 w-48 flex-col rounded-3xl border border-amber-200/80 bg-[#fced99] p-4 font-sans shadow-md dark:border-amber-900/40 dark:bg-amber-100/90",
        className,
      )}
    >
      <p className="shrink-0 text-[15px] font-semibold leading-snug text-zinc-950">{title}</p>
      <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto text-[13px] leading-snug text-zinc-800">
        {children}
      </div>
    </div>
  );
}

export type NotesProps = {
  className?: string;
  title?: string;
  lines?: string[];
};

const DEFAULT_LINES = [
  "Has worked with ABC for the last 10 years",
  "Built two dozen web apps",
  "Latest work is live in stores",
  "A cool guy",
];

export default function Notes({
  className,
  title = "About John",
  lines = DEFAULT_LINES,
}: NotesProps) {
  return (
    <NotesCard className={className} title={title}>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </NotesCard>
  );
}
