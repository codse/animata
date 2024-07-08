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
      " https://images.unsplash.com/photo-1525373698358-041e3a460346?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Programming",
    subtitle: "What is programming?",
    description:
      "Computer programming or coding is the composition of sequences of instructions, called programs, that computers can follow to perform tasks.",
    rotate: "y",
  },
};

export const Secondary: Story = {
  args: {
    image:
      "https://images.unsplash.com/photo-1717966313670-a42f6908be92?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Bibek Bhattarai",
    subtitle: "Software Engineer",
    description:
      "I am a full-stack developer with a passion for building beautiful and functional applications.",
    rotate: "x",
  },
};
