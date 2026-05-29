import { ArrowUpRightIcon } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  componentDocHref,
  type DemoComponentLink,
  getDemoComponents,
} from "@/app/demo/demo-registry";
import { inlineCodeProseCss } from "@/lib/inline-code";
import { cn } from "@/lib/utils";

const notesSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-demo-notes-sans",
  display: "swap",
});

/** Width tokens live in DemoNotesStyles — prose 42rem, bleed 48rem. */
const MEASURE_PROSE = "demo-notes-measure-prose mx-auto w-full min-w-0";
const MEASURE_BLEED = "demo-notes-measure-bleed mx-auto w-full min-w-0";

/** oklch body + label tokens — light/dark without demo tinting */
const labelTone = "text-[oklch(0.52_0.03_260)] dark:text-[oklch(0.62_0.03_260)]";
const bodyTone = "text-[oklch(0.35_0.02_260)] dark:text-[oklch(0.78_0.02_260)]";
const leadTone = "text-[oklch(0.38_0.02_260)] dark:text-[oklch(0.82_0.02_260)]";
const captionTone = "text-[oklch(0.52_0.03_260)] dark:text-[oklch(0.58_0.03_260)]";
const secondaryTone = "text-[oklch(0.48_0.025_260)] dark:text-[oklch(0.65_0.025_260)]";

const proseBody = cn(
  "space-y-5 text-[16px] leading-[1.8] tracking-[-0.011em] sm:text-[17px] sm:leading-[1.75]",
  bodyTone,
  "[&_a:not([data-component-link])]:font-medium [&_a:not([data-component-link])]:text-foreground [&_a:not([data-component-link])]:underline [&_a:not([data-component-link])]:decoration-border/80 [&_a:not([data-component-link])]:underline-offset-[0.2em] [&_a:not([data-component-link])]:transition-colors hover:[&_a:not([data-component-link])]:decoration-foreground/40",
  "[&_p+p]:mt-0 [&_strong]:font-semibold [&_strong]:text-foreground",
);

function DemoNotesStyles() {
  return (
    <style>{`
      .demo-notes {
        --demo-notes-prose: 42rem;
        --demo-notes-bleed: 48rem;
      }

      .demo-notes-measure-prose {
        max-width: var(--demo-notes-prose);
      }

      .demo-notes-measure-bleed {
        max-width: var(--demo-notes-bleed);
      }

      ${inlineCodeProseCss}
    `}</style>
  );
}

function DemoNotesRoot({
  id = "demo-notes",
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        notesSans.variable,
        notesSans.className,
        "demo-notes bg-background text-foreground antialiased",
        "border-t border-border/60",
        "pb-[calc(var(--demo-chrome-reserve,5rem)+3rem)] pt-14 sm:pt-16",
        className,
      )}
    >
      <DemoNotesStyles />
      <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-y-16 px-6 sm:gap-y-20 sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
}

function DemoNotesHeader({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className={cn(MEASURE_PROSE, "pb-2 sm:pb-4")}>
      {eyebrow ? (
        <p
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.06em]",
            "bg-[oklch(0.96_0.01_260)] text-[oklch(0.15_0.02_260)]",
            "dark:bg-[oklch(0.22_0.02_260)] dark:text-[oklch(0.88_0.02_260)]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-4 font-(family-name:--font-demo-notes-sans) text-[clamp(1.875rem,4.5vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance text-foreground"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-[17px] leading-[1.65] tracking-[-0.012em] text-pretty sm:text-[18px]",
            leadTone,
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}

function DemoNotesSection({
  id,
  index,
  title,
  children,
  className,
}: {
  id?: string;
  index?: number;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const indexLabel = index != null ? String(index).padStart(2, "0") : null;

  return (
    <section id={id} className={cn("w-full min-w-0 scroll-mt-24", className)}>
      <div className={MEASURE_PROSE}>
        <h3 className="pb-1">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {indexLabel ? (
              <span
                className={cn("font-mono text-[11px] font-normal tracking-[0.04em]", labelTone)}
              >
                {indexLabel}
              </span>
            ) : null}
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-foreground/90">
              {title}
            </span>
          </span>
        </h3>
      </div>
      <div className="mt-5 flex min-w-0 flex-col gap-4 sm:mt-6 sm:gap-5">{children}</div>
    </section>
  );
}

/** Narrow prose column for paragraphs inside a section. */
function DemoNotesProse({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(MEASURE_PROSE, "demo-notes-prose", proseBody, className)}>{children}</div>
  );
}

function DemoNotesBleed({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(MEASURE_BLEED, className)}>{children}</div>;
}

function DemoNotesComponentLink({
  href,
  category,
  name,
  description,
}: {
  href: string;
  category: string;
  name: string;
  description: string;
}) {
  return (
    <div className={MEASURE_BLEED}>
      <Link
        href={href}
        data-component-link
        className="group flex touch-manipulation items-start gap-4 bg-foreground/[0.02] px-4 py-3.5 transition-colors hover:bg-foreground/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:px-5 sm:py-4 dark:bg-foreground/[0.04] dark:hover:bg-foreground/[0.06]"
      >
        <div className="min-w-0 flex-1">
          <p className={cn("font-mono text-[10px] tracking-[0.12em] uppercase", labelTone)}>
            {category}
          </p>
          <p className="mt-1 text-[16px] font-semibold tracking-[-0.02em] text-foreground">
            {name}
          </p>
          <p className={cn("mt-1.5 text-[14px] leading-[1.55] text-pretty", secondaryTone)}>
            {description}
          </p>
        </div>
        <ArrowUpRightIcon
          aria-hidden
          className="mt-0.5 size-4 shrink-0 text-foreground/28 transition-[transform,color] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground/65"
        />
      </Link>
    </div>
  );
}

function DemoNotesComponentLinks({ demoKey }: { demoKey: string }) {
  const components = getDemoComponents(demoKey);
  if (!components.length) return null;

  return (
    <>
      {components.map((component: DemoComponentLink) => (
        <DemoNotesComponentLink
          key={component.docSlug}
          href={componentDocHref(component.docSlug)}
          category={component.category}
          name={component.name}
          description={component.description}
        />
      ))}
    </>
  );
}

function DemoNotesCode({ children, caption }: { children: string; caption?: string }) {
  return (
    <figure className={MEASURE_BLEED}>
      {caption ? (
        <figcaption className={cn("mb-3 font-mono text-[11px] tracking-[0.02em]", captionTone)}>
          {caption}
        </figcaption>
      ) : null}
      <pre
        className={cn(
          "overflow-x-auto overscroll-x-contain whitespace-pre bg-foreground/[0.025] px-4 py-3 font-mono text-[12.5px] leading-[1.65] tabular-nums text-foreground/90 sm:px-5 sm:py-4 sm:text-[13px] dark:bg-foreground/[0.04]",
        )}
      >
        <code className="block w-max">{children}</code>
      </pre>
    </figure>
  );
}

export const DemoNotes = {
  Root: DemoNotesRoot,
  Header: DemoNotesHeader,
  Section: DemoNotesSection,
  Prose: DemoNotesProse,
  Bleed: DemoNotesBleed,
  ComponentLink: DemoNotesComponentLink,
  ComponentLinks: DemoNotesComponentLinks,
  Code: DemoNotesCode,
};
