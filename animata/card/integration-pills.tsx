import React from "react";

import { cn } from "@/lib/utils";

const brands = [
  {
    name: "Shopify",
    className: "bg-gray-200",
    hoverClass: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "RSS",
    className: "bg-gray-200 font-bold",
    hoverClass:
      "group-hover:border-blue-500 group-hover:text-blue-500 group-hover:bg-white group-hover:border-2",
  },
  {
    name: "Zapier",
    className: "bg-gray-200",
    hoverClass: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Slack",
    className: "bg-gray-200",
    hoverClass: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Webflow",
    className: "bg-gray-200",
    hoverClass: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Squarespace",
    className: "bg-gray-200",
    hoverClass: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Twitter",
    className: "bg-gray-200 font-bold",
    hoverClass:
      "group-hover:border-green-500 group-hover:text-green-500 group-hover:bg-white group-hover:border-2",
  },
  {
    name: "TikTok",
    className: "bg-gray-200",
    hoverClass: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "n8n",
    className: "bg-gray-200",
    hoverClass: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "BuySellAds",
    className: "bg-gray-200",
    hoverClass: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Mastodon",
    className: "bg-gray-200 font-bold",
    hoverClass:
      "group-hover:border-purple-500 group-hover:text-purple-500 group-hover:bg-white group-hover:border-2",
  },
  {
    name: "Gumroad",
    className: "bg-gray-200",
    hoverClass: "group-hover:scale-75 group-hover:text-gray-500",
  },
];

export default function IntegrationPills() {
  return (
    <div className="flex justify-center py-10">
      {/* Rectangular box around all cards */}
      <div className="group flex w-full max-w-lg flex-wrap justify-center rounded-xl border-2 border-gray-400 bg-gray-50 px-2 py-6 shadow-2xl transition-all duration-300 ease-in-out hover:bg-white hover:shadow-2xl">
        {brands.map((brand, index) => (
          <div
            key={index}
            className={cn(
              "m-1 transform cursor-pointer rounded-full border-2 border-gray-400 bg-white px-6 py-2 text-xl text-black transition-transform duration-300 ease-in-out",
              brand.className,
              brand.hoverClass,
            )}
          >
            {brand.name}
          </div>
        ))}
      </div>
    </div>
  );
}
