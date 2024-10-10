import Faq from "@/animata/accordion/faq";
import { Meta, StoryObj } from "@storybook/react";

const faqData = [
  {
    id: 1,
    question: "How late does the internet close?",
    answer: "The internet doesn't close. It's available 24/7.",
    icon: "❤️",
    iconPosition: "right",
  },
  {
    id: 2,
    question: "Do I need a license to browse this website?",
    answer: "No, you don't need a license to browse this website.",
  },
  {
    id: 3,
    question: "What flavour are the cookies?",
    answer: "Our cookies are digital, not edible. They're used for website functionality.",
  },
  {
    id: 4,
    question: "Can I get lost here?",
    answer: "Yes, but we do have a return policy",
    icon: "⭐",
    iconPostion: "left",
  },
  {
    id: 5,
    question: "What if I click the wrong button?",
    answer: "Don't worry, you can always go back or refresh the page.",
  },
];

const meta = {
  title: "Accordion/Faq",
  component: Faq,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Faq>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: faqData,
  },
};
