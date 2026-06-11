import type { Meta, StoryObj } from "@storybook/react";
import ShortSlideRight from "@/animata/text/short-slide-right";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Short Slide Right",
  component: ShortSlideRight,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ShortSlideRight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
