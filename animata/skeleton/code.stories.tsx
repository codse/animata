import Code from "@/animata/skeleton/code";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Skeleton/Code",
  component: Code,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
