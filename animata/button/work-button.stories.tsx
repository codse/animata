import WorkButton from "@/animata/button/work-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Work Button",
  component: WorkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WorkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
