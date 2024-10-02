import FeatureCardTsx from "@/animata/card/feature-card-tsx";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Feature Card Tsx",
  component: FeatureCardTsx,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FeatureCardTsx>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
