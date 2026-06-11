import type { Meta, StoryObj } from "@storybook/react";
import FocusBlurResolve from "@/animata/text/focus-blur-resolve";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Focus Blur Resolve",
  component: FocusBlurResolve,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof FocusBlurResolve>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
