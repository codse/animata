"use client";

import { motion } from "motion/react";
import type React from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Floating Card Component
 * Reusable card with glassmorphism effect and optional content
 */
interface FloatingCardProps {
  className?: string;
  delay?: number;
  depth?: number;
  rotation?: number;
  position: { top?: string; left?: string; right?: string; bottom?: string; transform?: string };
  children?: React.ReactNode;
}

function FloatingCard({
  className,
  delay = 0,
  depth = 1,
  rotation = 0,
  position,
  children,
}: FloatingCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [_isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to -1 to 1 range
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    setMousePosition({
      x: normalizedX * depth * 10,
      y: normalizedY * depth * 10,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "absolute will-change-transform",
        "rounded-2xl backdrop-blur-xl",
        "bg-white/10 border border-white/20",
        "shadow-2xl shadow-black/20",
        "hover:bg-white/15 hover:border-white/30",
        "transition-colors duration-300",
        className,
      )}
      style={position}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: prefersReducedMotion ? 0 : delay,
        duration: 0.6,
        ease: "easeOut",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => !prefersReducedMotion && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating animation with parallax */}
      <motion.div
        className="w-full h-full"
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [-15 * depth, 15 * depth, -15 * depth],
                rotate: [rotation - 1, rotation + 1, rotation - 1],
              }
        }
        transition={{
          duration: 6 + depth * 2,
          repeat: Infinity,
          ease: "easeInOut",
          type: "tween",
        }}
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Analytics Card - Chart visualization
 */
