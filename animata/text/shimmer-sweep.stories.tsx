import type { Meta, StoryObj } from "@storybook/react";
import ShimmerSweep from "@/animata/text/shimmer-sweep";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Shimmer Sweep",
  component: ShimmerSweep,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ShimmerSweep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
