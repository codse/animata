import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NotificationProps {
  title: string;
  message: string;
  earnings: string;
  totalEarnings: string;
  RosettaLogo: React.FC;
}

export default function NotificationCard({
  title,
  message,
  earnings,
  totalEarnings,
  RosettaLogo,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const expandTimer = setTimeout(() => setIsExpanded(true), 500);
    const collapseTimer = setTimeout(() => setIsExpanded(false), 5000);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(collapseTimer);
    };
  }, []);

  return (
    <div className="h-[200px] w-[400px]">
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-[380px] cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg"
                initial={{ height: "48px" }}
                animate={{ height: isExpanded ? "auto" : "48px" }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <motion.div
                  className="flex items-center p-2"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isExpanded ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <RosettaLogo />
                  <h2 className="ml-2 text-lg font-normal text-gray-500">{title}</h2>
                </motion.div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: -40 }}
                      transition={{ duration: 0 }}
                      className="mr-2 px-2"
                    >
                      <div className="mb-2 flex items-center">
                        <RosettaLogo />
                        <h2 className="ml-2 text-lg font-normal text-gray-500">{title}</h2>
                      </div>
                      <div className="flex">
                        <div className="ml-4 w-px bg-gray-300"></div>
                        <div className="ml-6">
                          <p className="mb-4 text-sm">
                            <p className="font-bold">{message}</p>
                          </p>
                          <div className="mr-2 mt-2 rounded-xl bg-[#f3f1ed] p-2 text-sm">
                            <p>
                              {`You've earned ${earnings} because a new doctor LLM used your knowledge.`}
                            </p>
                            <p className="mt-1 font-semibold">{`This week's total: ${totalEarnings}`}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
