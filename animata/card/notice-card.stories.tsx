import NoticeCard from "@/animata/card/notice-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Notice Card",
  component: NoticeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    acceptText: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof NoticeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    acceptText: "Accept",
    title: "To your attention!",
    description:
      "Due to severe weather conditions, we will be closed from 11th to 14th of January.",
  },
  render: (args) => {
    return (
      <>
        <NoticeCard {...args} />
      </>
    );
  },
};
