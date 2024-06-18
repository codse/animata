"use client";

import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import Curtain from "./_landing/curtain";
import FeatureSection from "./_landing/feature-section";
import Hero from "./_landing/hero";
import NewsletterSection from "./_landing/newsletter";
import FAQSection from "./_landing/faq-section";
import Thunder from "./_landing/thunder";

export default function IndexPage() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(#444cf715 1px, transparent 1px), linear-gradient(to right, #444cf715 1px, transparent 1px)",
        backgroundSize: "55px 55px",
      }}
      className="bg-background"
    >
      <div className="container relative flex w-full flex-col gap-8 py-12 md:py-24">
        <Hero />
        <FeatureSection />
        <FAQSection />
        <NewsletterSection />
      </div>
      <div className="flex w-full items-center justify-center">
        <AnimatedGradientText className="from-yellow-500 via-lime-500 to-green-500 text-5xl font-black uppercase">
          Copy
        </AnimatedGradientText>
        <Thunder />
        <AnimatedGradientText className="from-blue-500 via-violet-500 to-purple-500 text-5xl font-black uppercase">
          Paste
        </AnimatedGradientText>
      </div>
      <Curtain />
    </div>
  );
}
