import type { Meta, StoryObj } from "@storybook/react";
import { Brain, Database, Lock, Rocket } from "lucide-react";
import FeatureGridHoverReveal, {
  type FeatureGridProps,
} from "@/animata/section/feature-grid-hover-reveal";

const meta = {
  title: "Section/Feature Grid Hover Reveal",
  component: FeatureGridHoverReveal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "select",
      options: [2, 3],
      description: "Number of columns in the grid",
    },
    title: {
      control: "text",
      description: "Section heading",
    },
    subtitle: {
      control: "text",
      description: "Section subheading",
    },
  },
} satisfies Meta<typeof FeatureGridHoverReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (args: FeatureGridProps) => (
    <div className="full-content w-full bg-background">
      <FeatureGridHoverReveal {...args} />
    </div>
  ),
};

export const TwoColumn: Story = {
  args: {
    columns: 2,
    title: "Built for scale",
    subtitle: "Four core capabilities that grow with your team.",
    features: [
      {
        icon: <Rocket className="h-6 w-6" />,
        title: "Instant Deploy",
        description:
          "Push to production in seconds with zero-downtime deployments and automatic rollbacks.",
      },
      {
        icon: <Lock className="h-6 w-6" />,
        title: "Zero-Trust Security",
        description: "Every request is authenticated and authorised. No implicit trust, ever.",
      },
      {
        icon: <Database className="h-6 w-6" />,
        title: "Managed Database",
        description:
          "Fully managed Postgres with automatic backups, point-in-time recovery, and read replicas.",
      },
      {
        icon: <Brain className="h-6 w-6" />,
        title: "AI-Powered Insights",
        description:
          "Surface anomalies and opportunities automatically using built-in machine learning.",
      },
    ],
  },
  render: (args: FeatureGridProps) => (
    <div className="full-content w-full bg-background">
      <FeatureGridHoverReveal {...args} />
    </div>
  ),
};

export const CustomContent: Story = {
  args: {
    columns: 3,
    title: "Why teams choose us",
    subtitle: "Purpose-built features that eliminate complexity and ship value faster.",
    features: [
      {
        icon: <Rocket className="h-6 w-6" />,
        title: "One-Click Setup",
        description:
          "Go from sign-up to production in under five minutes with our guided onboarding.",
      },
      {
        icon: <Brain className="h-6 w-6" />,
        title: "Smart Automation",
        description:
          "Let AI handle the repetitive work so your team can focus on what actually matters.",
      },
      {
        icon: <Database className="h-6 w-6" />,
        title: "Reliable Storage",
        description:
          "99.999% uptime SLA with geo-redundant storage across three availability zones.",
      },
    ],
  },
  render: (args: FeatureGridProps) => (
    <div className="full-content w-full bg-background">
      <FeatureGridHoverReveal {...args} />
    </div>
  ),
};
