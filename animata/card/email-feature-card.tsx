"use client";

import React from "react";

const EmailCard = () => {
  return (
    <div className="group relative w-full max-w-lg rounded-lg bg-gray-50 p-6 shadow-lg backdrop-blur-sm transition-shadow duration-300 ease-in-out">
      {/* Upper card */}
      <div className="relative flex flex-col gap-4 rounded-lg border border-gray-300 bg-white p-6 transition-transform duration-200 ease-in-out group-hover:scale-95">
        <h2 className="text-xl font-bold">Send an Email</h2>
        <p className="text-base font-light">Fill out the details below to send an email.</p>

        {/* From Email (Static) */}
        <div className="flex flex-col">
          <label className="font-medium">From</label>
          <p className="mt-1 rounded-md border border-gray-300 p-2 bg-gray-100">you@example.com</p>
        </div>

        {/* To Email (Static) */}
        <div className="flex flex-col">
          <label className="font-medium">To</label>
          <p className="mt-1 rounded-md border border-gray-300 p-2 bg-gray-100">recipient@example.com</p>
        </div>

        {/* Subject (Static) */}
        <div className="flex flex-col">
          <label className="font-medium">Subject</label>
          <p className="mt-1 rounded-md border border-gray-300 p-2 bg-gray-100">The Pokemon I caught this week</p>
        </div>

        {/* Body (Static) */}
        <div className="flex flex-col">
          <label className="font-medium">Body</label>
          <p className="mt-1 h-24 rounded-md border border-gray-300 p-2 bg-gray-100">
            I caught a Charmander, a Squirtle, and a Bulbasaur this week!
          </p>
        </div>

        {/* Send Button (Static, purely for aesthetic purposes) */}
        <div className="mt-4 self-end rounded-full bg-gray-600 p-2 text-white cursor-pointer transition-colors duration-300 hover:bg-green-600">
          <span role="img" aria-label="send">
            ➤
          </span>
        </div>
      </div>

      {/* Hover Celebration Animation */}
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
          <span className="text-2xl font-bold">Email Sent! 🎉</span>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
