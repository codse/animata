
import { Meta, StoryObj } from "@storybook/react";
import AnimatedCard3d from "./animated-card";

const meta = {
  title: "Card/Animated Card",
  component: AnimatedCard3d,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedCard3d>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "This is an awesome 3d card",
    subtitle: "A card that feels like black magic",
    buttonText: "Explore",
    hoverEffect: true,
    onButtonPress: () => console.log("okay"),
  },
};
