import Watertracker from "@/animata/widget/watertracker";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Watertracker",
  component: Watertracker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Watertracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
