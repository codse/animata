import { Ban, Loader, Minus } from "lucide-react";

const getColor = (count: number) => {
  const colors: { [key: number]: string } = {
    0: "bg-purple-400",
    1: "bg-pink-400",
    2: "bg-blue-400",
    3: "bg-gray-600",
  };
  return colors[count];
};

export default function StorageWidget() {
  const columns = 7;
  const rows = 15;
  const storageData = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: columns }, (_, j) => {
      if (i * columns + j + 1 <= 42) return 0;
      if (i * columns + j + 1 <= 54) return 1;
      if (i * columns + j + 1 <= 73) return 2;
      return 3;
    }),
  );

  return (
    <div className="size-52 rounded-3xl bg-zinc-800 p-4 text-gray-400">
      <div className="flex justify-between">
        <div>
          <div className="flex items-end gap-1">
            <div className="text-3xl font-semibold text-white">5.31</div>
            <div className="font-semibold">/16 GB</div>
          </div>
          <div className="mt-1 flex items-center">
            <Ban className="mr-1 rotate-45" size={16} /> 28%
          </div>
        </div>
        <div className="relative">
          <Minus
            size={44}
            color="white"
            className="rotate-45 rounded-full border-4 border-black pl-2"
          />
          <Loader className="absolute left-2 top-2" color="white" size={22} />
        </div>
      </div>
      <div className="flex gap-1">
        {storageData.map((week, i) => (
          <div key={`week-${i}`} className="flex flex-col gap-1">
            {week.map((storageCount, j) => (
              <div
                key={`week-${i}-day-${j}`}
                className={`h-2 w-2 rounded-[2px] ${getColor(storageCount)}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between font-bold text-gray-600">
        <div className="flex gap-1">
          <p className="text-purple-400">5.90</p>|<p className="text-pink-400">2.15</p>|
          <p className="text-blue-400">2.59</p>
        </div>
        <div className="text-gray-300">GB</div>
      </div>
    </div>
  );
}
