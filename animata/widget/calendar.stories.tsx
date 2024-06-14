import Calendar from "@/animata/widget/calendar";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Calender",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
