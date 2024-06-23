import MusicWidget from "@/animata/widget/music-widget";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Music Widget",
  component: MusicWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MusicWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
