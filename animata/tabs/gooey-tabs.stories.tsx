import type { Meta, StoryObj } from "@storybook/react";

import GooeyTabs from "@/animata/tabs/gooey-tabs";

const meta = {
  title: "Tabs/Gooey Tabs",
  component: GooeyTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultActiveIndex: {
      control: { type: "number", min: -1, max: 4 },
    },
  },
} satisfies Meta<typeof GooeyTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** First tab expanded on load — matches the reference gooey merge layout. */
export const Primary: Story = {
  args: {
    defaultActiveIndex: 0,
  },
};

export const Collapsed: Story = {
  args: {
    defaultActiveIndex: -1,
  },
};
