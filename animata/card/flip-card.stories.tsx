import FlipCard from "@/animata/card/flip-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Flip Card",
  component: FlipCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FlipCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    image:
      "https://plus.unsplash.com/premium_photo-1675107359574-e3ba5f47a1a2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Title",
    description: "Description",
    subtitle: "Subtitle",
    rotate: "y",
  },
};

export const Secondary: Story = {
  args: {
    image:
      "https://images.unsplash.com/photo-1717966313670-a42f6908be92?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bibek Bhattarai",
    subtitle: "Software Engineer",
    description:
      "I am a full-stack developer with a passion for building beautiful and functional applications.",
    rotate: "x",
  },
};
