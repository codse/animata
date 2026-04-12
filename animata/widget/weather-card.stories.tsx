import type { Meta, StoryObj } from "@storybook/react";
import WeatherCard from "@/animata/widget/weather-card";

const meta = {
  title: "Widget/Weather Card",
  component: WeatherCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WeatherCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
