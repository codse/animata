import type { Meta, StoryObj } from "@storybook/react";

import PricingComparison from "./pricing-comparison";

const meta = {
  title: "Section/Pricing Comparison",
  component: PricingComparison,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PricingComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

const basePlans = [
  {
    id: "starter",
    name: "Starter",
    description: "For side projects and indie launches.",
    monthlyPrice: 19,
    yearlyPrice: 190,
    ctaLabel: "Start free",
  },
  {
    id: "growth",
    name: "Growth",
    description: "For scaling teams shipping quickly.",
    monthlyPrice: 49,
    yearlyPrice: 470,
    badge: "Most popular",
    highlighted: true,
    ctaLabel: "Choose growth",
  },
  {
    id: "scale",
    name: "Scale",
    description: "For products with advanced ops needs.",
    monthlyPrice: 99,
    yearlyPrice: 950,
    ctaLabel: "Talk to sales",
  },
];

const baseFeatures = [
  {
    feature: "Projects",
    values: {
      starter: "3",
      growth: "20",
      scale: "Unlimited",
    },
  },
  {
    feature: "Team members",
    values: {
      starter: "2",
      growth: "15",
      scale: "Unlimited",
    },
  },
  {
    feature: "Advanced analytics",
    values: {
      starter: false,
      growth: true,
      scale: true,
    },
  },
  {
    feature: "Priority support",
    description: "Guaranteed response times from support engineers.",
    values: {
      starter: false,
      growth: "Business hours",
      scale: "24/7",
    },
  },
  {
    feature: "SLA",
    values: {
      starter: false,
      growth: "99.9%",
      scale: "99.99%",
    },
  },
];

export const Primary: Story = {
  args: {
    plans: basePlans,
    features: baseFeatures,
  },
};

export const FourPlans: Story = {
  args: {
    plans: [
      ...basePlans,
      {
        id: "enterprise",
        name: "Enterprise",
        description: "For organizations with strict security and compliance.",
        monthlyPrice: "Custom",
        yearlyPrice: "Custom",
        ctaLabel: "Contact enterprise sales",
      },
    ],
    features: [
      ...baseFeatures,
      {
        feature: "Single sign-on",
        values: {
          starter: false,
          growth: false,
          scale: true,
          enterprise: true,
        },
      },
      {
        feature: "Account manager",
        values: {
          starter: false,
          growth: false,
          scale: false,
          enterprise: true,
        },
      },
    ],
    defaultCycle: "yearly",
    defaultPlanId: "growth",
  },
};
