import type { Meta, StoryObj } from "@storybook/react";
import FadeThrough from "@/animata/text/fade-through";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Fade Through",
  component: FadeThrough,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof FadeThrough>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
