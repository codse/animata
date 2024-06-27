import TiltedCover from "@/animata/image/tilted-cover";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Tilted Cover",
  component: TiltedCover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TiltedCover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    image: {
      alt: "Statue of Liberty",
      src: "https://plus.unsplash.com/premium_vector-1689096845649-80579c8bb9ce?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    children: (
      <div className="p-2">
        <div className="mb-2 text-sm font-semibold text-foreground">Statue of Liberty</div>
        <p className="leading-2 text-sm text-muted-foreground">
          The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York
          Harbor, within New York City.{" "}
        </p>
      </div>
    ),
  },
};

export const Reverse: Story = {
  args: {
    direction: "right",
    image: {
      alt: "Work desk",
      src: "https://plus.unsplash.com/premium_vector-1709299689737-3bddaa02fa7e?bg=FFFFFF&q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    children: (
      <div className="p-2">
        <div className="mb-2 text-sm font-semibold text-foreground/80">Work desk</div>
        <p className="leading-2 text-sm text-muted-foreground">
          A work desk with a laptop, a cup of coffee, and a plant.{" "}
        </p>
      </div>
    ),
  },
};

export const Multiple: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex w-full flex-wrap items-center justify-center">
        <TiltedCover
          image={{
            alt: "Statue of Liberty",
            src: "https://plus.unsplash.com/premium_vector-1689096845649-80579c8bb9ce?bg=FFFFFF&w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          }}
        >
          <div className="p-2">
            <div className="mb-2 text-sm font-semibold text-foreground/80">Statue of Liberty</div>
            <p className="leading-2 text-sm text-muted-foreground">
              The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New
              York Harbor, within New York City.
            </p>
          </div>
        </TiltedCover>

        <TiltedCover
          direction="right"
          tiltCover={false}
          cover={
            <div className="p-2 text-sm text-blue-500">
              <strong>Hello</strong>, I am a <span className="underline">cover</span>.
              <div>
                I am not <i>tilted</i>. I am not an image.
              </div>
            </div>
          }
        >
          <div className="p-2">
            <div className="mb-2 text-sm font-semibold text-foreground/80">Custom</div>
            <p className="leading-2 text-sm text-muted-foreground">
              This is a non-image tilted cover.
            </p>
          </div>
        </TiltedCover>

        <TiltedCover
          direction="right"
          image={{
            alt: "Work desk",
            src: "https://plus.unsplash.com/premium_vector-1709299689737-3bddaa02fa7e?bg=FFFFFF&q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3",
          }}
        >
          <div className="p-2">
            <div className="mb-2 text-sm font-semibold text-foreground/80">Work desk</div>
            <p className="leading-2 text-sm text-muted-foreground">
              A work desk with a laptop, a cup of coffee, and a plant.{" "}
            </p>
          </div>
        </TiltedCover>
      </div>
    );
  },
};
