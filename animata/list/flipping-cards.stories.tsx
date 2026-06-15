import type { Meta, StoryObj } from "@storybook/react";
import { PlusCircle } from "lucide-react";

import Marquee from "@/animata/container/marquee";
import FlippingCards, { getFlippingCardsAccent } from "@/animata/list/flipping-cards";

const demoItems = [
  {
    font: "Antonov AN-255",
    title: "Aa",
    image:
      "https://images.unsplash.com/photo-1718889874468-3a56b84bb2e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    font: "Boeing 747",
    title: "Bb",
    image:
      "https://plus.unsplash.com/premium_photo-1717916843908-7bbee16bad20?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    font: "Cessna 172",
    title: "Cc",
    image:
      "https://images.unsplash.com/photo-1718743256288-e77382a88aaf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    font: "Dassault Falcon 7X",
    title: "Dd",
    image:
      "https://images.unsplash.com/photo-1718889874468-3a56b84bb2e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    font: "Embraer EMB 120 ",
    title: "Ee",
    image:
      "https://images.unsplash.com/photo-1718792679559-5cfd607bb564?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    font: "Fokker F100",
    title: "Ff",
    image:
      "https://images.unsplash.com/photo-1718397172443-48185c6bb4e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const meta = {
  title: "List/Flipping Cards",
  component: FlippingCards,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FlippingCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <FlippingCards>
      {demoItems.map((item, index) => (
        <FlippingCards.Item key={item.title}>
          <FlippingCards.Item.Front className="flex bg-background">
            <div className="flex w-full flex-col border border-border px-3 py-4 text-sm text-foreground">
              <span className="border-t-2 border-foreground pt-1">{item.font}</span>
              <span className="mt-4 border-b-2 border-foreground px-1 font-serif text-8xl">
                {item.title}
              </span>
              <div className="mt-12 flex items-center justify-between">
                <span>{index + 1}</span>
                <PlusCircle size={18} />
              </div>
            </div>
          </FlippingCards.Item.Front>
          <FlippingCards.Item.Back
            className="flex flex-col justify-between overflow-hidden py-4 text-sm"
            style={{ backgroundColor: getFlippingCardsAccent(index) }}
          >
            <img alt="" src={item.image} className="size-32 px-2" />
            <Marquee className="font-serif text-5xl text-white" applyMask={false}>
              {item.font.split(" ")[0]}
            </Marquee>
            <div className="flex items-center justify-between px-3">
              <span className="text-black">See more</span>
              <PlusCircle size={18} color="black" />
            </div>
          </FlippingCards.Item.Back>
        </FlippingCards.Item>
      ))}
    </FlippingCards>
  ),
};
