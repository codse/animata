"use client";

import Expandable from "@/animata/carousel/expandable";
import ComponentLinkWrapper from "@/components/component-link-wrapper";

export default function SectionOne() {
  return (
    <section className="pt-[48px] max-md:pt-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-[67px]">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--accent))]">
            194+ components
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(24px,4vw,36px)] leading-tight tracking-[-0.02em] text-foreground">
            Every one is live. Every one is free.
          </h2>
        </div>
        <ComponentLinkWrapper
          link="/docs/carousel/expandable"
          className="block w-full overflow-hidden rounded-2xl"
        >
          <Expandable
            autoPlay
            className="h-[280px] w-full gap-1 sm:h-[400px] md:h-[480px] lg:h-[540px]"
          />
        </ComponentLinkWrapper>
      </div>
    </section>
  );
}
