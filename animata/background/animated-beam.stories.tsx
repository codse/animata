import AnimatedBeam from "@/animata/background/animated-beam";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Animated Beam",
  component: AnimatedBeam,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedBeam>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <div className="flex min-h-96 w-full flex-col items-center justify-center text-xl text-white md:text-3xl">
        <div className="max-w-lg rounded-xl bg-opacity-10 p-4 text-center font-light backdrop-blur-sm">
          Look at the <span className="line-through">stars</span> <strong>meteors</strong>! Look how
          they <span className="line-through">shine</span> <strong>fall</strong> for you!
          <small className="mt-5 block text-sm text-opacity-30">
            This is a placeholder content
          </small>
        </div>
      </div>
    ),
  },
};
