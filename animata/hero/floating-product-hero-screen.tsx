"use client";

import type React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export interface FloatingProductHeroCard {
  title: string;
  subtitle: string;
  accent?: string;
  badge?: string;
  height?: number;
}

export interface FloatingProductHeroProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCta?: () => void;
  onSecondaryCta?: () => void;
  theme?: "dark" | "light";
  animationEnabled?: boolean;
  className?: string;
  minHeight?: string;
  navLinks?: Array<{ label: string; href?: string }>;
  logos?: string[];
  cards?: FloatingProductHeroCard[];
  showAllCards?: boolean;
}

const defaultNavLinks = [
  { label: "Features" },
  { label: "Solutions" },
  { label: "Role" },
  { label: "Teams" },
  { label: "Pricing" },
  { label: "Blog" },
  { label: "Careers" },
];

const defaultLogos = ["Google", "Anthropic", "coinbase", "Hg", "oscar", "ARK"];

const defaultCards: FloatingProductHeroCard[] = [
  {
    title: "Newsletter automation",
    subtitle: "Generate layouts, assets, and launch-ready flows from a single prompt.",
    accent: "from-rose-300/50 via-orange-300/30 to-amber-200/10",
    badge: "New",
    height: 214,
  },
  {
    title: "Social graphics",
    subtitle: "Create beautiful campaign graphics without needing a full design stack.",
    accent: "from-sky-300/50 via-cyan-300/20 to-blue-200/10",
    badge: "AI",
    height: 226,
  },
  {
    title: "Speaking coach",
    subtitle: "Practice delivery and get live feedback on clarity, pacing, and confidence.",
    accent: "from-violet-300/50 via-fuchsia-300/20 to-indigo-200/10",
    badge: "Pro",
    height: 206,
  },
  {
    title: "Workflow builder",
    subtitle: "Sketch a product, automate the boring parts, then ship with confidence.",
    accent: "from-emerald-300/40 via-teal-300/20 to-cyan-200/10",
    badge: "Beta",
    height: 232,
  },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-slate-50/10 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="grid grid-cols-2 gap-0.5">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-orange-500" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-orange-400" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-orange-300" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-orange-600" />
        </div>
      </div>
      <span className="text-xl font-semibold tracking-[-0.04em] text-white">replit</span>
    </div>
  );
}

function NavLinkRow({ links }: Readonly<{ links: Array<{ label: string; href?: string }> }>) {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-white/75 md:flex">
      {links.map((link) => (
        <a key={link.label} href={link.href ?? "#"} className="transition-colors hover:text-white">
          {link.label}
        </a>
      ))}
    </nav>
  );
}

function TopActionButton({
  children,
  variant = "ghost",
  onClick,
  reduceMotion,
}: Readonly<{
  children: React.ReactNode;
  variant?: "ghost" | "solid";
  onClick?: () => void;
  reduceMotion: boolean;
}>) {
  const isSolid = variant === "solid";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { y: -1, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        isSolid
          ? "bg-white/10 text-white hover:bg-white/15"
          : "text-white/80 hover:text-white",
      )}
    >
      {children}
    </motion.button>
  );
}

function HeroCtaButton({
  children,
  variant = "primary",
  onClick,
  reduceMotion,
}: Readonly<{
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  reduceMotion: boolean;
}>) {
  const primary = variant === "primary";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={cn(
        "inline-flex h-14 items-center justify-center rounded-full px-8 text-base font-medium transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        primary
          ? "bg-white text-slate-950 shadow-[0_20px_40px_rgba(255,255,255,0.25)] hover:shadow-[0_24px_44px_rgba(255,255,255,0.3)]"
          : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
      )}
    >
      {children}
    </motion.button>
  );
}

function PreviewCard({
  card,
  index,
  reduceMotion,
  animationEnabled,
}: Readonly<{
  card: FloatingProductHeroCard;
  index: number;
  reduceMotion: boolean;
  animationEnabled: boolean;
}>) {
  const isLeft = index < 2;
  const isTop = index % 2 === 0;

  return (
    <motion.div
      initial={animationEnabled && !reduceMotion ? { opacity: 0, scale: 0.92, y: 14 } : false}
      animate={animationEnabled && !reduceMotion ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.08, ease: "easeOut" }}
      className={cn(
        "absolute w-[185px] overflow-hidden rounded-[18px] border border-white/25 bg-white/95 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm",
        isLeft ? "-left-8" : "-right-8",
        isTop ? "top-0" : "bottom-0",
      )}
      style={{ height: card.height ?? 210, zIndex: 20 - index }}
    >
      <div className={cn("h-full bg-linear-to-br p-3", card.accent ?? "from-white to-slate-100") }>
        <div className="flex items-start justify-between gap-2">
          <div className="rounded-full border border-black/5 bg-black/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-700">
            {card.badge ?? "Preview"}
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black/5 bg-white/70 text-[10px] font-semibold text-slate-700">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="mt-3 rounded-[14px] border border-black/5 bg-white/80 p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <div className="h-2 w-2 rounded-full bg-sky-500" />
            <div className="h-2 w-2 rounded-full bg-slate-300" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-20 rounded-full bg-slate-200" />
            <div className="h-2 w-full rounded-full bg-slate-200" />
            <div className="h-2 w-4/5 rounded-full bg-slate-200" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-16 rounded-xl bg-slate-100" />
              <div className="h-16 rounded-xl bg-slate-100" />
            </div>
          </div>
        </div>

        <p className="mt-3 text-[11px] leading-4 text-slate-800">{card.subtitle}</p>
      </div>
    </motion.div>
  );
}

