import { cn } from "@/lib/utils";

export default function StorageStatus() {
  const total = 512;
  const system = 50;
  const audio = 100;
  const video = 130;
  const others = 40;
  const freeeSpace = total - (system + audio + video + +others);
  const free = freeeSpace < 0 ? 0 : freeeSpace;

  return (
    <div className="flex h-80 w-32 flex-col gap-1 rounded-md bg-black p-1 text-white">
      <Section label="Free" value={free} color="bg-gray-300" />
      <Section label="System" value={system} color="bg-slate-500" />
      <Section label="Audio" value={audio} color="bg-purple-500" />
      <Section label="Video" value={video} color="bg-orange-500" />
    </div>
  );
  function Section({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color: string;
  }) {
    return (
      <div
        className={cn(
          "relative w-full rounded-md transition-all",
          color,
          label === "Free" && "flex-1 text-gray-500",
        )}
        style={{ height: `${(value / total) * 100}%` }}
      >
        <div
          className={cn(
            "absolute left-full top-1/2 size-4 -translate-y-1/2 translate-x-1 rotate-45",
            color,
          )}
        ></div>
        <div
          className={cn(
            "absolute left-full top-1/2 flex w-20 -translate-y-1/2 translate-x-3 justify-center rounded-md",
            color,
          )}
        >
          <div className="relative px-3 py-2 font-bold">{value} GB</div>
        </div>
        <div className="flex h-full w-full items-center justify-center text-lg font-bold">
          {label}
        </div>
      </div>
    );
  }
}
