import WideCard from "@/animata/skeleton/wide-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Skeleton/Wide Card",
  component: WideCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WideCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
