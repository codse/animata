import type { Meta, StoryObj } from "@storybook/react";
import BottomUpLetters from "@/animata/text/bottom-up-letters";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Bottom-Up Letters",
  component: BottomUpLetters,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomUpLetters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
