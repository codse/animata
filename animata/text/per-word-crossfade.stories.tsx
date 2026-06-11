import type { Meta, StoryObj } from "@storybook/react";
import PerWordCrossfade from "@/animata/text/per-word-crossfade";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Per-Word Crossfade",
  component: PerWordCrossfade,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof PerWordCrossfade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
