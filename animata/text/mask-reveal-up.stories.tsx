import type { Meta, StoryObj } from "@storybook/react";
import MaskRevealUp from "@/animata/text/mask-reveal-up";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Mask Reveal Up",
  component: MaskRevealUp,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MaskRevealUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
