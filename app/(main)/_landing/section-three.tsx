"use client";

import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import GlitchText from "@/animata/text/glitch-text";
import SplitText from "@/animata/text/split-text";
import ComponentLinkWrapper from "@/components/component-link-wrapper";
import { cn } from "@/lib/utils";

function DarkCard({
  children,
  href,
  label,
  className,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <ComponentLinkWrapper
      link={href}
      className={cn(
        "block w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5",
        className,
      )}
    >
      <div className="flex min-h-[180px] items-center justify-center p-6">{children}</div>
      <div className="flex items-center justify-between border-t border-foreground/10 px-5 py-3">
        <span className="text-sm font-semibold text-primary-foreground/80">{label}</span>
        <span className="text-xs font-medium text-[hsl(var(--accent))]">View →</span>
      </div>
    </ComponentLinkWrapper>
  );
}

export default function SectionThree() {
  return (
    <section className="bg-[hsl(var(--surface-dark))] pb-0 pt-[80px] max-md:pt-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-[67px]">
        {/* GlitchText — the star. Full-width, un-carded. */}
        <ComponentLinkWrapper
          link="/docs/text/glitch-text"
          className="mx-auto mb-10 block max-w-2xl overflow-hidden rounded-2xl"
        >
          <GlitchText text="animata" starCount={100} />
        </ComponentLinkWrapper>

        {/* Supporting cast — in cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <DarkCard href="/docs/text/animated-gradient-text" label="Gradient Text">
            <AnimatedGradientText className="text-4xl font-black uppercase md:text-5xl lg:text-7xl">
              HELLO
            </AnimatedGradientText>
          </DarkCard>

          <DarkCard href="/docs/text/split-text" label="Split Text">
            <SplitText text="HOVER" />
          </DarkCard>
        </div>
      </div>
    </section>
  );
}
