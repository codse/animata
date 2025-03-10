import ScrubSlider from "@/animata/form-controls/scrub-slider";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form Controls/Scrub Slider",
  component: ScrubSlider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScrubSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
