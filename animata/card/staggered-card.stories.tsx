import type { Meta, StoryObj } from "@storybook/react";
import StaggeredCard from "@/animata/card/staggered-card";

const meta = {
  title: "Card/Staggered Card",
  component: StaggeredCard,

  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StaggeredCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: ({ ...args }) => (
    <div className="storybook-fix min-h-80 w-full">
      <StaggeredCard className="mx-auto" {...args} />
    </div>
  ),

  args: {
    links: [
      { label: "Home", href: "#" },
      { label: "About", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
    ],
    delay: 0.06,
    openingDelay: 0.1,
  },
};
