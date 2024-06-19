import ButtonDownload from "@/animata/button/button-download";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Button Download",
  component: ButtonDownload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ButtonDownload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
