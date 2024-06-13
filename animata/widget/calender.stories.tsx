import Calender from "@/animata/widget/calender";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Calender",
  component: Calender,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Calender>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
