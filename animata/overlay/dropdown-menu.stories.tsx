import type { Meta, StoryObj } from "@storybook/react";

import DropdownMenu, { type DropdownMenuItem } from "@/animata/overlay/dropdown-menu";

const items: DropdownMenuItem[] = [
  {
    label: "Profile",
    description: "View your account details",
    onSelect: () => console.log("Profile"),
  },
  {
    label: "Settings",
    description: "Adjust preferences and permissions",
    onSelect: () => console.log("Settings"),
  },
  {
    label: "Documentation",
    description: "Open the docs in a new tab",
    href: "https://nextjs.org/docs",
  },
  { label: "Danger zone", description: "Disabled action example", disabled: true },
];

const meta = {
  title: "Overlay/Dropdown Menu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    triggerMode: {
      control: { type: "select" },
      options: ["click", "hover"],
    },
    placement: {
      control: { type: "select" },
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items,
    label: "Open menu",
    triggerMode: "click",
    placement: "bottom-start",
  },
};

export const HoverTrigger: Story = {
  args: {
    items,
    label: "Hover menu",
    triggerMode: "hover",
    placement: "bottom-start",
  },
};
