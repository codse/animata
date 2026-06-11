import type { Meta, StoryObj } from "@storybook/react";

import MetisText from "@/animata/text/metis-text";

const meta = {
  title: "Text/Metis Text",
  component: MetisText,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MetisText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "About us",
    className: "font-(family-name:--font-display) text-2xl lowercase text-foreground",
  },
};
