import FeatureCard from "@/animata/card/feature-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Feature Card",
  component: FeatureCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
