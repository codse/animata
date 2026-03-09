import type { Meta, StoryObj } from "@storybook/react";
import HoverInteraction from "@/animata/icon/hover-interaction";

const meta = {
  title: "Icon/Hover Interaction",
  component: HoverInteraction,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HoverInteraction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "instagram",
    size: "4",
  },
};
