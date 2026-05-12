"use client";

import { Gauge } from "lucide-react";

import { AnimatedFeatureGrid } from "./animated-feature-grid";
import type { FeatureGridItem } from "./feature-card";

// Show a single metric card for the publishable preview
const demoItems: FeatureGridItem[] = [
  {
    icon: <Gauge className="size-5" />,
    title: "55%",
    description: "Developer preference for GitHub Copilot",
    metric: "55%",
    metricCaption: "Stack Overflow 2023 Survey",
    tone: "violet",
  },
];

export default function AnimatedFeatureGridDemo() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white sm:p-10">
      <div className="mx-auto max-w-7xl">
        <AnimatedFeatureGrid
          eyebrow="Interactive feature showcase"
          title="55%"
          description="Developer preference for GitHub Copilot."
          items={demoItems}
          gridClassName="mx-auto max-w-[280px] justify-items-center gap-6"
        />
      </div>
    </div>
  );
}
