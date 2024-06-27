import FlippingCard from "@/animata/list/flipping-cards";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/Flipping Cards",
  component: FlippingCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FlippingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    list: [
      {
        font: "Antonov AN-255",
        title: "Aa",
        image:
          "https://images.unsplash.com/photo-1718889874468-3a56b84bb2e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        font: "Boeing 747",
        title: "Bb",
        image:
          "https://plus.unsplash.com/premium_photo-1717916843908-7bbee16bad20?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        font: "Cessna 172",
        title: "Cc",
        image:
          "https://images.unsplash.com/photo-1718743256288-e77382a88aaf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        font: "Dassault Falcon 7X",
        title: "Dd",
        image:
          "https://images.unsplash.com/photo-1718889874468-3a56b84bb2e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        font: "Embraer EMB 120 ",
        title: "Ee",
        image:
          "https://images.unsplash.com/photo-1718792679559-5cfd607bb564?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        font: "Fokker F100",
        title: "Ff",
        image:
          "https://images.unsplash.com/photo-1718397172443-48185c6bb4e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
};
