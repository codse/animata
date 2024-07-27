import DirectionCard, { testDirectionProps } from "@/animata/widget/direction-card";
import { Meta, StoryObj } from "@storybook/react";
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
