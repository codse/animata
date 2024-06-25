import MobileDetail from "@/animata/widget/mobile-detail";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Mobile Detail",
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
