import { Meta, StoryObj } from "@storybook/react";

import Pricing from "./pricing";

const meta = {
  title: "Section/Pricing",
  component: Pricing,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    outerRadius: {
      control: { type: "select" },
      options: ["normal", "rounded", "moreRounded"],
    },
    padding: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof Pricing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    plans: [
      { name: "Free", monthlyPrice: "$0.00", yearlyPrice: "$0.00" },
      { name: "Starter", monthlyPrice: "$9.99", yearlyPrice: "$99.99", popular: true },
      { name: "Pro", monthlyPrice: "$19.99", yearlyPrice: "$199.99" },
    ],
    width: "md",
    outerRadius: "rounded",
    padding: "medium",
  },
};

export const CustomPlans: Story = {
  args: {
    plans: [
      { name: "Basic", monthlyPrice: "$4.99", yearlyPrice: "$49.99" },
      { name: "Standard", monthlyPrice: "$14.99", yearlyPrice: "$149.99", popular: true },
      { name: "Premium", monthlyPrice: "$24.99", yearlyPrice: "$249.99" },
      { name: "Enterprise", monthlyPrice: "$49.99", yearlyPrice: "$499.99" },
    ],
    width: "xl",
    outerRadius: "moreRounded",
    padding: "large",
  },
};
