import type { Meta, StoryObj } from "@storybook/react";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import DropdownMenu, { type DropdownMenuProps } from "@/animata/navigation/dropdown-menu";

const meta = {
  title: "Navigation/Dropdown Menu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["left", "right"],
      description: "Dropdown alignment relative to trigger button",
    },
    triggerLabel: {
      control: "text",
      description: "Label text for the trigger button",
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    triggerLabel: "Options",
    align: "left",
    items: [
      { label: "Profile", icon: <User className="h-4 w-4" /> },
      { label: "Settings", icon: <Settings className="h-4 w-4" /> },
      { label: "Help", icon: <HelpCircle className="h-4 w-4" /> },
      { label: "Sign Out", icon: <LogOut className="h-4 w-4" /> },
    ],
  },
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <DropdownMenu {...args} />
    </div>
  ),
};

export const RightAlign: Story = {
  args: {
    triggerLabel: "Menu",
    align: "right",
    items: [
      { label: "Profile", icon: <User className="h-4 w-4" /> },
      { label: "Settings", icon: <Settings className="h-4 w-4" /> },
      { label: "Help", icon: <HelpCircle className="h-4 w-4" /> },
      { label: "Sign Out", icon: <LogOut className="h-4 w-4" /> },
    ],
  },
  render: (args) => (
    <div className="flex h-64 items-center justify-end pr-24">
      <DropdownMenu {...args} />
    </div>
  ),
};
