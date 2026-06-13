import type { Meta, StoryObj } from "@storybook/react";
import FlipCard from "@/animata/card/flip-card";

const meta = {
  title: "Card/Flip Card",
  component: FlipCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rotate: { control: { type: "select" }, options: ["x", "y"] },
  },
} satisfies Meta<typeof FlipCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    rotate: "y",
  },
  render: ({ rotate }) => (
    <FlipCard rotate={rotate}>
      <FlipCard.Front>
        <img
          src="https://images.unsplash.com/photo-1525373698358-041e3a460346?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          alt="Programming"
          className="h-full w-full rounded-2xl object-cover shadow-2xl shadow-black/40"
        />
        <div className="absolute bottom-4 left-4 text-xl font-bold text-white">Programming</div>
      </FlipCard.Front>
      <FlipCard.Back className="rounded-2xl bg-black/80 p-4 text-slate-200">
        <div className="flex min-h-full flex-col gap-2">
          <h1 className="text-base font-bold text-white">What is programming?</h1>
          <p className="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100">
            Computer programming or coding is the composition of sequences of instructions, called
            programs, that computers can follow to perform tasks.
          </p>
        </div>
      </FlipCard.Back>
    </FlipCard>
  ),
};

export const Secondary: Story = {
  args: {
    rotate: "x",
  },
  render: ({ rotate }) => (
    <FlipCard rotate={rotate}>
      <FlipCard.Front>
        <img
          src="https://images.unsplash.com/photo-1717966313670-a42f6908be92?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Bibek Bhattarai"
          className="h-full w-full rounded-2xl object-cover shadow-2xl shadow-black/40"
        />
        <div className="absolute bottom-4 left-4 text-xl font-bold text-white">Bibek Bhattarai</div>
      </FlipCard.Front>
      <FlipCard.Back className="rounded-2xl bg-black/80 p-4 text-slate-200">
        <div className="flex min-h-full flex-col gap-2">
          <h1 className="text-base font-bold text-white">Software Engineer</h1>
          <p className="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100">
            I am a full-stack developer with a passion for building beautiful and functional
            applications.
          </p>
        </div>
      </FlipCard.Back>
    </FlipCard>
  ),
};
