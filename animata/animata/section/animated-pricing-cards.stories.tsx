import type { Meta, StoryObj } from "@storybook/react";
import AnimatedPricingCards from "@/animata/section/animated-pricing-cards";

const meta = {
  title: "Section/Animated Pricing Cards",
  component: AnimatedPricingCards,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AnimatedPricingCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <div className="full-content w-full bg-background">
      <AnimatedPricingCards {...args} />
    </div>
  ),
};

export const CustomPlans: Story = {
  args: {
    plans: [
      {
        name: "Hobby",
        price: "$9",
        period: "/month",
        description: "For weekend warriors",
        features: ["1 project", "1GB storage", "Email support"],
        ctaText: "Start Building",
      },
      {
        name: "Business",
        price: "$99",
        period: "/month",
        description: "For growing businesses",
        features: [
          "50 projects",
          "500GB storage",
          "Priority support",
          "Team access",
          "Advanced security",
        ],
        highlighted: true,
        ctaText: "Start 14-Day Trial",
      },
      {
        name: "Custom",
        price: "Let's talk",
        period: "contact us",
        description: "For large organizations",
        features: [
          "Everything in Business",
          "Unlimited projects",
          "Dedicated account manager",
          "Custom SLA",
          "Enterprise security",
        ],
        ctaText: "Schedule Demo",
      },
    ],
  },
  render: (args) => (
    <div className="full-content w-full bg-background">
      <AnimatedPricingCards {...args} />
    </div>
  ),
};
