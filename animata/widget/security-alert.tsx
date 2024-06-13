import { LucideTriangleAlert, TriangleAlert } from "lucide-react";
import React from "react";

interface SecurityAlertProps {
  riskValue: string;
  time: string;
  numberOfIssue: number;
}

const SecurityAlert = ({
  riskValue,
  time,
  numberOfIssue,
}: SecurityAlertProps) => {
  return (
    <div className="flex min-h-40 w-52 flex-col items-center gap-1 overflow-hidden rounded-2xl bg-black">
      <div className="bg-striped h-5 w-full"></div>
      <div className="mt-1 text-lg text-gray-300">Security is at Risk</div>
      <div className="text-2xl font-bold text-white">{riskValue}</div>
      <div className="flex items-center gap-2">
        <div className="text-gray-400">{time} ago</div>
        <div className="rounded-lg bg-[#3B3A3D] px-2 py-1 text-gray-500">
          Quick scan
        </div>
      </div>
      <div className="shadow-glow animate-blink-red mb-4 mt-2 flex items-center justify-center gap-2 rounded-2xl border-[3px] border-red-500 bg-[#EF444450] px-10 py-2 font-bold">
        <TriangleAlert
          enableBackground={1}
          color="#0004"
          fill="rgb(239, 68, 68)"
        />
        <div className="text-red-500">{numberOfIssue} Items</div>
      </div>
    </div>
  );
};

export default SecurityAlert;
