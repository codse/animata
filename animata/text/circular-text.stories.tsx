import CircularText from "@/animata/text/circular-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Circular Text",
  component: CircularText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CircularText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "CIRCULAR•TEXT•COMPONENT•",
  },
};
