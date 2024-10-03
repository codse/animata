import React from "react";

const brands = [
  {
    name: "Shopify",
    defaultColor: "bg-gray-200",
    hoverColor: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "RSS",
    defaultColor: "bg-gray-200 font-semibold",
    hoverColor:
      " group-hover:border-blue-500 group-hover:text-blue-500 group-hover:bg-white group-hover:border-2",
  },
  {
    name: "Zapier",
    defaultColor: "bg-gray-200",
    hoverColor: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Slack",
    defaultColor: "bg-gray-200",
    hoverColor: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Webflow",
    defaultColor: "bg-gray-200",
    hoverColor: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Squarespace",
    defaultColor: "bg-gray-200",
    hoverColor: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Twitter",
    defaultColor: "bg-gray-200 font-semibold",
    hoverColor:
      " group-hover:border-green-500 group-hover:text-green-500 group-hover:bg-white group-hover:border-2",
  },
  {
    name: "TikTok",
    defaultColor: "bg-gray-200",
    hoverColor: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "n8n",
    defaultColor: "bg-gray-200",
    hoverColor: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "BuySellAds",
    defaultColor: "bg-gray-200",
    hoverColor: "group-hover:scale-75 group-hover:text-gray-500",
  },
  {
    name: "Mastodon",
    defaultColor: "bg-gray-200 font-semibold",
    hoverColor:
      " group-hover:border-purple-500 group-hover:text-purple-500 group-hover:bg-white group-hover:border-2",
  },
  {
    name: "Gumroad",
    defaultColor: "bg-gray-200",
    hoverColor: "group-hover:scale-75 group-hover:text-gray-500",
  },
];

export default function FeatureCardTsx() {
  return (
    <div className="flex justify-center py-10">
      {/* Rectangular box around all cards */}
      <div className="group flex w-full max-w-lg flex-wrap justify-center rounded-xl border-2 border-gray-400 bg-gray-50 px-2 py-6 shadow-2xl transition-all duration-300 ease-in-out hover:bg-white hover:shadow-2xl">
        {brands.map((brand, index) => (
          <div
            key={index}
            className={`m-1 transform cursor-pointer rounded-full border-2 border-gray-400 bg-white px-6 py-2 text-xl text-black transition-transform duration-300 ease-in-out ${brand.defaultColor} ${brand.hoverColor}`}
            style={{
              fontWeight:
                brand.name === "RSS" || brand.name === "Twitter" || brand.name === "Mastodon"
                  ? 600
                  : 500,
            }}
          >
            {brand.name}
          </div>
        ))}
      </div>
    </div>
  );
}
