import { cn } from "@/lib/utils";

const brands = [
  {
    name: "Shopify",
    className: "bg-gray-200",
    hoverClass: "group-hover/pills:scale-75 group-hover/pills:text-gray-500",
  },
  {
    name: "RSS",
    className: "bg-gray-200 font-bold",
    hoverClass:
      "group-hover/pills:border-blue-500 group-hover/pills:text-blue-500 group-hover/pills:bg-white group-hover/pills:border-2",
  },
  {
    name: "Zapier",
    className: "bg-gray-200",
    hoverClass: "group-hover/pills:scale-75 group-hover/pills:text-gray-500",
  },
  {
    name: "Slack",
    className: "bg-gray-200",
    hoverClass: "group-hover/pills:scale-75 group-hover/pills:text-gray-500",
  },
  {
    name: "Webflow",
    className: "bg-gray-200",
    hoverClass: "group-hover/pills:scale-75 group-hover/pills:text-gray-500",
  },
  {
    name: "Squarespace",
    className: "bg-gray-200",
    hoverClass: "group-hover/pills:scale-75 group-hover/pills:text-gray-500",
  },
  {
    name: "Twitter",
    className: "bg-gray-200 font-bold",
    hoverClass:
      "group-hover/pills:border-green-500 group-hover/pills:text-green-500 group-hover/pills:bg-white group-hover/pills:border-2",
  },
  {
    name: "TikTok",
    className: "bg-gray-200",
    hoverClass: "group-hover/pills:scale-75 group-hover/pills:text-gray-500",
  },
  {
    name: "n8n",
    className: "bg-gray-200",
    hoverClass: "group-hover/pills:scale-75 group-hover/pills:text-gray-500",
  },
  {
    name: "BuySellAds",
    className: "bg-gray-200",
    hoverClass: "group-hover/pills:scale-75 group-hover/pills:text-gray-500",
  },
  {
    name: "Mastodon",
    className: "bg-gray-200 font-bold",
    hoverClass:
      "group-hover/pills:border-purple-500 group-hover/pills:text-purple-500 group-hover/pills:bg-white group-hover/pills:border-2",
  },
  {
    name: "Gumroad",
    className: "bg-gray-200",
    hoverClass: "group-hover/pills:scale-75 group-hover/pills:text-gray-500",
  },
];

export default function IntegrationPills() {
  return (
    <div className="flex justify-center py-10">
      {/* Rectangular box around all cards */}
      <div className="group/pills flex w-full max-w-lg flex-wrap justify-center rounded-xl border-2 border-gray-400 bg-gray-50 px-2 py-6 shadow-2xl transition duration-300 ease-in-out hover:bg-white hover:shadow-2xl">
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
