import type { Meta, StoryObj } from "@storybook/react";

import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";
import TopDownLetters from "@/animata/text/top-down-letters";

const meta = {
  title: "Text/Top-Down Letters",
  component: TopDownLetters,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TopDownLetters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
