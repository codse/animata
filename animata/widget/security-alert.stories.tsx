import SecurityAlert from "@/animata/widget/security-alert";
import { Meta, StoryObj } from "@storybook/react";
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
