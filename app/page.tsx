"use client";

import { useTheme } from "next-themes";

import DiagonalLines from "@/animata/background/diagonal-lines";
import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import { Announcement } from "@/components/announcement";
import ComponentLinkWrapper from "@/components/component-link-wrapper";

import Curtain from "./_landing/curtain";
import FAQSection from "./_landing/faq-section";
import FeatureSection from "./_landing/feature-section";
import Hero from "./_landing/hero";
import Thunder from "./_landing/thunder";

export default function IndexPage() {
  const { theme } = useTheme();
  const lineColor = theme === "dark" ? "#ffffff11" : "#444cf710";
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(to right, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: "55px 55px",
      }}
      className="relative bg-background"
    >
      <DiagonalLines color="#dadada" className="absolute -left-20 -top-20 z-10 h-52 w-52 rotate-12">
        <ComponentLinkWrapper link="/docs/background/diagonal-lines">
          <div className="h-52 w-52" />
        </ComponentLinkWrapper>
      </DiagonalLines>
      <div className="container relative flex w-full flex-col gap-8 pb-12 pt-4 md:pb-24 md:pt-8">
        <Announcement />
        <Hero />
        <FeatureSection />
        <FAQSection />
      </div>
      <div className="flex w-full items-center justify-center px-2 pb-12 pt-6 md:pb-36 md:pt-6 lg:pb-44 lg:pt-12">
        <AnimatedGradientText className="from-yellow-500 via-lime-500 to-green-500 text-4xl font-black uppercase md:text-5xl">
          Copy
        </AnimatedGradientText>
        <Thunder />
        <AnimatedGradientText className="from-blue-500 via-violet-500 to-purple-500 text-4xl font-black uppercase md:text-5xl">
          Paste
        </AnimatedGradientText>
      </div>

      <Curtain />
    </div>
  );
}
