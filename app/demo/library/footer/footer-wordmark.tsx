"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { IBM_Plex_Sans, Syne } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

import BoidsEcosystem from "@/animata/background/boids-ecosystem";
import SiblingFocusNav from "@/animata/container/sibling-focus-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { FooterWordmarkNotes } from "./footer-wordmark-notes";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const wordmarkFont = Syne({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

/** 60 · 30 · 10 — one blue family; white is the accent plane */
const C = {
  navy: "oklch(0.11 0.038 258)",
  navyHex: "#070d18",
  navyMid: "oklch(0.17 0.055 260)",
  blue: "oklch(0.42 0.14 262)",
  blueBright: "oklch(0.52 0.16 264)",
} as const;

const BOID_PALETTE = [
  "oklch(0.92 0.02 265)",
  "oklch(0.78 0.05 265)",
  "oklch(0.68 0.08 262)",
  "oklch(0.58 0.1 260)",
];

const LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/changelog", label: "Changelog" },
  { href: siteConfig.links.github, label: "GitHub", external: true },
  { href: "#", label: "Terms" },
  { href: "#", label: "Privacy" },
] as const;

const WORDMARK_VIEWBOX = { w: 700, h: 108, baseline: 92 } as const;

function FooterWordmark({ fontFamily }: { fontFamily: string }) {
  return (
    <svg
      viewBox={`0 0 ${WORDMARK_VIEWBOX.w} ${WORDMARK_VIEWBOX.h}`}
      width="100%"
      role="img"
      aria-label="animata"
      preserveAspectRatio="xMinYMax meet"
      className="block w-full max-w-none text-white"
    >
      <title>animata</title>
      <text
        x="0"
        y={WORDMARK_VIEWBOX.baseline}
        fill="currentColor"
        fontFamily={fontFamily}
        fontSize="96"
        fontWeight="800"
        letterSpacing="-1.5"
        textLength={String(WORDMARK_VIEWBOX.w)}
        lengthAdjust="spacing"
      >
        animata
      </text>
    </svg>
  );
}

export default function FooterWordmarkDemo() {
  const [count, setCount] = useState(120);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setCount(mq.matches ? 48 : 120);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <div
        className={cn(sans.variable, sans.className, "flex min-h-svh w-full flex-col text-white")}
        style={{ background: C.navy }}
      >
        <div
          aria-hidden
          className="mx-auto flex w-full max-w-6xl flex-1 px-6 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 lg:px-10"
        />

        <footer className="relative shrink-0">
          <div className="relative min-h-[min(62svh,32rem)] overflow-hidden sm:min-h-[min(70svh,34rem)]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${C.navy} 0%, ${C.navyMid} 42%, ${C.blue} 78%, ${C.blueBright} 100%)`,
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[58%]"
              style={{
                background:
                  "radial-gradient(ellipse 90% 70% at 50% 100%, oklch(0.72 0.12 264 / 0.45), transparent 68%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
              }}
            />

            <BoidsEcosystem
              count={count}
              background={C.navyHex}
              palette={BOID_PALETTE}
              agentShape="dot"
              cursorRadius={110}
              className="absolute inset-0 h-full w-full rounded-none opacity-22"
            />

            <div className="relative z-10 flex h-full min-h-[inherit] flex-col px-6 pb-[calc(var(--demo-chrome-reserve,5rem)+0.5rem)] pt-8 sm:px-8 sm:pt-10 lg:px-10">
              <div className="@container/footer mx-auto flex w-full max-w-6xl flex-1 flex-col">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                  <SiblingFocusNav
                    aria-label="Footer"
                    className="grid grid-cols-1 gap-y-0.5 min-[26rem]:grid-cols-2 min-[26rem]:gap-x-4 lg:flex lg:flex-wrap lg:gap-x-6 lg:gap-y-2"
                  >
                    {LINKS.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={"external" in link && link.external ? "_blank" : undefined}
                        rel={"external" in link && link.external ? "noreferrer" : undefined}
                        className={cn(
                          SiblingFocusNav.linkClassName,
                          "gap-1.5 rounded-sm text-[13px] font-medium tracking-[0.015em] text-white/92 focus-visible:outline-white/70 focus-visible:ring-offset-0 lg:min-h-0 lg:text-[12px] lg:tracking-[0.02em]",
                        )}
                      >
                        <ArrowRight
                          aria-hidden
                          weight="light"
                          className="relative top-px size-[1em] shrink-0 text-white/55"
                        />
                        <span className="leading-none">{link.label}</span>
                      </Link>
                    ))}
                  </SiblingFocusNav>
                  <p className="font-mono text-[11px] leading-relaxed tracking-[0.04em] text-white/78 lg:shrink-0 lg:text-right lg:text-[10px] lg:tracking-[0.06em] lg:text-white/72 lg:whitespace-nowrap">
                    © {new Date().getFullYear()} {siteConfig.name}, Inc. All rights reserved.
                  </p>
                </div>

                <div className="mt-auto w-full pt-8 sm:pt-12">
                  <FooterWordmark fontFamily={wordmarkFont.style.fontFamily} />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <FooterWordmarkNotes />
    </>
  );
}
