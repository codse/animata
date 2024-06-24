import BarChart from "@/animata/graphs/bar-chart";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Graphs/Bar Chart",
  component: BarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        label: "A",
        progress: 45,
        className: "rounded-md bg-blue-600/45",
      },
      { label: "B", progress: 25, className: "rounded-md bg-blue-600/25" },
      { label: "C", progress: 15, className: "rounded-md bg-blue-600/15" },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "C", progress: 15, className: "rounded-md bg-blue-600/15" },
      { label: "D", progress: 30, className: "rounded-md bg-blue-600/30" },
      { label: "E", progress: 70, className: "rounded-md bg-blue-600/70" },
      {
        label: "A",
        progress: 45,
        className: "rounded-md bg-blue-600/45",
      },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "C", progress: 15, className: "rounded-md bg-blue-600/15" },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "C", progress: 85, className: "rounded-md bg-blue-600/85" },
      {
        label: "D",
        progress: 90,
        className: "rounded-md bg-blue-600/90",
      },
      { label: "E", progress: 15, className: "rounded-md bg-blue-600/15" },
    ],
    height: 4 * 12, // h-12 * 4
  },
  render: (args) => {
    return (
      <>
        <strong className="text-blue-500">Bar chart</strong>
        <div className="group rounded border border-blue-100 bg-white p-2">
          {/** The height & width are important */}
          <div className="border-bottom relative box-border h-12 w-52 border-zinc-300">
            <BarChart {...args} />
          </div>
        </div>
      </>
    );
  },
};

export const WithFilledBackground: Story = {
  args: {
    items: [
      {
        label: "A",
        containerClassName: "bg-cyan-300",
        progress: 45,
        className: "bg-cyan-600",
      },
      {
        label: "B",
        containerClassName: "bg-cyan-300",
        progress: 25,
        className: "bg-cyan-600",
      },
      {
        label: "C",
        containerClassName: "bg-cyan-300",
        progress: 15,
        className: "bg-cyan-600",
      },
      {
        label: "B",
        containerClassName: "bg-cyan-300",
        progress: 10,
        className: "bg-cyan-600",
      },
      {
        label: "C",
        containerClassName: "bg-cyan-300",
        progress: 15,
        className: "bg-cyan-600",
      },
      {
        label: "D",
        containerClassName: "bg-cyan-300",
        progress: 30,
        className: "bg-cyan-600",
      },
      {
        label: "B",
        containerClassName: "bg-cyan-300",
        progress: 10,
        className: "bg-cyan-600",
      },
      {
        label: "B",
        containerClassName: "bg-cyan-300",
        progress: 10,
        className: "bg-cyan-600",
      },
      {
        label: "C",
        containerClassName: "bg-cyan-300",
        progress: 85,
        className: "bg-cyan-600",
      },
      {
        label: "D",
        progress: 90,
        containerClassName: "bg-cyan-300",
        className: "bg-cyan-600",
      },
      {
        label: "E",
        progress: 15,
        containerClassName: "bg-cyan-300",
        className: "bg-cyan-600",
      },
      {
        label: "E",
        containerClassName: "bg-cyan-300",
        progress: 70,
        className: "bg-cyan-600",
      },
      {
        label: "A",
        containerClassName: "bg-cyan-300",
        progress: 45,
        className: "bg-cyan-600",
      },
      {
        label: "B",
        containerClassName: "bg-cyan-300",
        progress: 10,
        className: "bg-cyan-600",
      },
      {
        label: "C",
        containerClassName: "bg-cyan-300",
        progress: 15,
        className: "bg-cyan-600",
      },
      {
        label: "B",
        containerClassName: "bg-cyan-300",
        progress: 10,
        className: "bg-cyan-600",
      },
    ],
    height: 4 * 12, // h-12 * 4
  },
  render: (args) => {
    return (
      <>
        <strong className="text-blue-500">Bar chart</strong>
        <div className="group rounded border border-blue-100 bg-white p-2">
          {/** The height & width are important */}
          <div className="border-bottom relative box-border h-12 w-52 border-zinc-300">
            <BarChart {...args} />
          </div>
        </div>
      </>
    );
  },
};
