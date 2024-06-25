import DeliveryCard from "@/animata/widget/delivery-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Delivery Card",
  component: DeliveryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DeliveryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    progress: 30,
    arrivalTime: "16:30",
    location: "Newroad",
    timeAgo: "30min",
  },
};
