import type { Meta, StoryObj } from "@storybook/react";
import { Gauge } from "lucide-react";

import { FeatureCard } from "@/animata/section/animated-feature-grid";
import type { FeatureGridItem } from "@/animata/section/animated-feature-grid";

const item: FeatureGridItem = {
  icon: <Gauge className="size-5" />,
  title: "Developer preference for GitHub Copilot",
  description: "Stack Overflow 2023 Survey",
  metric: "55%",
  metricCaption: "Stack Overflow 2023 Survey",
  tone: "violet",
};

const meta = {
  title: "Component/Feature Card - Metric",
  component: FeatureCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Metric: Story = {
  render: () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-10">
      <div className="w-[280px]">
        <FeatureCard item={item} index={0} />
      </div>
    </div>
  ),
};
