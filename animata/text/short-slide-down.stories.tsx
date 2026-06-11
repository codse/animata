import type { Meta, StoryObj } from "@storybook/react";
import ShortSlideDown from "@/animata/text/short-slide-down";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Short Slide Down",
  component: ShortSlideDown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ShortSlideDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
