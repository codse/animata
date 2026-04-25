"use client";

import Link from "next/link";
import React, { Suspense } from "react";

import CarbonAds from "@/components/ads";
import { Icons } from "@/components/icons";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import ExitIntentModal from "./_landing/exit-intent-modal";
import OpenSourceSection from "./_landing/open-source-section";
import StatsBento from "./_landing/stats-bento";

const Testimonials = React.lazy(() => import("./_landing/testimonials"));
const FAQSection = React.lazy(() => import("./_landing/faq-section"));
const CallToActionSection = React.lazy(() => import("./_landing/call-to-action"));

const componentsHref =
  docsConfig.mainNav.find((item) => item.title === "Components")?.href ?? "/docs";

function LazySection({
  component: Component,
  className,
}: {
  className?: string;
  component: React.LazyExoticComponent<() => React.JSX.Element>;
}) {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className={cn("h-full min-h-32 w-full animate-pulse bg-foreground/5", className)} />
        }
      >
        <Component />
      </Suspense>
    </div>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="px-6 pb-12 pt-16 sm:pb-16 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-(family-name:--font-display) text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.05] tracking-[-0.01em] text-foreground">
          Ship faster.
          <br />
          Look better.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-balance text-[clamp(15px,2vw,18px)] leading-[1.6] text-[hsl(var(--text-secondary))]">
          158+ animated React components you can copy into any project. Free, open source, and ready
          to use.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
          <Link
            href={componentsHref}
            className="inline-flex w-full items-center justify-center rounded-full bg-[hsl(var(--accent))] px-8 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            Explore components
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:rounded-full sm:border sm:border-border sm:px-6 sm:py-3.5 sm:text-[15px] sm:text-foreground/70"
          >
            <Icons.gitHub className="h-4 w-4" />
            Star on GitHub
          </Link>
        </div>

        <p className="mt-5 text-center text-[13px] text-muted-foreground">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          2,506+ stars · Trusted by shipping teams
        </p>

        <div className="mt-8 flex justify-center">
          <CarbonAds />
        </div>
      </div>
    </section>
  );
}

/* ─── Why Section ─── */
function WhySection() {
  const reasons = [
    {
      title: "Skip the build step",
      description:
        "No npm install, nothing to update. Copy the file into your repo and you own it from there.",
    },
    {
      title: "Used in real apps first",
      description:
        "Every component came out of a real product before it reached the library. If it's in here, it already had a user.",
    },
    {
      title: "Accessibility, already in",
      description:
        "Keyboard focus, screen reader labels, reduced-motion fallbacks. All wired in before you copy anything.",
    },
  ];

  return (
    <section className="border-t border-border bg-[hsl(var(--surface-alt))] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-(family-name:--font-display) text-[clamp(28px,5vw,44px)] leading-none text-foreground">
          Why teams
          <br />
          <span className="text-muted-foreground">choose animata.</span>
        </h2>

        <div className="mt-14 grid gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-8">
          {reasons.map((reason, i) => (
            <div key={reason.title} className="border-t border-border pt-6">
              <span className="font-(family-name:--font-mono) text-[13px] text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-[18px] font-semibold text-foreground sm:text-[20px]">
                {reason.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-14">
          <Link
            href={componentsHref}
            className="text-[15px] font-medium text-[hsl(var(--link))] transition-colors hover:text-[hsl(var(--link-hover))]"
          >
            See all 158+ components →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function IndexPage() {
  return (
    <div id="main-content" className="relative overflow-x-clip bg-background">
      <ExitIntentModal />

      {/* 1. Hook — "Components that feel alive" + one demo */}
      <Hero />

      {/* 2. Proof — numbers + ecosystem */}
      <StatsBento />

      {/* 3. Why — value props */}
      <WhySection />

      {/* 4. Open source — contributors + stats */}
      <OpenSourceSection />

      {/* 5. Trust — testimonials */}
      <LazySection component={Testimonials} className="min-h-96" />

      {/* Mid-page CTA */}
      <div className="border-y border-border bg-[hsl(var(--surface-alt))] py-16 text-center sm:py-20">
        <p className="text-[15px] text-muted-foreground">
          Ready to make your interfaces stand out?
        </p>
        <div className="mt-4">
          <Link
            href={componentsHref}
            className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--accent))] px-7 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Explore components
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <LazySection component={FAQSection} className="min-h-96" />

      {/* CTA */}
      <LazySection component={CallToActionSection} className="min-h-48" />
    </div>
  );
}
