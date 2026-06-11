import type { Meta, StoryObj } from "@storybook/react";
import BlurOutUp from "@/animata/text/blur-out-up";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Blur Out Up",
  component: BlurOutUp,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof BlurOutUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
