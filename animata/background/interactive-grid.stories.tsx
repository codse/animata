import InteractiveGrid from "@/animata/background/interactive-grid";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Interactive Grid",
  component: InteractiveGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InteractiveGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <div className="pointer-events-none my-24 flex h-fit max-w-sm flex-col items-center justify-center text-center text-zinc-800">
        <h1 className="text-4xl font-bold">Hello there!</h1>
        <p className="text-balance text-base">
          I am a placeholder content. Hover over the small squares to see the animation.
        </p>
      </div>
    ),
  },
};
