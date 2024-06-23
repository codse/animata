import BarChart from "@/animata/graphs/bar-chart";

interface ScoreBoardProps {
  items: {
    progress: number;
    label: string;
    className?: string;
    containerClassName?: string;
  }[];
}

export const testScoreBoardProps: ScoreBoardProps = {
  items: [
    {
      label: "A",
      progress: 34,
      className: "rounded-md bg-green-500",
    },
    {
      label: "B",
      progress: 14,
      className: "rounded-md bg-red-500",
    },
    {
      label: "C",
      progress: 34,
      className: "rounded-md bg-green-500",
    },
    {
      label: "D",
      progress: 70,
      className: "rounded-md bg-green-500",
    },
    {
      label: "E",
      progress: 52,
      className: "rounded-md bg-green-500",
    },
    {
      label: "F",
      progress: 30,
      className: "rounded-md bg-green-500",
    },
    {
      label: "G",
      progress: 37,
      className: "rounded-md bg-green-500",
    },
    {
      label: "H",
      progress: 72,
      className: "rounded-md bg-green-500",
    },
    {
      label: "I",
      progress: 42,
      className: "rounded-md bg-green-500",
    },
  ],
};

export default function ScoreBoard({
  items = testScoreBoardProps.items,
}: {
  items: {
    progress: number;
    label: string;
    className?: string;
    containerClassName?: string;
  }[];
}) {
  return (
    <div className="group flex size-52 flex-col rounded-3xl border bg-background p-4 shadow-sm shadow-black/15 transition-all duration-700 dark:border-zinc-700">
      <p className="text-base text-foreground">
        Status:
        <span className="font-semibold text-green-700 dark:text-green-500"> Good </span>
      </p>
      <div className="w-full flex-1">
        <BarChart height={90} items={items} />
      </div>
      <h5 className="mt-4 text-sm text-muted-foreground">Overall Progress</h5>
      <p className="font-semibold text-foreground">
        80% <span className="text-sm text-muted-foreground">(score, progress)</span>
      </p>
    </div>
  );
}
