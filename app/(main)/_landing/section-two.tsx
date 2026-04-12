"use client";

import Link from "next/link";
import LEDBoard from "@/animata/card/led-board";
import FluidTabs from "@/animata/tabs/fluid-tabs";
import StaggeredLetter from "@/animata/text/staggered-letter";
import ComponentLinkWrapper from "@/components/component-link-wrapper";
import { cn } from "@/lib/utils";

function DemoCard({
  children,
  href,
  label,
  dark,
  className,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <ComponentLinkWrapper
      link={href}
      className={cn(
        "block w-full overflow-hidden rounded-2xl transition-shadow duration-300",
        dark
          ? "bg-[hsl(var(--surface-dark))] shadow-[var(--shadow-lg)]"
          : "bg-[hsl(var(--surface-card))] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      <div className="flex min-h-[180px] items-center justify-center p-5">{children}</div>
      <div
        className={cn(
          "flex items-center justify-between px-5 py-3",
          dark ? "border-t border-foreground/10" : "",
        )}
      >
        <span
          className={cn(
            "text-sm font-semibold",
            dark ? "text-primary-foreground/80" : "text-foreground",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "text-xs font-medium",
            dark ? "text-[hsl(var(--accent))]" : "text-[hsl(var(--link))]",
          )}
        >
          View →
        </span>
      </div>
    </ComponentLinkWrapper>
  );
}

export default function SectionTwo() {
  return (
    <section className="pb-[64px] pt-6 max-md:pb-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-[67px]">
        <div className="grid gap-4 sm:grid-cols-3">
          <DemoCard href="/docs/text/staggered-letter" label="Staggered Letter">
            <div className="overflow-hidden py-2">
              <StaggeredLetter text="Animata" direction="drop" />
            </div>
          </DemoCard>

          <DemoCard href="/docs/tabs/fluid-tabs" label="Fluid Tabs">
            <div className="scale-110">
              <FluidTabs />
            </div>
          </DemoCard>

          <DemoCard href="/docs/card/led-board" label="LED Board" dark>
            <LEDBoard word="COPY" />
          </DemoCard>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-[14px] font-semibold text-foreground transition-colors hover:bg-foreground/5"
          >
            Browse all 194+ components →
          </Link>
        </div>
      </div>
    </section>
  );
}
