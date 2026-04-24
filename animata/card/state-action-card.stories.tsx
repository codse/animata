import type { Meta, StoryObj } from "@storybook/react";

import StateActionCard from "@/animata/card/state-action-card";

const meta = {
  title: "Card/State Action Card",
  component: StateActionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StateActionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskManager: Story = {
  args: {
    useCase: "task",
  },
};

export const SocialCard: Story = {
  args: {
    useCase: "social",
  },
};

export const OrderCard: Story = {
  args: {
    useCase: "order",
  },
};
