"use client";

import Curtain from "./_landing/curtain";
import FeatureSection from "./_landing/feature-section";
import Hero from "./_landing/hero";
import NewsletterSection from "./_landing/newsletter";

export default function IndexPage() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(#444cf711 1px, transparent 1px), linear-gradient(to right, #444cf711 1px, transparent 1px)",
        backgroundSize: "55px 55px",
      }}
      className="bg-background"
    >
      <div className="container relative flex w-full flex-col gap-8 py-12 md:py-24">
        <Hero />
        <FeatureSection />
        <NewsletterSection />
      </div>
      <Curtain />
    </div>
  );
}
