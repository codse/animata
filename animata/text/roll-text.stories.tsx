import type { Meta, StoryObj } from "@storybook/react";

import RollText from "@/animata/text/roll-text";

const meta = {
  title: "Text/Roll Text",
  component: RollText,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    stagger: {
      control: "select",
      options: ["none", "word", "character"],
    },
  },
} satisfies Meta<typeof RollText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Team member",
    stagger: "character",
    staggerMs: 32,
    durationMs: 250,
    className: "font-(family-name:--font-display) text-4xl tracking-tight text-foreground",
  },
};

export const InCardLink: Story = {
  args: {
    text: "Roll text",
    stagger: "character",
    staggerMs: 45,
  },
  render: (args) => (
    <a
      href="/docs"
      data-roll-group
      className="group/roll block max-w-xs rounded-xl p-5 ring-1 ring-foreground/10 transition-colors hover:bg-foreground/[0.02]"
    >
      <RollText
        {...args}
        groupHover
        className="pointer-events-none font-(family-name:--font-display) text-2xl text-foreground"
      />
      <p className="mt-2 text-sm text-muted-foreground">
        Hover the card — animation plays through even if the pointer leaves, stays revealed, and
        replays on re-hover.
      </p>
    </a>
  ),
};
