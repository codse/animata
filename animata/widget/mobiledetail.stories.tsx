import Mobiledetail from "@/animata/widget/mobiledetail";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Mobiledetail",
  component: Mobiledetail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Mobiledetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
