import type { Meta, StoryObj } from "@storybook/react";
import Receipt from "@/animata/skeleton/receipt";

const meta = {
  title: "Skeleton/Receipt",
  component: Receipt,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Receipt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
