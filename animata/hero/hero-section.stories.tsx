import type { Meta, StoryObj } from "@storybook/react";
import HeroSection from "@/animata/hero/hero-section";

const meta = {
  title: "Hero/Hero Section",
  component: HeroSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "h-[800px]",
  },
};
