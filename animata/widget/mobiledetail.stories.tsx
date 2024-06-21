import { Meta, StoryObj } from "@storybook/react";
import MobileDetail from "@/animata/widget/mobile-detail";

const meta = {
  title: "Widget/mobile-detail",
  component: MobileDetail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MobileDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
