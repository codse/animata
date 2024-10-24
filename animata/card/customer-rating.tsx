"use client";
import { useState } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface CustomerRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  imageUrl: string;
  rating: number;
}
export const poppins = Poppins({
  subsets: ["latin"],
  weight: "700",
});

const CustomerRating: React.FC<CustomerRatingProps> = ({
  name,
  rating,
  imageUrl,
}: CustomerRatingProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        poppins.className,
        "w-80 rounded-3xl border border-gray-400 bg-white pl-8 pr-8 text-black shadow-md",
        "transform transition-transform duration-300",
        { "scale-105": hovered, "scale-100": !hovered }, // Conditional scaling
      )}
    >
      {/* Customer Image and Name */}
      <div className="mb-4 mt-8 flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            className="rounded-full object-cover"
            src={imageUrl}
            alt={name}
            width={50}
            height={50}
            loading="lazy"
          />
        </div>

        <div>
          <h6 className="text-lg font-medium">{name}</h6>
          <span className="mt-2 text-xl font-extrabold text-gray-700">{rating}%</span>
        </div>
      </div>

      {/* Rating Bar */}
      <div className="mb-8 mt-4 flex w-full items-center justify-start">
        <div
          className={cn(
            "relative h-4 overflow-hidden rounded-full bg-gray-300 transition-all duration-300",
            { "w-full": hovered, "w-10": !hovered },
          )}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-green-600 transition-all duration-300"
            style={{ width: hovered ? `${rating}%` : "0%" }} // Dynamically set width
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerRating;
