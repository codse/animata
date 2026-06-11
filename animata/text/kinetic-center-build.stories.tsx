import type { Meta, StoryObj } from "@storybook/react";
import KineticCenterBuild from "@/animata/text/kinetic-center-build";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Kinetic Center Build",
  component: KineticCenterBuild,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof KineticCenterBuild>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
