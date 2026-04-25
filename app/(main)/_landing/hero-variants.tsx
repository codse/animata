"use client";

import Link from "next/link";

import Duolingo from "@/animata/button/duolingo";
import ShiningButton from "@/animata/button/shining-button";
import FluidTabs from "@/animata/tabs/fluid-tabs";
import TextExplodeIMessage from "@/animata/text/text-explode-imessage";
import TypingText from "@/animata/text/typing-text";
import CarbonAds from "@/components/ads";
import ComponentLinkWrapper from "@/components/component-link-wrapper";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

function HeroCTAs() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Link
        href="/docs/setup"
        className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--accent))] px-7 py-3 text-[15px] font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
      >
        Browse components
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        href={siteConfig.links.github}
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-6 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-foreground/5"
      >
        <Icons.gitHub className="h-4 w-4" />
        GitHub
      </Link>
    </div>
  );
}

function HeroShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-clip">
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-14">
        {children}
        <div className="mt-6 flex justify-center border-t border-border pt-5 lg:hidden">
          <CarbonAds />
        </div>
      </div>
    </section>
  );
}

/**
 * Variant A — "The components your design deserves"
 * Hypothesis: Aspirational + product demo wins.
 * Angle: You already have a great design — your components should match.
 */
export function HeroVariantA() {
  return (
    <HeroShell>
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-col lg:max-w-[48%]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Free &amp; Open Source
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.75rem)] leading-[1] tracking-[-0.03em] text-foreground">
            Components with personality. For sites with personality.
          </h1>
          <p className="mt-5 max-w-[400px] text-[16px] leading-[1.6] text-[hsl(var(--text-secondary))]">
            158+ animated React components. Copy the code, drop it in your project. Every
            interaction feels intentional.
          </p>
          <HeroCTAs />
          <div className="mt-7 hidden lg:block">
            <CarbonAds />
          </div>
        </div>

        <div className="w-full lg:max-w-[50%]" role="region" aria-label="Live component preview">
          <div className="overflow-hidden rounded-2xl border border-border bg-[hsl(var(--surface-card))]">
            {/* Terminal */}
            <div className="px-5 py-3">
              <div className="flex items-center gap-1.5">
                <div aria-hidden="true" className="h-2 w-2 rounded-full bg-red-500/40" />
                <div aria-hidden="true" className="h-2 w-2 rounded-full bg-yellow-500/40" />
                <div aria-hidden="true" className="h-2 w-2 rounded-full bg-green-500/40" />
              </div>
            </div>
            <div className="px-5 pb-4 font-mono text-sm text-foreground/60">
              <span className="text-emerald-400">$</span>{" "}
              <TypingText
                text="npx animata add shining-button"
                delay={48}
                repeat
                waitTime={3000}
                className="inline"
                smooth
              />
            </div>
            {/* Live demos */}
            <div className="flex flex-wrap items-center justify-center gap-4 border-t border-border px-6 py-8">
              <ComponentLinkWrapper link="/docs/button/shining-button" aria-label="Shining Button">
                <ShiningButton />
              </ComponentLinkWrapper>
              <ComponentLinkWrapper link="/docs/button/duolingo" aria-label="Duolingo Button">
                <Duolingo />
              </ComponentLinkWrapper>
            </div>
          </div>
        </div>
      </div>
    </HeroShell>
  );
}

/**
 * Variant B — "Ship interfaces people remember"
 * Hypothesis: Outcome-focused + immediate visual proof converts best.
 * Angle: Focus on the result, not the tool.
 */
