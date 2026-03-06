import type { Meta, StoryObj } from "@storybook/react";
import DirectionCard, { testDirectionProps } from "@/animata/widget/direction-card";

const meta = {
  title: "Widget/Direction Card",
  component: DirectionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DirectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: testDirectionProps,
};
