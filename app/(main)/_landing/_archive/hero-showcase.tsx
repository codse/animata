"use client";

import Expandable from "@/animata/carousel/expandable";
import ComponentLinkWrapper from "@/components/component-link-wrapper";

export default function HeroShowcase() {
  return (
    <ComponentLinkWrapper link="/docs/carousel/expandable" className="block w-full">
      <Expandable className="h-[360px] overflow-hidden rounded-2xl sm:h-[420px]" autoPlay />
    </ComponentLinkWrapper>
  );
}