export function HeroVariantB() {
  return (
    <HeroShell>
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          158+ animated components
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-[-0.03em] text-foreground">
          Make every click feel like something.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[17px] leading-[1.6] text-[hsl(var(--text-secondary))]">
          158+ animated React components. Copy the code, paste into your project. Every interaction
          delights.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/setup"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-[16px] font-semibold text-background transition-opacity hover:opacity-85"
          >
            Browse components
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-7 py-3.5 text-[16px] font-medium text-background transition-opacity hover:opacity-85"
          >
            <Icons.gitHub className="h-4 w-4" />
            Star on GitHub
          </Link>
        </div>
      </div>

      {/* Live component strip */}
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <ComponentLinkWrapper
          link="/docs/button/shining-button"
          aria-label="Shining Button"
          className="group flex flex-col overflow-hidden rounded-2xl bg-[hsl(var(--surface-dark))] shadow-[var(--shadow-lg)]"
        >
          <div className="flex flex-1 items-center justify-center px-4 py-8">
            <ShiningButton />
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 text-primary-foreground/50">
            <span className="text-[12px] font-semibold">Shining Button</span>
            <span className="text-[11px] opacity-0 transition-opacity group-hover:opacity-100">
              View →
            </span>
          </div>
        </ComponentLinkWrapper>
        <ComponentLinkWrapper
          link="/docs/tabs/fluid-tabs"
          aria-label="Fluid Tabs"
          className="group flex flex-col overflow-hidden rounded-2xl bg-[hsl(var(--surface-card))] shadow-[var(--shadow-md)]"
        >
          <div className="flex flex-1 items-center justify-center px-4 py-8">
            <FluidTabs />
          </div>
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-[12px] font-semibold text-foreground/50">Fluid Tabs</span>
            <span className="text-[11px] text-foreground/30 opacity-0 transition-opacity group-hover:opacity-100">
              View →
            </span>
          </div>
        </ComponentLinkWrapper>
        <ComponentLinkWrapper
          link="/docs/button/duolingo"
          aria-label="Duolingo Button"
          className="group flex flex-col overflow-hidden rounded-2xl bg-[hsl(var(--surface-card))] shadow-[var(--shadow-md)]"
        >
          <div className="flex flex-1 items-center justify-center px-4 py-8">
            <Duolingo />
          </div>
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-[12px] font-semibold text-foreground/50">Duolingo Button</span>
            <span className="text-[11px] text-foreground/30 opacity-0 transition-opacity group-hover:opacity-100">
              View →
            </span>
          </div>
        </ComponentLinkWrapper>
      </div>

      <div className="mt-6 flex justify-center">
        <CarbonAds />
      </div>
    </HeroShell>
  );
}

/**
 * Variant C — "Same components, every site. Yours doesn't have to."
 * Hypothesis: Tension + resolution with product-as-proof converts best.
 * Angle: Name the enemy (sameness), offer the cure.
 */
export function HeroVariantC() {
  return (
    <HeroShell>
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-col lg:max-w-[50%]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Free &amp; Open Source
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
            Every site uses the same components.{" "}
            <span className="text-[hsl(var(--accent))]">Yours won&apos;t.</span>
          </h1>
          <p className="mt-5 max-w-[420px] text-[16px] leading-[1.6] text-[hsl(var(--text-secondary))]">
            158+ animated React components that feel hand-crafted. Copy the code, paste it in. Ship
            something people notice.
          </p>
          <HeroCTAs />
          <div className="mt-7 hidden lg:block">
            <CarbonAds />
          </div>
        </div>

        {/* Single hero component — hover to trigger */}
        <div className="w-full lg:max-w-[46%]" role="region" aria-label="Component showcase">
          <ComponentLinkWrapper link="/docs/text/text-explode-imessage">
            <div className="flex h-[300px] items-center justify-center overflow-hidden rounded-3xl bg-[hsl(var(--surface-dark))] p-8 shadow-[var(--shadow-lg)]">
              <TextExplodeIMessage
                text="animata"
                mode="hover"
                className="select-none text-5xl font-black text-primary-foreground md:text-7xl"
              />
            </div>
          </ComponentLinkWrapper>
          <p className="mt-3 text-center text-[12px] text-muted-foreground">
            Hover to see the magic
          </p>
        </div>
      </div>
    </HeroShell>
  );
}
