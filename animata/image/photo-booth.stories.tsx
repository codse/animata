import PhotoBooth from "@/animata/image/photo-booth";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Photo Booth",
  component: PhotoBooth,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof PhotoBooth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    collections: [
      "https://ca.slack-edge.com/TA3D91XF0-UA24KJLUQ-a01f15beaace-512",
      "https://ca.slack-edge.com/TA3D91XF0-UA2LL51J9-840e932f05c5-512",
      "https://slp-statics.astockcdn.net/static_assets/staging/24spring/home/EMEA/curated-collections/card-1.jpg?width=580",
      "https://t3.ftcdn.net/jpg/06/32/96/32/360_F_632963270_HsCKLfqrA4lqiMmfFQ6VeU0UsISmaxpD.jpg",
    ],
    className: "scale-1.3",
  },
};
