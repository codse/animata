import type { Meta, StoryObj } from "@storybook/react";
import ScaleDownFade from "@/animata/text/scale-down-fade";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Scale Down Fade",
  component: ScaleDownFade,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ScaleDownFade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
