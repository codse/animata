import { Mic } from "lucide-react";

import IconRipple from "@/animata/icon/icon-ripple";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icon/Icon Ripple",
  component: IconRipple,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: { control: false },
  },
} satisfies Meta<typeof IconRipple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: Mic,
    iconSize: 24,
    iconColor: "#ddd",
    borderColor: "#ddd",
    inset: "10px",
  },
};
