import type { Meta, StoryObj } from "@storybook/react";
import { Copy, Edit, Share2, Trash } from "lucide-react";
import SpeedDial from "@/animata/fabs/speed-dial";

const meta = {
  title: "Fabs/Speed Dial",
  component: SpeedDial,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "down", "left", "right"],
    },
  },
} satisfies Meta<typeof SpeedDial>;

export default meta;
type Story = StoryObj<typeof meta>;

const actionButtons = [
  { icon: <Copy className="size-5" />, label: "Copy", key: "copy", action: () => {} },
  { icon: <Edit className="size-5" />, label: "Edit", key: "edit", action: () => {} },
  { icon: <Share2 className="size-5" />, label: "Share", key: "share", action: () => {} },
  { icon: <Trash className="size-5" />, label: "Delete", key: "delete", action: () => {} },
];

export const Primary: Story = {
  args: {
    direction: "right",
    actionButtons,
    triggerLabel: "Document actions",
  },
};
