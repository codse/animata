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
  args: {},
};
