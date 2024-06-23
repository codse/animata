import Flightwidget from "@/animata/widget/flight-widget";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Flight widget",
  component: Flightwidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Flightwidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
