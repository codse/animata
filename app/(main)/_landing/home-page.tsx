"use client";

import Link from "next/link";
import React, { Suspense } from "react";

import CarbonAds from "@/components/ads";
import { GitHubStarLink } from "@/components/github-star-link";
import { docsConfig } from "@/config/docs";
import { siteStats } from "@/config/site-stats";
import { cn } from "@/lib/utils";

import ExitIntentModal from "./exit-intent-modal";
import NewsletterSection from "./newsletter";
import OpenSourceSection from "./open-source-section";
import StatsBento from "./stats-bento";

const Testimonials = React.lazy(() => import("./testimonials"));
const FAQSection = React.lazy(() => import("./faq-section"));
const CallToActionSection = React.lazy(() => import("./call-to-action"));

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

function Hero() {
  return (
    <section className="px-6 pb-12 pt-16 sm:pb-16 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-(family-name:--font-display) text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.05] tracking-tight text-foreground font-bold">
          Ship faster.
          <br />
          Look better.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-balance text-[clamp(15px,2vw,18px)] leading-[1.6] text-[hsl(var(--text-secondary))]">
          {siteStats.componentsFormatted} animated React components you can copy into any project.
          Free, open source, and ready to use.
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mx-auto sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            href={componentsHref}
            className="inline-flex w-full items-center justify-center rounded-full bg-[hsl(var(--accent))] px-8 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            Explore components
          </Link>
          <GitHubStarLink
            source="hero"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-8 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:border-foreground/25 hover:bg-foreground/3 sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
}

const WHY_SECTION_REASONS = [
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
] as const;

function WhySection() {
  return (
    <section className="border-t border-border bg-[hsl(var(--surface-alt))] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-(family-name:--font-display) text-[clamp(28px,5vw,44px)] leading-none text-foreground">
          Why teams
          <br />
          <span className="text-muted-foreground">choose animata.</span>
        </h2>

        <div className="mt-14 grid gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-8">
          {WHY_SECTION_REASONS.map((reason, i) => (
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
            See all {siteStats.componentsFormatted} components →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div id="main-content" className="relative overflow-x-clip bg-background">
      <ExitIntentModal />

      <Hero />

      <StatsBento />

      <div className="flex justify-center px-6 py-8">
        <CarbonAds />
      </div>

      <WhySection />

      <OpenSourceSection />

      <NewsletterSection featured />

      <LazySection component={Testimonials} className="min-h-96" />

      <div className="border-y border-border py-16 text-center sm:py-20">
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

      <LazySection component={FAQSection} className="min-h-96" />

      <LazySection component={CallToActionSection} className="min-h-48" />
    </div>
  );
}
