import type { Meta, StoryObj } from "@storybook/react";
import MicroScaleFade from "@/animata/text/micro-scale-fade";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Micro Scale Fade",
  component: MicroScaleFade,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MicroScaleFade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
