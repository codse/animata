import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface NoticeCardProps {
  acceptText?: string;
  title?: string;
  description?: string;
}

export default function NoticeCard({
  acceptText = "Accept",
  title = "To your attention!",
  description = "Due to severe weather conditions, we will be closed from 11th to 14th of January.",
}: NoticeCardProps) {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const handleClick = () => {
    setIsAccepted(!isAccepted);
  };
  
  const bgClass = isAccepted
    ? "bg-green-300"
    : "bg-gradient-to-r from-slate-50 via-slate-50 to-green-100";

  return (
    <div className="flex items-center justify-center">
      {/* Outer container with breathing scaling effect */}
      <div className="relative max-w-md p-2">
        {/* Mid-level static container */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-white shadow-xl"
          animate={{ scale: isAccepted ? 0.97 : 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
          }}
        />

        {/* Stable inner content */}
        <div className="relative z-10 rounded-3xl p-6 text-center shadow-md" onClick={handleClick}>
          <div className="flex min-w-36 flex-col items-center">
            {/* Icon */}
            <div>
              <svg
                className="h-10 w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 246.027 246.027"
                stroke="#fff"
              >
                <path
                  d="M242.751,196.508L143.937,25.358c-4.367-7.564-12.189-12.081-20.924-12.081c-8.735,0-16.557,4.516-20.924,12.081
                L3.276,196.508c-4.368,7.564-4.368,16.596,0,24.161s12.189,12.081,20.924,12.081h197.629c8.734,0,16.556-4.516,20.923-12.08
                C247.119,213.105,247.118,204.073,242.751,196.508z M123.014,204.906c-8.672,0-15.727-7.055-15.727-15.727
                c0-8.671,7.055-15.726,15.727-15.726s15.727,7.055,15.727,15.726C138.74,197.852,131.685,204.906,123.014,204.906z M138.847,137.68
                c0,8.73-7.103,15.833-15.833,15.833s-15.833-7.103-15.833-15.833V65.013c0-4.142,3.358-7.5,7.5-7.5h16.667
                c4.143,0,7.5,3.358,7.5,7.5V137.68z"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="mt-2 text-xl font-bold">{title}</h2>

            {/* Description */}
            <p className="mt-2 text-gray-600">{description}</p>

            {/* Toggle Button */}
            <div
              className={cn(
                "relative mt-4 flex h-12 w-4/5 cursor-pointer items-center rounded-xl px-2 py-1 transition-colors duration-300",
                bgClass,
              )}
            >
              {/* Toggle Handle */}
              <div
                className={`h-10 w-1/2 transform rounded-lg bg-white shadow-lg drop-shadow-md transition-transform duration-500 ${
                  isAccepted ? "translate-x-full" : ""
                }`}
              ></div>

              {/* Accept Text */}
              <span
                className={`absolute right-4 transform font-bold text-green-800 transition-transform duration-500 ${
                  isAccepted ? "opacity-0" : "opacity-100"
                }`}
              >
                <svg
                  className="mr-1 inline-block h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  viewBox="0 0 48 48"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m24 8-2.83 2.83L32.34 22H8v4h24.34L21.17 37.17 24 40l16-16z"
                  />
                </svg>
                {acceptText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
