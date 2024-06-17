import WeatherCard from "@/animata/widget/weather-card";
import { Meta, StoryObj } from "@storybook/react";

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