function AnalyticsCard() {
  return (
    <FloatingCard
      className="w-72 h-64 p-6 shadow-lg"
      delay={0.2}
      depth={1.2}
      rotation={-2}
      position={{ top: "10%", left: "5%" }}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white/90 mb-4">Analytics</h3>
          <p className="text-xs text-white/60">Last 7 days</p>
        </div>

        {/* Simple chart bars */}
        <div className="flex items-end gap-2 h-24">
          {[40, 60, 45, 75, 55, 80, 65].map((height, i) => (
            <motion.div
              key={`chart-bar-${i}`}
              className="flex-1 bg-gradient-to-t from-cyan-500/80 to-cyan-300/40 rounded-t-lg"
              style={{ height: `${height}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
            />
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <span className="text-xs text-white/60">+24%</span>
          <span className="text-xs text-cyan-400/80">This week</span>
        </div>
      </div>
    </FloatingCard>
  );
}

/**
 * Notification Card
 */
function NotificationCard() {
  return (
    <FloatingCard
      className="w-64 h-32 p-5"
      delay={0.4}
      depth={1.5}
      rotation={1}
      position={{ top: "35%", right: "8%" }}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-white/90">System Online</span>
        </div>
        <p className="text-xs text-white/60">All services operational</p>
        <p className="text-xs text-white/40">Updated 2 minutes ago</p>
      </div>
    </FloatingCard>
  );
}

/**
 * Code Editor Card
 */
function CodeEditorCard() {
  return (
    <FloatingCard
      className="w-80 h-48 p-4"
      delay={0.6}
      depth={0.9}
      rotation={-1.5}
      position={{ bottom: "15%", left: "8%" }}
    >
      <div className="space-y-2 font-mono text-xs">
        <div className="flex gap-2">
          <span className="text-purple-400">const</span>
          <span className="text-white">result</span>
          <span className="text-white/50">=</span>
          <span className="text-green-400">process</span>
        </div>
        <div className="flex gap-2 pl-4">
          <span className="text-blue-400">await</span>
          <span className="text-white">data</span>
          <span className="text-white/50">.</span>
          <span className="text-yellow-400">transform</span>
        </div>
        <div className="flex gap-2 pl-8">
          <span className="text-white/50">↳ Performance</span>
          <span className="text-green-400/80">+47%</span>
        </div>
      </div>
    </FloatingCard>
  );
}

/**
 * Dashboard Widget Card
 */
function DashboardWidgetCard() {
  return (
    <FloatingCard
      className="w-72 h-40 p-5"
      delay={0.3}
      depth={1.3}
      rotation={0.5}
      position={{ bottom: "25%", right: "12%" }}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-xs text-white/60">Requests</p>
            <p className="text-lg font-bold text-cyan-400">24.5K</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-xs text-white/60">Users</p>
            <p className="text-lg font-bold text-purple-400">8.3K</p>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

/**
 * Stats/Metrics Card
 */
function StatsCard() {
  return (
    <FloatingCard
      className="w-64 h-36 p-5"
      delay={0.5}
      depth={1.1}
      rotation={2}
      position={{ top: "60%", left: "50%", transform: "translateX(-50%)" }}
    >
      <div className="space-y-4">
        <div>
          <p className="text-xs text-white/60 mb-2">Performance Score</p>
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: "95%" }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
          <p className="text-xs text-cyan-400/80 mt-2">95/100</p>
        </div>
      </div>
    </FloatingCard>
  );
}

/**
 * Background Layer Component
 * Renders all floating cards in background
 */
interface BackgroundLayerProps {
  cards?: FloatingCardProps[];
  showAllCards?: boolean;
}

function BackgroundLayer({ showAllCards = true }: BackgroundLayerProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Radial gradient accent */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)",
        }}
      />

      {/* Grid pattern (optional subtle background) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating cards */}
      {showAllCards && (
        <>
          <AnalyticsCard />
          <NotificationCard />
          <CodeEditorCard />
          <DashboardWidgetCard />
          <StatsCard />
        </>
      )}
    </div>
  );
}

/**
 * Hero Content Component
 * Centered foreground content
 */
interface HeroContentProps {
  title: string;
  subtitle: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCta?: () => void;
  onSecondaryCta?: () => void;
}

function HeroContent({
  title,
  subtitle,
  primaryCtaText = "Get Started",
  secondaryCtaText = "Learn More",
  onPrimaryCta,
  onSecondaryCta,
}: HeroContentProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Headline */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <span className="bg-gradient-to-r from-slate-100 via-cyan-100 to-blue-100 bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {subtitle}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {/* Primary CTA Button */}
        <motion.button
          className={cn(
            "relative px-8 py-3 rounded-lg font-semibold",
            "bg-gradient-to-r from-cyan-500 to-blue-600",
            "text-white shadow-lg",
            "overflow-hidden group",
            "hover:shadow-2xl hover:shadow-cyan-500/50",
            "transition-all duration-300",
          )}
          onClick={onPrimaryCta}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

          <span className="relative flex items-center gap-2">
            {primaryCtaText}
            <motion.span
              animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
        </motion.button>

        {/* Secondary CTA Button */}
        <motion.button
          className={cn(
            "px-8 py-3 rounded-lg font-semibold",
            "border border-slate-400/40 text-slate-200",
            "hover:bg-slate-800/50 hover:border-slate-300/60",
            "transition-all duration-300",
          )}
          onClick={onSecondaryCta}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          {secondaryCtaText}
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-slate-400">Scroll to explore</p>
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Scroll to explore</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Main Floating Product Hero Section Component
 */
export interface FloatingProductHeroProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCta?: () => void;
  onSecondaryCta?: () => void;
  showAllCards?: boolean;
  theme?: "dark" | "light";
  animationEnabled?: boolean;
  className?: string;
  minHeight?: string;
}

export function FloatingProductHero({
  title = "Build the Future Faster",
  subtitle = "Experience cutting-edge design with smooth animations and premium aesthetics. Perfect for modern SaaS and AI landing pages.",
  primaryCtaText = "Get Started Free",
  secondaryCtaText = "View Demo",
  onPrimaryCta,
  onSecondaryCta,
  showAllCards = true,
  theme = "dark",
  animationEnabled = true,
  className,
  minHeight = "100vh",
}: FloatingProductHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        theme === "dark" ? "bg-slate-950" : "bg-white",
        className,
      )}
      style={{ minHeight }}
    >
      {/* Background layer with floating cards and gradients */}
      <BackgroundLayer showAllCards={showAllCards && animationEnabled} />

      {/* Foreground content */}
      <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <HeroContent
            title={title}
            subtitle={subtitle}
            primaryCtaText={primaryCtaText}
            secondaryCtaText={secondaryCtaText}
            onPrimaryCta={onPrimaryCta}
            onSecondaryCta={onSecondaryCta}
          />
        </div>
      </div>
    </section>
  );
}

export default FloatingProductHero;
