import CaseStudyCard from "@/animata/card/case-study-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Case Study Card",
  component: CaseStudyCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CaseStudyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title:
      "How Delivery Hero streamlines marketing reports across all their brands with Clarisights",
    category: "BOOKS",
    logo: "https://plus.unsplash.com/premium_photo-1686593923007-218c4db786ca?q=80&w=3095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://github.com/codse/animata",
    type: "content",
    image:
      "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};

export const Secondary: Story = {
  args: {
    image:
      "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://github.com/codse/animata",
    type: "simple-image",
  },
};
