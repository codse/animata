import type { Meta, StoryObj } from "@storybook/react";
import { FloatingProductHero } from "./floating-product-hero";

const meta = {
  title: "Hero/Floating Product Hero",
  component: FloatingProductHero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A production-ready floating product hero section with glassmorphic cards, smooth animations, and parallax effects. Inspired by premium SaaS/AI landing pages (Stripe, Linear, Vercel, Framer).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Main headline text",
    },
    subtitle: {
      control: "text",
      description: "Supporting paragraph text",
    },
    primaryCtaText: {
      control: "text",
      description: "Primary call-to-action button text",
    },
    secondaryCtaText: {
      control: "text",
      description: "Secondary call-to-action button text",
    },
    showAllCards: {
      control: "boolean",
      description: "Show/hide floating background cards",
    },
    theme: {
      control: "select",
      options: ["dark", "light"],
      description: "Color theme",
    },
    animationEnabled: {
      control: "boolean",
      description: "Enable/disable animations",
    },
    minHeight: {
      control: "text",
      description: "Minimum height of the hero section",
    },
  },
} satisfies Meta<typeof FloatingProductHero>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hero section with all features enabled
 */
export const Default: Story = {
  args: {
    title: "Build the Future Faster",
    subtitle:
      "Experience cutting-edge design with smooth animations and premium aesthetics. Perfect for modern SaaS and AI landing pages.",
    primaryCtaText: "Get Started Free",
    secondaryCtaText: "View Demo",
    showAllCards: true,
    theme: "dark",
    animationEnabled: true,
    minHeight: "100vh",
  },
  render: (args) => (
    <FloatingProductHero
      {...args}
      onPrimaryCta={() => alert("Primary CTA clicked!")}
      onSecondaryCta={() => alert("Secondary CTA clicked!")}
    />
  ),
};

/**
 * With animations disabled (respects prefers-reduced-motion)
 */
export const NoAnimations: Story = {
  args: {
    ...Default.args,
    animationEnabled: false,
  },
  render: (args) => (
    <FloatingProductHero
      {...args}
      onPrimaryCta={() => alert("Primary CTA clicked!")}
      onSecondaryCta={() => alert("Secondary CTA clicked!")}
    />
  ),
};

/**
 * Without floating cards
 */
export const WithoutCards: Story = {
  args: {
    ...Default.args,
    showAllCards: false,
  },
  render: (args) => (
    <FloatingProductHero
      {...args}
      onPrimaryCta={() => alert("Primary CTA clicked!")}
      onSecondaryCta={() => alert("Secondary CTA clicked!")}
    />
  ),
};

/**
 * Custom content for tech product
 */
export const TechProduct: Story = {
  args: {
    title: "Ship Code, Not Excuses",
    subtitle:
      "Deploy intelligent applications with AI-powered insights and real-time collaboration. Built for modern development teams.",
    primaryCtaText: "Start Building",
    secondaryCtaText: "Read Docs",
    showAllCards: true,
    theme: "dark",
    animationEnabled: true,
  },
  render: (args) => (
    <FloatingProductHero
      {...args}
      onPrimaryCta={() => alert("Primary CTA clicked!")}
      onSecondaryCta={() => alert("Secondary CTA clicked!")}
    />
  ),
};

/**
 * Custom content for AI product
 */
export const AIProduct: Story = {
  args: {
    title: "AI That Understands Your Workflow",
    subtitle:
      "Harness the power of advanced machine learning to automate complex tasks and unlock insights. Seamlessly integrated with your existing tools.",
    primaryCtaText: "Try for Free",
    secondaryCtaText: "Request Demo",
    showAllCards: true,
    theme: "dark",
    animationEnabled: true,
  },
  render: (args) => (
    <FloatingProductHero
      {...args}
      onPrimaryCta={() => alert("Primary CTA clicked!")}
      onSecondaryCta={() => alert("Secondary CTA clicked!")}
    />
  ),
};

/**
 * Shorter viewport
 */
export const ShortHero: Story = {
  args: {
    ...Default.args,
    minHeight: "70vh",
  },
  render: (args) => (
    <FloatingProductHero
      {...args}
      onPrimaryCta={() => alert("Primary CTA clicked!")}
      onSecondaryCta={() => alert("Secondary CTA clicked!")}
    />
  ),
};

/**
 * Mobile responsive view
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <FloatingProductHero
      {...args}
      onPrimaryCta={() => alert("Primary CTA clicked!")}
      onSecondaryCta={() => alert("Secondary CTA clicked!")}
    />
  ),
};

/**
 * Tablet responsive view
 */
export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  render: (args) => (
    <FloatingProductHero
      {...args}
      onPrimaryCta={() => alert("Primary CTA clicked!")}
      onSecondaryCta={() => alert("Secondary CTA clicked!")}
    />
  ),
};
