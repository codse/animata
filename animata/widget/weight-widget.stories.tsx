import WeightWidget from "@/animata/widget/weight-widget"; // Adjust the path as necessary
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Weight Widget",
  component: WeightWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    weight: {
      control: {
        type: "number",
      },
      defaultValue: 0,
      description: "The current weight displayed in the widget",
    },
  },
} satisfies Meta<typeof WeightWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
