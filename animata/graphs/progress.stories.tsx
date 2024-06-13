import Progress from "@/animata/graphs/progress";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Graphs/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    progress: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    progress: 30,
  },
  render: (args) => {
    return (
      <div className="rounded bg-zinc-400 p-8">
        <strong className="font-normal text-gray-50">
          <strong>{args.progress}%</strong> progress
        </strong>
        {/** The height & width are important */}
        <div className="h-[12px] w-96">
          <Progress {...args} />
        </div>
      </div>
    );
  },
};
