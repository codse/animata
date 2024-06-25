import ClockWithPhoto from "@/animata/widget/clock-with-photo";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Clock With Photo",
  component: ClockWithPhoto,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ClockWithPhoto>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
