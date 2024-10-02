"use client";

import { useState } from "react";

const platforms = [
  { name: "Shopify" },
  { name: "RSS", highlight: true, color: "blue" },
  { name: "Zapier" },
  { name: "Slack" },
  { name: "Webflow" },
  { name: "Squarespace" },
  { name: "Twitter", highlight: true, color: "green" },
  { name: "TikTok" },
  { name: "n8n" },
  { name: "BuySellAds" },
  { name: "Mastodon", highlight: true, color: "red" },
  { name: "Gumroad" },
];

export default function FeatureCard() {
  const [isHovered, setIsHovered] = useState(false);

  const getButtonClasses = ({
    highlight = false,
    color,
  }: {
    name: string;
    highlight?: boolean;
    color?: string;
  }) => {
    const baseClasses = "px-5 py-3 rounded-full transition-all duration-400 ease-in-out";
    const fontWeight = highlight ? "font-bold" : "font-normal";

    if (highlight) {
      return isHovered
        ? `${baseClasses} ${fontWeight}   border-2 border-${color}-500  text-${color}-500 `
        : `${baseClasses} ${fontWeight} text-gray-600 border-2 border-gray-200`;
    }
    return isHovered
      ? `${baseClasses} ${fontWeight} text-gray-500 border-2 border-gray-200 transform scale-90 opacity-50`
      : `${baseClasses} ${fontWeight} text-gray-600 border-2 border-gray-200`;
  };

  return (
    <div
      className="flex flex-wrap gap-4 bg-white p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {platforms.map((platform) => (
        <button key={platform.name} className={getButtonClasses(platform)}>
          {platform.name}
        </button>
      ))}
    </div>
  );
}
