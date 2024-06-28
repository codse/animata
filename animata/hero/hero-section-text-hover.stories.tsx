import HeroSectionTextHover from "@/animata/hero/hero-section-text-hover";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Hero/Hero Section Text Hover",
  component: HeroSectionTextHover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HeroSectionTextHover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
