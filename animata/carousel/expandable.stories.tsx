import Expandable from "@/animata/carousel/expandable";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Carousel/Expandable",
  component: Expandable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Expandable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "w-full min-w-72 storybook-fix",
  },
};
