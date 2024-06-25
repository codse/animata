import Reminder from "@/animata/widget/reminder";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Reminder",
  component: Reminder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Reminder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "",
  },
};
