import type { Meta, StoryObj } from "@storybook/react";

import Social from "@/animata/tabs/social";

const meta = {
  title: "Tabs/Social",
  component: Social,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Social>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
