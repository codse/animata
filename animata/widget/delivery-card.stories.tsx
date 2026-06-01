import type { Meta, StoryObj } from "@storybook/react";
import DeliveryCard from "@/animata/widget/delivery-card";

const meta = {
  title: "Widget/Delivery Card",
  component: DeliveryCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DeliveryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OutForDelivery: Story = {
  name: "Out for delivery",
  args: {
    progress: 62,
    arrivalTime: "12:40",
    location: "Mission District",
    timeAgo: "8 min",
    simulateProgress: false,
  },
};

export const LiveDemo: Story = {
  name: "Live demo",
  args: {
    progress: 20,
    arrivalTime: "09:26",
    location: "Pokhara",
    timeAgo: "30 min",
    simulateProgress: true,
  },
};
