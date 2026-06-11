import type { Meta, StoryObj } from "@storybook/react";
import SharedAxisY from "@/animata/text/shared-axis-y";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Shared Axis Y",
  component: SharedAxisY,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SharedAxisY>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
