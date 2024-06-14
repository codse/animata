import { TriangleAlert } from "lucide-react";
import React from "react";

const SecurityAlert = () => {
  const riskValue = "139 532",
    time = "16 : 30",
    numberOfIssue = 2;
  return (
    <div className="flex min-h-40 w-52 flex-col items-center gap-1 overflow-hidden rounded-2xl bg-black">
      <div className="h-5 w-full bg-striped"></div>
      <div className="mt-1 text-lg text-gray-300">Security is at Risk</div>
      <div className="text-2xl font-bold text-white">{riskValue}</div>
      <div className="flex items-center gap-2">
        <div className="text-gray-400">{time} ago</div>
        <div className="rounded-lg bg-zinc-600 px-2 py-1 text-gray-500">
          Quick scan
        </div>
      </div>
      <div className="mb-4 mt-2 flex animate-blink-red items-center justify-center gap-2 rounded-2xl border-2 border-red-500 px-10 py-2 font-bold">
        <TriangleAlert color="#0004" fill="#ef4444" />
        <div className="text-red-500">{numberOfIssue} Items</div>
      </div>
    </div>
  );
};

export default SecurityAlert;
