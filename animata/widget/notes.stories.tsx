import Notes from "@/animata/widget/notes";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Notes",
  component: Notes,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Notes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
