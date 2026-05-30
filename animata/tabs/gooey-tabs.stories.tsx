import { Code, List, SquaresFour } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import GooeyTabs from "@/animata/tabs/gooey-tabs";

const meta = {
  title: "Tabs/Gooey Tabs",
  component: GooeyTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: null,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof GooeyTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: null },
  render: () => (
    <GooeyTabs defaultActiveIndex={2}>
      <GooeyTabs.List>
        <GooeyTabs.Tab color="bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-900" label="API">
          <GooeyTabs.Icon>
            <Code weight="duotone" aria-hidden />
          </GooeyTabs.Icon>
          <GooeyTabs.Label>API</GooeyTabs.Label>
        </GooeyTabs.Tab>
        <GooeyTabs.Tab color="bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-900" label="Docs">
          <GooeyTabs.Icon>
            <List weight="duotone" aria-hidden />
          </GooeyTabs.Icon>
          <GooeyTabs.Label>Docs</GooeyTabs.Label>
        </GooeyTabs.Tab>
        <GooeyTabs.Tab
          color="bg-violet-600 hover:bg-violet-700 active:bg-violet-900"
          label="Components"
        >
          <GooeyTabs.Icon>
            <SquaresFour weight="duotone" aria-hidden />
          </GooeyTabs.Icon>
          <GooeyTabs.Label>Components</GooeyTabs.Label>
        </GooeyTabs.Tab>
      </GooeyTabs.List>
    </GooeyTabs>
  ),
};
