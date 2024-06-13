import BlogCard from "@/animata/card/blog-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Blog Card",
  component: BlogCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "A card which makes you rethink css",
    subTitle: "This card was made in just 300 lines of code",
    buttonText: "Read more",
    image: "https://plus.unsplash.com/premium_vector-1689096860582-07eee139f9f1?bg=FFFFFF&w=800&auto=format&fit=crop&q=100&ixlib=rb-4.0.3",
    tiltEffect: true,
  },
};
