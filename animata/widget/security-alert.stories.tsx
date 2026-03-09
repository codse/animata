import type { Meta, StoryObj } from "@storybook/react";
import SecurityAlert from "@/animata/widget/security-alert";

const meta = {
  title: "Widget/Security Alert",
  component: SecurityAlert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SecurityAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
