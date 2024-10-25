"use client";
import { Calendar, Code, DollarSign, Heart, Ticket } from "lucide-react";

import Faq, { IFaqItems } from "@/animata/accordion/faq";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Faq> = {
  title: "Accordion/Faq",
  component: Faq,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    borderShape: {
      control: { type: "select" },
      options: ["rounded", "rectangle"],
      description: "Shape of the FAQ box (rounded or rectangle)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "rounded" },
      },
    },
    faqItems: {
      description:
        "Array of FAQ items to be displayed. Each item should have an id, question, answer, isActive, and an optional icon.",
      table: {
        type: { summary: "Array of objects" },
      },
    },
  },
};

export default meta;

const faqItems: IFaqItems[] = [
  {
    id: 1,
    question: "What can I contribute during Hacktoberfest?",
    answer: "You can contribute new animations, fix bugs, or improve documentation.",
    isActive: false,
    icon: (
      <Heart className="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-red-500" />
    ),
  },
  {
    id: 2,
    question: "How do I participate in Hacktoberfest?",
    answer: "It's simple! Choose an issue, start coding, and submit a pull request (PR).",
    isActive: false,
    icon: (
      <Code className="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-green-500" />
    ),
  },
  {
    id: 3,
    question: "What’s the deadline for contributions?",
    answer: "The deadline is October 31st at 11:59 PM. Don’t be late, Mr. Pumpkin!",
    isActive: false,
    icon: (
      <Calendar className="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-blue-500" />
    ),
  },
  {
    id: 4,
    question: "Can I get paid for contributing?",
    answer: "Yes! One lucky contributor will win $100.",
    isActive: false,
    icon: (
      <DollarSign className="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-yellow-500" />
    ),
  },
  {
    id: 5,
    question: "How many raffle entries can I get?",
    answer:
      "You can have up to 5 raffle entries to keep it fair, but feel free to contribute more!",
    isActive: false,
    icon: (
      <Ticket className="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-purple-500" />
    ),
  },
];

export const Default: StoryObj<typeof Faq> = {
  args: {
    faqItems: faqItems,
    borderShape: "rounded",
  },
};

Default.parameters = {
  docs: {
    storyDescription: "The FAQ component allows users to interactively view questions and answers.",
  },
};
