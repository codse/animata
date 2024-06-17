"use client";

import Curtain from "./_landing/curtain";
import FeatureSection from "./_landing/feature-section";
import Hero from "./_landing/hero";
import NewsletterSection from "./_landing/newsletter";

export default function IndexPage() {
  return (
    <>
      <div className="relative flex w-full flex-col gap-8">
        <Hero />
        <FeatureSection />
        <NewsletterSection />
      </div>
      <Curtain />
    </>
  );
}
