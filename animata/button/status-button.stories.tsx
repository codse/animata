import type { Meta, StoryObj } from "@storybook/react";
import StatusButton from "@/animata/button/status-button";

const meta = {
  title: "Button/Status Button",
  component: StatusButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StatusButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
