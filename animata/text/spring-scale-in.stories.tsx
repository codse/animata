import type { Meta, StoryObj } from "@storybook/react";
import SpringScaleIn from "@/animata/text/spring-scale-in";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Spring Scale In",
  component: SpringScaleIn,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SpringScaleIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
