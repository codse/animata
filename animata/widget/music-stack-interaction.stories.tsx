import MusicStackInteraction from "@/animata/widget/music-stack-interaction";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Music Stack Interaction",
  component: MusicStackInteraction,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MusicStackInteraction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    albums: [
      {
        id: 1,
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        cover: "https://images.unsplash.com/photo-1569424758782-cba94e6165fd",
      },
      {
        id: 2,
        title: "Abbey Road",
        artist: "The Beatles",
        cover: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d",
      },
      {
        id: 3,
        title: "Thriller",
        artist: "Michael Jackson",
        cover: "https://images.unsplash.com/photo-1559406041-c7d2b2e98690",
      },
      {
        id: 4,
        title: "The Wall",
        artist: "Pink Floyd",
        cover: "https://images.unsplash.com/photo-1528822234686-beae35cab346",
      },
    ],
  },
  render: (args) => {
    return (
      <div className="flex w-auto items-center justify-center rounded-xl border bg-gray-900 p-4 text-white shadow-2xl">
        <MusicStackInteraction {...args} />
      </div>
    );
  },
};
