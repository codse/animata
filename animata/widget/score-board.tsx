import Histogram from "@/animata/graphs/bar-chart";

export default function ScoreBoard({
  items,
}: {
  items: {
    progress: number;
    label: string;
    className?: string;
    containerClassName?: string;
  }[];
}) {
  return (
    <div className="group flex min-h-48 w-52 flex-col rounded-lg border-[1px] bg-white p-3 shadow-sm shadow-black/15 transition-all duration-700">
      <p className="text-base text-gray-600">
        Status:<span className="font-semibold text-green-700"> Good </span>
      </p>
      <Histogram height={76} items={items} />
      <h5 className="mt-4 text-gray-700">Overall Progress</h5>
      <p className="font-semibold">
        80% <span className="text-sm text-gray-500">(score, progress)</span>
      </p>
    </div>
  );
}
