// components/EmailCard.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const EmailCard = () => {
  const [fromEmail, setFromEmail] = useState("");
  const [toEmails, setToEmails] = useState<string[]>([""]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  const addToEmail = () => {
    setToEmails([...toEmails, ""]);
  };

  // Celebration Animation Config
  const celebrationAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="group relative w-full max-w-lg rounded-lg bg-gray-50 p-6 shadow-lg backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Upper card */}
      <div className="relative flex flex-col gap-4 rounded-lg border border-gray-300 bg-white p-6">
        <h2 className="text-xl font-bold">Send an Email</h2>
        <p className="text-base font-light">Fill out the details below to send an email.</p>

        <div className="flex flex-col gap-4">
          {/* From Email Input */}
          <div className="flex flex-col">
            <label className="font-medium">From</label>
            <input
              type="email"
              className="mt-1 rounded-md border border-gray-300 p-2"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {/* To Email Inputs */}
          <div className="flex flex-col">
            <label className="font-medium">To</label>
            {toEmails.map((email, index) => (
              <input
                key={index}
                type="email"
                className="mt-1 rounded-md border border-gray-300 p-2"
                value={email}
                onChange={(e) => {
                  const newEmails = [...toEmails];
                  newEmails[index] = e.target.value;
                  setToEmails(newEmails);
                }}
                placeholder="recipient@example.com"
              />
            ))}
            <button
              onClick={addToEmail}
              className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
            >
              + Add Email
            </button>
          </div>

          {/* Subject Input */}
          <div className="flex flex-col">
            <label className="font-medium">Subject</label>
            <input
              type="text"
              className="mt-1 rounded-md border border-gray-300 p-2"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject of the email"
            />
          </div>

          {/* Body Textarea */}
          <div className="flex flex-col">
            <label className="font-medium">Body</label>
            <textarea
              className="mt-1 h-24 rounded-md border border-gray-300 p-2"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your email here..."
            />
          </div>

          {/* Send Button */}
          <motion.button
            onClick={handleSend}
            className="mt-4 self-end rounded-full bg-gray-600 p-2 text-white hover:bg-green-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span role="img" aria-label="send">
              ➤
            </span>
          </motion.button>
        </div>
      </div>

      {/* Celebration Animation */}
      {isSent && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500 text-white"
          variants={celebrationAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="flex items-center gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold">Email Sent! 🎉</span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmailCard;
