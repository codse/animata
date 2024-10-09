"use client";
import React from "react";
import { motion } from "framer-motion";

interface NotificationCardProps {
  aiName?: string;
  userName?: string;
  paperTopic?: string;
  doctorName?: string;
  earnings?: string;
  weekTotal?: string;
}

export default function NotifyUserInfo({
  aiName = "AI name",
  userName = "User",
  paperTopic = "general topic",
  doctorName = "AI Doctor",
  earnings = "$0.20c",
  weekTotal = "$400",
}: NotificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6,
      }}
      className="relative mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md"
      role="alert"
      aria-live="polite"
    >
      <div className="p-4">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.3,
          }}
          className="relative mb-4 flex items-center"
        >
          <div className="relative mr-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-800 text-xl font-bold text-white">
              {aiName[0]}
            </div>
          </div>

          <span className="text-lg font-semibold text-muted-foreground">{aiName}</span>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "calc(100% - 20px)" }}
            transition={{
              delay: 1.0,
              duration: 0.6,
              ease: "easeInOut",
            }}
            className="absolute left-[19px] top-0 mt-3 w-1 bg-gray-100"
          />

          {/* Animated Content Wrapper */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{
              delay: 1.0,
              duration: 0.8,
              type: "tween",
            }}
            style={{ overflow: "hidden" }}
          >
            {/* Animated Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.6,
              }}
              className="mb-4 pl-12 text-gray-700 dark:text-gray-300"
            >
              <p className="text-black">
                Hey {userName}, your paper on {paperTopic} was used by{" "}
                <span className="underline" style={{ color: "#006622" }}>
                  {doctorName}
                </span>{" "}
                to give an assessment to a patient today.
              </p>
            </motion.div>

            {/* Earnings Notification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.4,
                duration: 0.6,
              }}
              className="ml-12 rounded-md p-3"
              style={{ backgroundColor: "#EFECE7" }}
            >
              <div className="flex items-start">
                <p className="text-sm" style={{ color: "#4C4843" }}>
                  You&apos;ve earned {earnings} because a new doctor LLM used your knowledge. This
                  week&apos;s total: {weekTotal}.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
