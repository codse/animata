import NavbarSmoothTransition from "@/animata/container/navbar-smooth-transition";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Navbar/Navbar Smooth Transition",
  component: NavbarSmoothTransition,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof NavbarSmoothTransition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
