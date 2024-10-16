import React from "react";
import { Copy, Edit, Share2, Trash } from "lucide-react";

import SpeedDial from "@/animata/fabs/speed-dial";
import { Meta, StoryObj } from "@storybook/react";

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
      description: "Direction of the SpeedDial",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "right" },
      },
    },
    actionButtons: {
      description:
        "Array of action buttons to be displayed in the SpeedDial. Each button should have an icon, label, and action function.",
      table: {
        type: { summary: "Array of objects" },
      },
    },
  },
} satisfies Meta<typeof SpeedDial>;

export default meta;
type Story = StoryObj<typeof meta>;

const actionButtons = [
  { icon: <Copy />, label: "Copy", key: "copy", action: () => console.log("Copy clicked") },
  { icon: <Edit />, label: "Edit", key: "edit", action: () => console.log("Edit clicked") },
  { icon: <Share2 />, label: "Share", key: "share", action: () => console.log("Share clicked") },
  { icon: <Trash />, label: "Delete", key: "delete", action: () => console.log("Delete clicked") },
];

// Primary story for SpeedDial
export const Primary: Story = {
  args: {
    direction: "right",
    actionButtons: actionButtons,
  },
};

export const Secondary: Story = {
  args: {
    direction: "down",
    actionButtons: actionButtons,
  },
};
