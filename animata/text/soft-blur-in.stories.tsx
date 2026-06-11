import type { Meta, StoryObj } from "@storybook/react";
import SoftBlurIn from "@/animata/text/soft-blur-in";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Soft Blur In",
  component: SoftBlurIn,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SoftBlurIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
