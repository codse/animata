"use client";

import React, { Suspense } from "react";
import { useInView } from "framer-motion";

import SectionOne from "@/app/_landing/section-one";
import { cn } from "@/lib/utils";

import Hero from "./_landing/hero";

const SkeletonSection = React.lazy(() => import("./_landing/skeleton-section"));
const FAQSection = React.lazy(() => import("./_landing/faq-section"));
const CallToActionSection = React.lazy(() => import("./_landing/call-to-action"));
const Testimonials = React.lazy(() => import("./_landing/testimonials"));
const SectionTwo = React.lazy(() => import("./_landing/section-two"));

function LazySection({
  component: Component,
  className,
}: {
  className?: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
}) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(divRef, {
    once: true,
  });

  return (
    <div
      className={cn("min-h-52 w-full", {
        "duration-1000 ease-in-out animate-in fade-in-0 slide-in-from-bottom-24": isInView,
      })}
      ref={divRef}
    >
      <Suspense
        fallback={
          <div
            className={cn(
              "h-full min-h-32 w-full animate-pulse bg-foreground/10 blur-xl",
              className,
            )}
          />
        }
      >
        <Component />
      </Suspense>
    </div>
  );
}

export default function IndexPage() {
  return (
    <div className="relative overflow-x-hidden overflow-y-visible bg-background">
      <Hero />

      <SectionOne />

      <LazySection component={SectionTwo} className="container mx-auto min-h-96" />

      <LazySection component={SkeletonSection} />
      <LazySection component={Testimonials} className="container mx-auto min-h-96" />

      <LazySection component={FAQSection} className="container mx-auto min-h-96" />

      <LazySection component={CallToActionSection} className="container mx-auto min-h-96" />
    </div>
  );
}
