"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

import ApertureReveal from "@/animata/scroll/aperture-reveal";

import { ApertureRevealDemo001Notes } from "./aperture-reveal-demo-001-notes";

const NIGHT = {
  "--aperture-ground": "#0d0e12",
  "--aperture-ink": "#e9e7e1",
  "--aperture-opening": "#1d1f26",
} as CSSProperties;

const route = [
  { value: "6.2 km", label: "Trailhead to lookout" },
  { value: "840 m", label: "Climbing, mostly in the first hour" },
  { value: "2 h 40", label: "At an easy, talking pace" },
];

export default function ApertureRevealDemo001() {
  return (
    <>
      <div className="bg-[#0d0e12]">
        <ApertureReveal length={2.6} style={NIGHT}>
          <ApertureReveal.Media>
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=80"
              alt="Snow-covered mountain under a clear night sky full of stars"
              decoding="async"
            />
          </ApertureReveal.Media>
          <ApertureReveal.Headline as="h1">
            <ApertureReveal.Lead>Start in the dark,</ApertureReveal.Lead>
            <ApertureReveal.Opening />
            <ApertureReveal.Trail>under the ridge</ApertureReveal.Trail>
          </ApertureReveal.Headline>
          <ApertureReveal.Caption className="pb-[calc(var(--demo-chrome-reserve,5rem)+1.5rem)]">
            <ApertureReveal.Text>
              Headlamps on at ten past four. The first hour climbs through pine on a wide path, so
              you can walk it half awake while the stars are still out.
            </ApertureReveal.Text>
          </ApertureReveal.Caption>
          <ApertureReveal.Hint className="bottom-[calc(var(--demo-chrome-reserve,5rem)+0.5rem)]">
            Scroll
          </ApertureReveal.Hint>
        </ApertureReveal>

        <section
          aria-labelledby="route-title"
          className="mx-auto w-full max-w-6xl px-6 py-28 text-[#e9e7e1] sm:px-10 md:py-40"
        >
          <h2
            id="route-title"
            className="max-w-[18ch] text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
          >
            One route, walked slowly enough to watch the light arrive.
          </h2>
          <dl className="mt-16 grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {route.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 py-6 max-sm:first:pt-0 max-sm:last:pb-0 sm:px-8 sm:py-1 sm:first:pl-0"
              >
                <dt className="order-2 text-sm leading-snug text-[#e9e7e1]/60">{item.label}</dt>
                <dd className="order-1 m-0 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <ApertureReveal length={3}>
        <ApertureReveal.Media>
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80"
            alt="Snow-capped mountains above a forested valley and a braided river"
            decoding="async"
          />
        </ApertureReveal.Media>
        <ApertureReveal.Headline>
          <ApertureReveal.Lead>Leave early,</ApertureReveal.Lead>
          <ApertureReveal.Opening />
          <ApertureReveal.Trail>arrive at first light</ApertureReveal.Trail>
        </ApertureReveal.Headline>
        <ApertureReveal.Caption className="pb-[calc(var(--demo-chrome-reserve,5rem)+1.5rem)]">
          <ApertureReveal.Text>
            Reach the lookout as the valley fills with light, stop for breakfast at the hut, and be
            back at the trailhead before the afternoon heat.
          </ApertureReveal.Text>
          <ApertureReveal.Action>
            <Link href="/docs/scroll/aperture-reveal">Build this section</Link>
          </ApertureReveal.Action>
        </ApertureReveal.Caption>
      </ApertureReveal>

      <footer className="flex min-h-[min(24svh,200px)] items-center justify-center bg-[#ebe9e4] px-6 pt-10 pb-[var(--demo-chrome-reserve,5rem)] text-sm text-[#141413]/50">
        End of route
      </footer>

      <ApertureRevealDemo001Notes />
    </>
  );
}
