"use client";

import Curtain from "./_landing/Curtain";
import FeatureSection from "./_landing/feature-section";
import Hero from "./_landing/hero";

export default function IndexPage() {
  return (
    <>
      <div className="container relative flex w-full flex-col gap-8">
        <Hero />
        <FeatureSection />
      </div>
      <Curtain />
    </>
  );
}
