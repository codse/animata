"use client";

import { useTheme } from "next-themes";

import DiagonalLines from "@/animata/background/diagonal-lines";
import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import { Announcement } from "@/components/announcement";

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
      <DiagonalLines color="#dadada" className="absolute -left-20 -top-20 h-52 w-52 rotate-12">
        <div className="h-52 w-52" />
      </DiagonalLines>
      <div className="container relative flex w-full flex-col gap-8 py-12 md:py-24">
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
