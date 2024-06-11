import FillListItem from '@/animata/list-item/fill-list-item';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'List item/Fill list item',
  component: FillListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof FillListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    prefix: '01',
    text: 'Our services',
  },
};
