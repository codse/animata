import CustomerRating from "@/animata/card/customer-rating";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Customer Rating",
  component: CustomerRating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CustomerRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "Jonathan Doe",
    rating: 75,
    imageUrl:
      "https://images.unsplash.com/photo-1581092165309-2ab35320ca70?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};
