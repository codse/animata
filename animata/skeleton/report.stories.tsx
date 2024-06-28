import Report from "@/animata/skeleton/report";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Skeleton/Report",
  component: Report,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Report>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
