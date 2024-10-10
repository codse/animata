import { HandPlatter, Sailboat, Tent } from "lucide-react";

import { ListStack } from "@/animata/list/list-stack";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/List Stack",
  component: ListStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ListStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    cards: [
      {
        id: 0,
        icon: <Tent />,
        title: "Camping",
        location: "Yosemite Park",
        date: "5 August",
      },
      {
        id: 1,
        icon: <Sailboat />,
        title: "Boating",
        location: "Lake Tahoe Park",
        date: "2 August",
      },
      {
        id: 2,
        icon: <HandPlatter />,
        title: "Barbecue",
        location: "Greenfield Shores",
        date: "28 July",
      },
    ],
  },
};
