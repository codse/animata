import { Meta, StoryObj } from "@storybook/react";
import Progress from "./Progress";

const meta = {
  title: "Widget/ Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
