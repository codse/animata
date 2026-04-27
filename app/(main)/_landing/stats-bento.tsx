"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AnimatedBorderTrail from "@/animata/container/animated-border-trail";
import Marquee from "@/animata/container/marquee";
import AvatarList from "@/animata/list/avatar-list";
import Counter, { Formatter } from "@/animata/text/counter";
import Ticker from "@/animata/text/ticker";
import TypingText from "@/animata/text/typing-text";
import ComponentLinkWrapper from "@/components/component-link-wrapper";
import { Icons } from "@/components/icons";
import RemountOnMouseIn from "@/components/remount-on-mouse-in";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

// Get component categories from the sidebar nav (skip Getting Started + Contributing)
const categories = docsConfig.sidebarNav
  .filter((item) => item.title !== "Getting Started" && item.title !== "Contributing")
  .map((item) => ({
    label: item.title,
    href: item.items?.[0]?.href ?? item.href ?? "/docs",
    count: item.items?.length ?? 0,
  }));

const components = docsConfig.sidebarNav
  .filter((item) => item.title !== "Getting Started" && item.title !== "Contributing")
  .reduce((acc, group) => acc + (group.items?.length ?? 0), 0);

const stargazers = [
  {
    name: "@jattinmanhas",
    position: "India",
    image: "https://avatars.githubusercontent.com/u/63615545?v=4&s=64",
  },
  {
    name: "@flywhale",
    position: "Germany",
    image: "https://avatars.githubusercontent.com/u/620640?v=4&s=64",
  },
  {
    name: "@boyuan-chen",
    position: "USA",
    image: "https://avatars.githubusercontent.com/u/46272347?v=4&s=64",
  },
  {
    name: "@Faizanahmedsy",
    position: "India",
    image: "https://avatars.githubusercontent.com/u/119733178?v=4&s=64",
  },
  {
    name: "@abdellatif-laghjaj",
    position: "Morocco",
    image: "https://avatars.githubusercontent.com/u/79521157?v=4&s=64",
  },
  {
    name: "@hyhan",
    position: "China",
    image: "https://avatars.githubusercontent.com/u/20774397?v=4&s=64",
  },
];

const frameworkItems = [
  { icon: <Icons.nextJS className="h-4 w-4 sm:h-5 sm:w-5" />, key: "next" },
  { icon: <Icons.reactJS className="h-4 w-4 text-sky-500 sm:h-5 sm:w-5" />, key: "react" },
  { icon: <Icons.tailwind className="h-4 w-4 text-cyan-500 sm:h-5 sm:w-5" />, key: "tw" },
  { icon: <Icons.framerMotion className="h-4 w-4 text-pink-500 sm:h-5 sm:w-5" />, key: "motion" },
  {
    icon: <span className="text-[10px] font-bold text-amber-500 sm:text-[11px]">Vite</span>,
    key: "vite",
  },
  {
    icon: <span className="text-[10px] font-bold text-orange-500 sm:text-[11px]">Astro</span>,
    key: "astro",
  },
];

function OrbitItem({
  index,
  total,
  duration,
  children,
}: {
  index: number;
  total: number;
  duration: number;
  children: React.ReactNode;
}) {
  const startAngle = Math.round((index / total) * 360);
  const [angle, setAngle] = useState(startAngle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setAngle((a) => (a + 1) % 360), duration);
    return () => clearInterval(id);
  }, [duration]);

  const rad = (angle * Math.PI) / 180;
  const x = 35 * Math.cos(rad);
  const y = 15 * Math.sin(rad);
  const tilt = (-30 * Math.PI) / 180;
  const xT = x * Math.cos(tilt) - y * Math.sin(tilt);
  const yT = x * Math.sin(tilt) + y * Math.cos(tilt);
  const depth = (Math.sin(rad) + 1) / 2;

  // Round to 2 decimals to prevent hydration mismatch
  const left = Math.round((50 + xT) * 100) / 100;
  const top = Math.round((50 + yT) * 100) / 100;
  const scale = Math.round((0.7 + depth * 0.5) * 100) / 100;
  const op = Math.round((0.35 + depth * 0.65) * 100) / 100;

  return (
    <div
      className="absolute flex h-8 w-8 items-center justify-center rounded-full border border-border bg-[hsl(var(--surface-card))] sm:h-10 sm:w-10"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: Math.round(depth * 10),
        opacity: op,
      }}
    >
      {children}
    </div>
  );
}

