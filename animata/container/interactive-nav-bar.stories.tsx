import InteractiveNavBar from "@/animata/container/interactive-nav-bar";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Container/Interactive Nav Bar",
  component: InteractiveNavBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InteractiveNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
