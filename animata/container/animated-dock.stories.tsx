import { Meta, StoryObj } from "@storybook/react";
import { Home, Search, Bell, User } from "lucide-react";
import AnimatedDock from "@/animata/container/animated-dock";


const meta = {
  title: "Container/Animated Dock",
  component: AnimatedDock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    largeClassName: { control: "text" },
    smallClassName: { control: "text" },
  },
} satisfies Meta<typeof AnimatedDock>;

export default meta;
type Story = StoryObj<typeof meta>;


// Example contents for AnimatedDock
const dockItems = [
  { title: "Home", icon: <Home />, href: "/" },
  { title: "Search", icon: <Search />, href: "/search" },
  { title: "Notifications", icon: <Bell />, href: "/notifications" },
  { title: "Profile", icon: <User />, href: "/profile" },
];


// Primary story for AnimatedDock (default layout)
export const Primary: Story = {
  args: {
    items: dockItems,
    largeClassName: "max-w-lg",
    smallClassName: "w-full",
  },
  render: (args) => (
    <div className="relative flex h-60 w-full items-center justify-center">
      <AnimatedDock {...args} />
    </div>
  ),
};


// Story focused on the Small layout (for mobile view)
export const Small: Story = {
  args: {
    items: dockItems,
    smallClassName: "w-full",
  },
  render: (args) => (
    <div className="relative flex h-40 w-full items-center justify-center">
      <AnimatedDock items={args.items} smallClassName={args.smallClassName} />
    </div>
  ),
};


// Story focused on the Large layout (for desktop view)
export const Large: Story = {
  args: {
    items: dockItems,
    largeClassName: "max-w-lg",
  },
  render: (args) => (
    <div className="relative flex h-60 w-full items-center justify-center">
      <AnimatedDock items={args.items} largeClassName={args.largeClassName} />
    </div>
  ),
};


// Story showing both layouts at the same time (for comparison)
export const Multiple: Story = {
  args: {
    items: dockItems,
    largeClassName: "max-w-lg",
    smallClassName: "w-full",
  },
  render: (args) => (
    <div className="relative flex flex-col items-center justify-center gap-6">
      <AnimatedDock items={args.items} largeClassName={args.largeClassName} />
      <AnimatedDock items={args.items} smallClassName={args.smallClassName} />
    </div>
  ),
};