function FrameworkOrbit() {
  return (
    <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-[hsl(var(--surface-alt))] sm:h-48">
      <Icons.logo className="z-10 h-8 w-8 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 p-1.5 shadow-lg sm:h-10 sm:w-10 sm:p-2" />
      {frameworkItems.map((item, i) => (
        <OrbitItem key={item.key} index={i} total={frameworkItems.length} duration={35}>
          {item.icon}
        </OrbitItem>
      ))}
    </div>
  );
}

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl border border-border bg-[hsl(var(--surface-card))] p-4 sm:rounded-[20px] sm:p-5 lg:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function StatsBento() {
  return (
    <section className="border-t border-border py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 1 col mobile → 2 col tablet → 3 col desktop */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {/* Card 1: Stars + Border Trail */}
          <BentoCard className="flex flex-col overflow-visible">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
              Loved by developers worldwide
            </span>
            <div className="mt-3">
              <strong className="font-(family-name:--font-mono) text-2xl font-bold tabular-nums text-foreground sm:text-3xl lg:text-4xl">
                <RemountOnMouseIn>
                  <Ticker
                    value="2,506+"
                    className="font-(family-name:--font-mono) font-bold tabular-nums"
                  />
                </RemountOnMouseIn>
              </strong>
              <p className="mt-1 text-[12px] font-medium text-muted-foreground sm:text-[13px]">
                GitHub stars
              </p>
            </div>
            <div className="mt-2">
              <AvatarList size="sm" className="py-0" items={stargazers} />
            </div>

            <div className="mt-auto pt-4 sm:pt-5">
              <ComponentLinkWrapper link="/docs/text/typing-text" className="block w-full">
                <AnimatedBorderTrail
                  trailColor="hsl(262 83% 58% / 0.5)"
                  trailSize="md"
                  duration="10s"
                  className="w-full rounded-xl"
                  contentClassName="bg-[hsl(var(--surface-alt))] rounded-xl"
                >
                  <div className="overflow-hidden rounded-xl border border-border">
                    {/* Traffic light dots */}
                    <div className="flex gap-1.5 border-b border-border px-3 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                    </div>
                    {/* Code content */}
                    <div className="p-3 font-mono text-[12px] leading-relaxed sm:p-4 sm:text-[13px]">
                      <div>
                        <span className="text-[hsl(var(--accent))]">import</span>
                        <span className="text-foreground"> BorderTrail </span>
                        <span className="text-[hsl(var(--accent))]">from</span>
                        <span className="text-muted-foreground"> &quot;animata&quot;</span>
                      </div>
                      <TypingText
                        text='<BorderTrail color="purple" />'
                        delay={40}
                        repeat
                        waitTime={3000}
                        className="text-foreground"
                      />
                    </div>
                  </div>
                </AnimatedBorderTrail>
              </ComponentLinkWrapper>
            </div>
          </BentoCard>

          {/* Card 2: 158+ Components + Categories */}
          <BentoCard className="flex flex-col">
            <div className="flex-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                Components
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <RemountOnMouseIn>
                  <Counter
                    targetValue={components}
                    direction="up"
                    delay={0}
                    format={Formatter.number}
                    className="font-(family-name:--font-mono) text-5xl font-bold leading-none tabular-nums tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl"
                  />
                </RemountOnMouseIn>
                <span className="font-(family-name:--font-mono) text-2xl font-bold text-muted-foreground sm:text-3xl">
                  +
                </span>
              </div>
              {/* Category marquees */}
              <div
                className="-mx-4 mt-3 mb-2 space-y-0.5 sm:-mx-5 sm:mb-0 lg:-mx-6"
                aria-hidden="true"
              >
                <Marquee
                  pauseOnHover
                  applyMask={false}
                  className="[--duration:50s] [--gap:0.15rem]"
                >
                  {categories.map((cat, i) => (
                    <div
                      key={`fwd-${i}`}
                      className="rounded-full border border-border bg-foreground/5 px-2 py-0.5 text-[10px] font-semibold text-foreground transition-colors sm:px-2.5 sm:py-1 sm:text-[11px]"
                    >
                      {cat.label}
                    </div>
                  ))}
                </Marquee>
                <Marquee
                  reverse
                  pauseOnHover
                  applyMask={false}
                  className="[--duration:55s] [--gap:0.15rem]"
                >
                  {[...categories].reverse().map((cat, i) => (
                    <div
                      key={`rev-${i}`}
                      className="rounded-full border border-border bg-foreground/5 px-2 py-0.5 text-[10px] font-semibold text-foreground transition-colors sm:px-2.5 sm:py-1 sm:text-[11px]"
                    >
                      {cat.label}
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
            <div className="-mx-4 -mb-4 mt-auto flex items-center justify-between border-t border-border bg-foreground/3 px-4 py-3 sm:-mx-5 sm:-mb-5 sm:px-5 sm:py-4 lg:-mx-6 lg:-mb-6 lg:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-[11px]">
                Categories
              </p>
              <span className="font-(family-name:--font-mono) text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
                {categories.length}
              </span>
            </div>
          </BentoCard>

          {/* Card 3: Works everywhere + Orbit */}
          <BentoCard className="flex flex-col  sm:col-span-2 lg:col-span-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
              Works everywhere
            </span>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
              {["Next.js", "Remix", "Vite", "Astro", "Gatsby", "TanStack"].map((fw) => (
                <span
                  key={fw}
                  className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-bold text-foreground sm:px-3 sm:py-1.5 sm:text-[13px]"
                >
                  {fw}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-3 sm:pt-4">
              <FrameworkOrbit />
            </div>

            <div className="mt-3 inline-block self-start rounded-full bg-foreground px-3 py-1 text-[11px] font-bold text-background sm:px-4 sm:py-1.5 sm:text-[12px]">
              MIT Licensed — free forever
            </div>
          </BentoCard>
        </div>

        {/* Built with care — full width */}
        <div className="mt-3 sm:mt-4">
          <BentoCard className="">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              {/* Left — statement */}
              <div>
                <h2 className="font-(family-name:--font-display) text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.1] text-foreground">
                  We did the hard part.
                </h2>
                <p className="mt-1 text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.1] text-muted-foreground font-(family-name:--font-display)">
                  So you don&apos;t have to.
                </p>
              </div>
              {/* Right — numbers */}
              <div className="flex gap-8 sm:gap-10">
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-(family-name:--font-mono) text-3xl font-bold leading-none tabular-nums text-foreground sm:text-4xl">
                      1,100
                    </span>
                    <span className="text-lg text-muted-foreground">+</span>
                  </div>
                  <p className="mt-1 text-[12px] text-muted-foreground sm:text-[13px]">
                    hours of dev
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-(family-name:--font-mono) text-3xl font-bold leading-none tabular-nums text-foreground sm:text-4xl">
                      300
                    </span>
                    <span className="text-lg text-muted-foreground">+</span>
                  </div>
                  <p className="mt-1 text-[12px] text-muted-foreground sm:text-[13px]">
                    hours of research
                  </p>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
