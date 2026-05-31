import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";
import CardStack, { CARD_STACK_MASK_IDS, type CardStackItem } from "@/animata/card/card-stack";

const demoCards: CardStackItem[] = [
  {
    id: "hari",
    image:
      "https://assets.lummi.ai/assets/QmPyqQgSM8sDVrcQxRwUA6fTDaeXkLMvpf6Z3Kx4aCg3pU?auto=format&w=500",
    title: "Hari Lamichhane",
    tagline: "Software Engineer",
    counts: { like: 142, comment: 23 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "sudha",
    image:
      "https://assets.lummi.ai/assets/QmVDPTUj31YYC4ycLmn3r1FhuSZDHBdK4d3Pk4gdbyB5MZ?auto=format&w=200",
    title: "Sudha Shrestha",
    tagline: "ML Engineer",
    counts: { like: 98, comment: 17 },
    maskId: CARD_STACK_MASK_IDS[1],
  },
  {
    id: "sofia",
    image:
      "https://assets.lummi.ai/assets/QmXp6StB1i36XHbbmppop5AwtQgnyom8bYTZqPkLVNGJnk?auto=format&w=200",
    title: "Sofia",
    tagline: "Software Engineer",
    counts: { like: 176, comment: 41 },
    maskId: CARD_STACK_MASK_IDS[2],
  },
  {
    id: "someone",
    image:
      "https://assets.lummi.ai/assets/QmWmYYozQAtxLohY8Hy1yopo4ds25KokJfNdtqybXnR5cw?auto=format&w=200",
    title: "Someone",
    tagline: "Doctor",
    counts: { like: 64, comment: 12 },
    maskId: CARD_STACK_MASK_IDS[3],
  },
  {
    id: "ammy",
    image:
      "https://assets.lummi.ai/assets/QmdybQRQqnqUKugP2e9hTaQi9GUciQkBADkrMVJ6GERsS2?auto=format&w=200",
    title: "Ammy",
    tagline: "Pilot",
    counts: { like: 211, comment: 33 },
    maskId: CARD_STACK_MASK_IDS[0],
  },
  {
    id: "bhagwati",
    image:
      "https://assets.lummi.ai/assets/QmaEVTC9eFZtSLTJmMVNpd2t9ctw1BXPzQKV4rhja62Y5z?auto=format&w=1500",
    title: "Bhagwati",
    tagline: "Pharmacist",
    counts: { like: 87, comment: 9 },
    maskId: CARD_STACK_MASK_IDS[1],
  },
];

const meta = {
  title: "Card/Card Stack",
  component: CardStack,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    items: { control: false },
    depth: { control: { type: "number", min: 1, max: 3 } },
  },
} satisfies Meta<typeof CardStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: demoCards,
    depth: 3,
    children: null,
  },
  render: ({ items, depth }) => (
    <div className="full-content w-full">
      <CardStack items={items} depth={depth}>
        <CardStack.Frame className="relative w-full max-w-sm mx-auto overflow-hidden">
          <CardStack.Masks />

          <div className="relative flex flex-col px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
            <CardStack.LiveRegion />

            <CardStack.Trigger className="w-full drop-shadow-2xl">
              <CardStack.Viewport>
                <CardStack.List>
                  {(item, index, layer) => (
                    <CardStack.Card key={item.id} layer={layer} stackIndex={index}>
                      <CardStack.Header>
                        <CardStack.Avatar src={item.image} />
                        <CardStack.Meta title={item.title} tagline={item.tagline} />
                      </CardStack.Header>

                      <CardStack.Media
                        src={item.image}
                        alt={`Portrait of ${item.title}`}
                        maskId={item.maskId}
                      />

                      <CardStack.Footer>
                        <CardStack.Metric
                          icon={Heart}
                          label="Likes"
                          value={item.counts?.like ?? 0}
                        />
                        <CardStack.Metric
                          icon={MessageCircle}
                          label="Comments"
                          value={item.counts?.comment ?? 0}
                          className="ms-1"
                        />
                        <ArrowRight
                          aria-hidden
                          className="ml-auto size-6 shrink-0 text-muted-foreground"
                        />
                      </CardStack.Footer>
                    </CardStack.Card>
                  )}
                </CardStack.List>
              </CardStack.Viewport>
            </CardStack.Trigger>
          </div>
        </CardStack.Frame>
      </CardStack>
    </div>
  ),
};