function PromptPanel({
  reduceMotion,
  animationEnabled,
}: Readonly<{
  reduceMotion: boolean;
  animationEnabled: boolean;
}>) {
  const lineVariants = animationEnabled && !reduceMotion ? { opacity: 1, y: 0 } : undefined;

  return (
    <motion.div
      initial={animationEnabled ? { opacity: 0, y: 24, scale: 0.985 } : false}
      animate={animationEnabled ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[700px] rounded-[24px] border border-white/10 bg-[#20272d]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 text-xs text-white/70">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Get suggestions</span>
        <span className="rounded-full border border-white/10 bg-transparent px-3 py-1 text-white/45">
          Write a prompt
        </span>
      </div>

      <div className="mt-5 space-y-2 text-left text-[24px] leading-[1.32] tracking-[-0.04em] text-white sm:text-[28px] md:text-[32px]">
        <motion.div initial={false} animate={lineVariants} className="text-white/50">
          Make me <span className="border-b-2 border-sky-400 text-white">an automation</span>
        </motion.div>
        <motion.div initial={false} animate={lineVariants} className="text-white/50">
          for <span className="border-b-2 border-emerald-400 text-white">newsletter publishers</span>
        </motion.div>
        <motion.div initial={false} animate={lineVariants} className="text-white/50">
          that helps <span className="border-b-2 border-violet-400 text-white">create beautiful graphics for</span>
        </motion.div>
        <motion.div initial={false} animate={lineVariants} className="text-white">
          social media without design skills
        </motion.div>
      </div>

      <div className="mt-4 max-w-[420px] text-sm text-white/75">
        <span className="border-b-2 border-amber-300 pb-1">Include A/B testing capabilities</span>
      </div>

      <div className="mt-6 flex justify-center">
        <HeroCtaButton variant="primary" reduceMotion={!!reduceMotion}>
          Start building with AI
        </HeroCtaButton>
      </div>
    </motion.div>
  );
}

function LogoStrip({ logos }: Readonly<{ logos: string[] }>) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/80 sm:gap-x-12">
      {logos.map((logo) => (
        <span key={logo} className="text-[15px] font-medium tracking-[-0.02em] text-white/55">
          {logo}
        </span>
      ))}
    </div>
  );
}

function TopBar({
  navLinks,
  reduceMotion,
  onPrimaryCta,
}: Readonly<{
  navLinks: Array<{ label: string; href?: string }>;
  reduceMotion: boolean;
  onPrimaryCta?: () => void;
}>) {
  return (
    <header className="flex items-center justify-between gap-4 text-white">
      <div className="flex items-center gap-8">
        <BrandMark />
        <NavLinkRow links={navLinks} />
      </div>

      <div className="flex items-center gap-1">
        <TopActionButton reduceMotion={reduceMotion}>Contact sales</TopActionButton>
        <TopActionButton reduceMotion={reduceMotion}>Log in</TopActionButton>
        <TopActionButton reduceMotion={reduceMotion} variant="solid" onClick={onPrimaryCta}>
          Sign up
        </TopActionButton>
      </div>
    </header>
  );
}

export function FloatingProductHero({
  title = "Turn your ideas into apps",
  subtitle = "What will you create? The possibilities are endless.",
  primaryCtaText = "Start building with AI",
  secondaryCtaText = "Write a prompt",
  onPrimaryCta,
  onSecondaryCta,
  theme = "dark",
  animationEnabled = true,
  className,
  minHeight = "100vh",
  navLinks = defaultNavLinks,
  logos = defaultLogos,
  cards = defaultCards,
  showAllCards = true,
}: Readonly<FloatingProductHeroProps>) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animationEnabled && !reduceMotion;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.15 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.15 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!shouldAnimate) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 20;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
    mouseX.set(x);
    mouseY.set(y);
  };

  const resetPointer = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      aria-label="Floating product hero"
      className={cn(
        "relative w-full overflow-hidden",
        theme === "dark" ? "bg-[#0b1117] text-white" : "bg-white text-slate-950",
        className,
      )}
      style={{ minHeight }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(55,65,81,0.32),transparent_30%),radial-gradient(circle_at_50%_34%,rgba(15,23,42,0.76),transparent_52%),linear-gradient(to_bottom,#0b1117,#0b1117)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <TopBar navLinks={navLinks} reduceMotion={!!reduceMotion} onPrimaryCta={onPrimaryCta} />

        <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center pt-10">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-balance text-[clamp(2.7rem,6vw,5.2rem)] font-semibold tracking-[-0.06em] text-white">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-white/65 sm:text-xl">
              {subtitle}
            </p>
          </motion.div>

          <div
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            className="relative mt-10 w-full px-4 sm:px-6 lg:px-0"
          >
            <motion.div
              style={shouldAnimate ? { x: springX, y: springY } : undefined}
              className="relative mx-auto w-full max-w-[780px]"
            >
              <PromptPanel reduceMotion={!!reduceMotion} animationEnabled={animationEnabled} />

              {showAllCards ? (
                <div className="pointer-events-none absolute inset-0 hidden md:block">
                  {cards.map((card, index) => (
                    <PreviewCard
                      key={card.title}
                      card={card}
                      index={index}
                      reduceMotion={!!reduceMotion}
                      animationEnabled={animationEnabled}
                    />
                  ))}
                </div>
              ) : null}
            </motion.div>
          </div>

          <LogoStrip logos={logos} />

          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <HeroCtaButton variant="primary" reduceMotion={!!reduceMotion} onClick={onPrimaryCta}>
              {primaryCtaText}
            </HeroCtaButton>
            <HeroCtaButton variant="secondary" reduceMotion={!!reduceMotion} onClick={onSecondaryCta}>
              {secondaryCtaText}
            </HeroCtaButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FloatingProductHero;
