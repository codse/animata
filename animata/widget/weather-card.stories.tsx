import type { Meta, StoryObj } from "@storybook/react";
import WeatherCard from "@/animata/widget/weather-card";

const meta = {
  title: "Widget/Weather Card",
  component: WeatherCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof WeatherCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TokyoMorning: Story = {
  name: "Tokyo morning",
  args: {
    city: "Tokyo",
    temperature: 19,
    feelsLike: 21,
    high: 24,
    low: 9,
  },
};

export const NycRain: Story = {
  name: "NYC rain",
  args: {
    city: "New York",
    temperature: 12,
    feelsLike: 10,
    high: 14,
    low: 8,
  },
};
