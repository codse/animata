import Profile from "@/animata/widget/profile";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Profile",
  component: Profile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
