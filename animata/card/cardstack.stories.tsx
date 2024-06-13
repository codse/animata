import { Meta, StoryObj } from "@storybook/react";
import CardStack from "@/animata/card/cardstack";

const meta = {
  title: "Card/CardStack",
  component: CardStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
} satisfies Meta<typeof CardStack>;

export default meta;
type Story = StoryObj<typeof meta>;

const cards = [
  {
    id: 1,
    name: "JohnThedon",
    designation: "Software Engineer",
    content: <p>This is the content of card 1</p>,
  },
  {
    id: 2,
    name: "Sannjay Acharya",
    designation: "Product Manager",
    content: <p>This is the content of card 2</p>,
  },
  {
    id: 3,
    name: "Sumin Gurung",
    designation: "Designer",
    content: <p>This is the content of card 3</p>,
  },
];

export const Primary: Story = {
  args: {
    items: cards,
    offset: 15,
    scaleFactor: 0.08,
  },
};
