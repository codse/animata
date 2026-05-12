import type { Meta, StoryObj } from "@storybook/react";
import { Gauge } from "lucide-react";

import AnimatedFeatureGrid, { type FeatureGridItem } from "@/animata/section/animated-feature-grid";

const demoItems: FeatureGridItem[] = [
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "55%",
    description: "Developer preference for GitHub Copilot",
    metric: "55%",
    metricCaption: "Stack Overflow 2023 Survey",
    tone: "violet",
  },
];

const meta = {
  title: "Section/Animated Feature Grid",
  component: AnimatedFeatureGrid,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A premium interactive feature grid with cursor-follow spotlight glow, hover lift, and animated border reveal.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AnimatedFeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    eyebrow: "Interactive feature showcase",
    title: "Premium feature cards with cursor spotlight and animated borders",
    description:
      "This demo demonstrates the reusable feature-grid component with independent card motion, hover lift, smooth spotlight tracking, and a touch-friendly fallback.",
    items: demoItems,
    gridClassName: "mx-auto max-w-[280px] justify-items-center gap-6",
  },
};
