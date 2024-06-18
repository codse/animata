import DirectionCard from "@/animata/widget/direction-card";
import { Meta, StoryObj } from "@storybook/react";
import { CornerUpLeft, CornerUpRight, ArrowUp } from 'lucide-react';
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
  args: {
    directionValues:[
      {
            distance: 350,
            direction: "right",
            to: "Gurkha st",
            iconType: CornerUpRight
          },
          {
            distance: 700,
            direction: "left",
            to: "Rounding street",
            iconType: CornerUpLeft
          },
          {
            distance: 100,
            direction: "left",
            to: "Fulbari marga",
            iconType: CornerUpLeft
          },
          {
            distance: 1000,
            direction: "straight",
            to: "hwy 16",
            iconType: ArrowUp
          }
    ]

  },
};
