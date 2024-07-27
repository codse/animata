import { Airplay, BarChart, Cloud, Earth, GitCommit, GitGraph, Heart, Map } from "lucide-react";

import Marquee from "@/animata/container/marquee";
import { cn } from "@/lib/utils";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Container/Marquee",
  component: Marquee,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

const Content = () => {
  return (
    <>
      {[
        {
          icons: [BarChart, GitGraph],
          content: "What's the stock price of Tesla?",
        },
        {
          icons: [Airplay],
          content: "Play the next episode of The Office",
        },
        {
          icons: [Map, Earth],
          content: "Show me the nearest coffee shop",
        },
        {
          icons: [Cloud],
          content: "What's the weather like in Kathmandu?",
        },
        {
          icons: [Heart, GitCommit],
          content: "Remind me to call mom",
        },
      ].map((item) => (
        <div
          className="flex h-40 w-60 flex-1 flex-col justify-between rounded-md border bg-gray-100 p-4"
          key={`item-${item.content}`}
        >
          <div className="flex flex-row gap-2">
            {item.icons.map((Icon, index) => (
              <Icon key={`icon-${index}`} size={24} />
            ))}
          </div>
          <div className="text-gray-900">{item.content}</div>
        </div>
      ))}
    </>
  );
};

export const Primary: Story = {
  args: {
    pauseOnHover: true,
  },

  render: (args) => (
    <div className="storybook-fix relative flex h-full max-h-96 min-h-72 w-full min-w-72 items-center justify-center overflow-hidden rounded border bg-background">
      <Marquee {...args}>
        <Content />
      </Marquee>
    </div>
  ),
};

export const Vertical: Story = {
  args: { vertical: true },
  render: (args) => (
    <div className="storybook-fix relative flex h-full max-h-96 min-h-72 w-full min-w-72 items-center justify-center overflow-hidden rounded-md border bg-background">
      <Marquee className="items-center" {...args}>
        <Content />
      </Marquee>
    </div>
  ),
};

export const Multiple: Story = {
  args: {},
  render: (args) => (
    <div
      className={cn(
        "storybook-fix relative flex h-full max-h-96 min-h-72 w-full min-w-72 items-center justify-center overflow-hidden rounded-md border bg-background",
        {
          "flex-row": args.vertical,
          "flex-col": !args.vertical,
        },
      )}
    >
      <Marquee {...args}>
        <Content />
      </Marquee>
      <Marquee {...args} reverse={!args.reverse}>
        <Content />
      </Marquee>
    </div>
  ),
};
