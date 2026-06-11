import type { Meta, StoryObj } from "@storybook/react";
import LineByLineSlide from "@/animata/text/line-by-line-slide";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Line-by-Line Slide",
  component: LineByLineSlide,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof LineByLineSlide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
