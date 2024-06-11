import SkewImage from "@/animata/image/skew-image";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Skew Image",
  component: SkewImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SkewImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: "https://plus.unsplash.com/premium_vector-1689096672037-98309fdc7f44?bg=FFFFFF&q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Random",
  },
};
