"use client";

import Link from "next/link";
import Duolingo from "@/animata/button/duolingo";
import ShiningButton from "@/animata/button/shining-button";
import Counter, { Formatter } from "@/animata/text/counter";
import TypingText from "@/animata/text/typing-text";
import CarbonAds from "@/components/ads";
import ComponentLinkWrapper from "@/components/component-link-wrapper";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

import HeroTitle from "./hero-title";

function Stat({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <div className="flex items-baseline gap-1">
      <Counter
        targetValue={value}
        direction="up"
        delay={delay}
        format={Formatter.number}
        className="tabular-nums text-lg font-semibold text-foreground"
      />
      <span className="text-sm text-muted-foreground">+</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-clip">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-12 lg:px-[67px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — copy */}
          <div className="pointer-events-auto flex flex-col lg:max-w-[48%]">
            <HeroTitle />

            <p className="mt-5 max-w-[400px] text-[16px] leading-[1.6] text-[hsl(var(--text-secondary))]">
              Animated React components you can drop into any project. No dependencies. No lock-in.
              Just code.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/docs/setup"
                className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--accent))] px-7 py-3 text-[15px] font-semibold text-white shadow-[var(--shadow-md)] transition-all hover:brightness-110"
              >
                Browse components
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.github}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-[15px] font-medium text-background transition-opacity hover:opacity-85"
              >
                <Icons.gitHub className="h-4 w-4" />
                GitHub
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-border pt-4">
              <Stat value={194} label="Components" delay={200} />
              <span className="hidden h-4 w-px bg-border sm:block" />
              <Stat value={22} label="Categories" delay={400} />
              <span className="hidden h-4 w-px bg-border sm:block" />
              <Stat value={1000} label="Stars" delay={600} />
            </div>

            <div className="mt-5 hidden lg:block">
              <CarbonAds />
            </div>
          </div>

          {/* Right — live component showcase */}
          <div
            className="pointer-events-auto w-full lg:max-w-[50%]"
            role="region"
            aria-label="Live component preview"
          >
            <div className="overflow-hidden rounded-3xl bg-[hsl(var(--surface-dark))] shadow-[var(--shadow-lg)]">
              {/* Terminal bar */}
              <div className="border-b border-foreground/10 px-5 py-3">
                <div className="flex items-center gap-1.5">
                  <div aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <div aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-[11px] font-medium text-muted-foreground">
                    Terminal
                  </span>
                </div>
              </div>
              {/* Code area */}
              <div className="px-5 py-4 font-mono text-sm text-primary-foreground/70">
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
              {/* Live demo area */}
              <div className="border-t border-foreground/10 bg-foreground/5 px-6 py-12">
                <p className="mb-5 text-center text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Live preview
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <ComponentLinkWrapper
                    link="/docs/button/shining-button"
                    aria-label="Shining Button component"
                  >
                    <ShiningButton />
                  </ComponentLinkWrapper>
                  <ComponentLinkWrapper
                    link="/docs/button/duolingo"
                    aria-label="Duolingo Button component"
                  >
                    <Duolingo />
                  </ComponentLinkWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center border-t border-border pt-5 lg:hidden">
          <CarbonAds />
        </div>
      </div>
    </section>
  );
}
