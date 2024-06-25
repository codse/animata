import React from "react";
import { TriangleAlert } from "lucide-react";

const SecurityAlert = () => {
  const riskValue = "139 532",
    time = "30m",
    numberOfIssue = 2;

  return (
    <div className="flex size-52 flex-col items-center gap-1 overflow-hidden rounded-3xl bg-black">
      <div className="h-5 w-full bg-striped" />
      <div className="flex h-full flex-col gap-1 px-4 pb-4">
        <div className="mt-1 px-4 text-lg text-gray-300">Security is at Risk</div>
        <div className="w-full text-center text-2xl font-bold text-white">{riskValue}</div>
        <div className="my-1 flex w-full flex-1 items-center justify-center gap-2">
          <div className="text-sm text-gray-400">{time} ago</div>
          <div className="rounded-lg bg-zinc-600 px-2 py-1 text-sm text-gray-300">Quick scan</div>
        </div>
        <div className="mt-auto flex animate-blink-red items-center justify-center gap-2 rounded-2xl border-2 border-red-500 px-10 py-2 font-bold">
          <TriangleAlert className="fill-red-500 stroke-red-800" />
          <div className="text-red-500">{numberOfIssue} Items</div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAlert;
