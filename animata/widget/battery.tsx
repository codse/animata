import { useEffect, useRef } from "react";
import { BatteryMediumIcon } from "lucide-react";

const Battery = () => {
  const batterylevel = 50;
  const circumference = 2 * Math.PI * 40;
  const gap = ((100 - batterylevel) / 100) * circumference;

  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = "stroke-dashoffset 2s linear";
      circleRef.current.style.strokeDashoffset = String(gap);
    }
  }, [gap]);

  return (
    <div className="size-52 rounded-xl bg-opacity-25 bg-gradient-to-br from-blue-100 to-blue-500">
      <div className="relative m-1 size-24">
        <svg viewBox="0 0 100 100" className="absolute size-full">
          <circle
            cx={50}
            cy={50}
            r={40}
            stroke="#5d5"
            strokeWidth={8}
            fill="none"
          />
          <circle
            ref={circleRef}
            cx={50}
            cy={50}
            r={40}
            stroke="#2a2"
            strokeWidth={8}
            fill="none"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex size-full items-center justify-center">
          <BatteryMediumIcon className="text-green-800" size={36} />
        </div>
      </div>
      <div className="text-center text-4xl font-bold text-gray-700">
        {batterylevel}%
      </div>
    </div>
  );
};

export default Battery;
