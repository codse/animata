import type { Meta, StoryObj } from "@storybook/react";
import PerCharacterRise from "@/animata/text/per-character-rise";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Per-Character Rise",
  component: PerCharacterRise,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof PerCharacterRise>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
