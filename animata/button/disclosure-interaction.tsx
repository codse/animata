import React, { useState } from "react";
import { Calendar, ClipboardList, FileText, Flag, Folder, Trophy, XCircle } from "lucide-react";

const DisclosureInteraction: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Toggle function to show and hide the sheet
  const toggleSheet = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative inline-block text-center">
      <h1 className="mb-8 text-xl font-semibold">Create New</h1>

      {/* Main button to trigger the expansion, shifted down with more margin */}
      <button
        className="mb-12 rounded-lg bg-[#f9f7f3] px-4 py-2 text-lg shadow-md transition hover:bg-[#f1e9dd]"
        onClick={toggleSheet}
      >
        Create New +
      </button>

      {/* Disclosure sheet (only shown if isExpanded is true) */}
      {isExpanded && (
        <div className="absolute left-1/2 top-0 mt-4 w-80 -translate-x-1/2 transform rounded-2xl bg-white shadow-lg">
          {/* Header Section (lighter beige background) */}
          <div className="flex items-center justify-between rounded-t-2xl bg-[#faf5e9] px-4 py-3">
            <span className="font-semibold text-gray-700">Create New</span>
            {/* Close button using icon */}
            <button className="text-gray-500 hover:text-gray-700" onClick={toggleSheet}>
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          {/* Body Section (white background with rounded icons and grid layout) */}
          <div className="grid grid-cols-3 gap-4 rounded-b-2xl bg-white px-6 py-4">
            <button className="flex flex-col items-center space-y-1 rounded-lg p-3 text-gray-600 transition hover:bg-[#f1e9dd]">
              <Folder className="h-6 w-6" />
              <span className="text-sm">Project</span>
            </button>
            <button className="flex flex-col items-center space-y-1 rounded-lg p-3 text-gray-600 transition hover:bg-[#f1e9dd]">
              <ClipboardList className="h-6 w-6" />
              <span className="text-sm">Task</span>
            </button>
            <button className="flex flex-col items-center space-y-1 rounded-lg p-3 text-gray-600 transition hover:bg-[#f1e9dd]">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Note</span>
            </button>
            <button className="flex flex-col items-center space-y-1 rounded-lg p-3 text-gray-600 transition hover:bg-[#f1e9dd]">
              <Trophy className="h-6 w-6" />
              <span className="text-sm">Goal</span>
            </button>
            <button className="flex flex-col items-center space-y-1 rounded-lg p-3 text-gray-600 transition hover:bg-[#f1e9dd]">
              <Flag className="h-6 w-6" />
              <span className="text-sm">Milestone</span>
            </button>
            <button className="flex flex-col items-center space-y-1 rounded-lg p-3 text-gray-600 transition hover:bg-[#f1e9dd]">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Reminder</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisclosureInteraction;
