import EmailFeatureCard from "@/animata/card/email-feature-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Email Feature Card",
  component: EmailFeatureCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof EmailFeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
