import React from "react";

import { cn } from "@/lib/utils";

export const Card = ({ show, link }: { show: React.ReactNode; link: string }) => {
  const common = "absolute flex w-full h-full [backface-visibility:hidden]";

  return (
    <div className={cn("group relative h-60 w-52 [perspective:1000px]")}>
      {/* Back cover - static */}
      <div className={cn("absolute inset-0 h-full w-48 rounded-lg bg-gray-50 shadow-md")}></div>

      {/* Card container with slight book opening effect on hover */}
      <div
        className={cn(
          "relative z-10 h-full w-48 origin-left transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-30deg)]",
        )}
      >
        {/* Front side of the card */}
        <div className={cn("h-full w-full rounded-lg bg-white shadow-md", common)}>{show}</div>
      </div>

      {/* Sliding link/tab coming out from behind */}
      <div
        className={cn(
          "absolute bottom-0 right-0 flex h-48 w-14 -translate-x-10 transform items-start justify-start rounded-r-lg bg-green-600 pl-2 pt-2 text-xs font-bold text-white transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:rotate-[5deg]",
        )}
      >
        <a href={link} className="-rotate-90 whitespace-nowrap pb-16 pr-9">
          {" "}
          CLICK TO READ{" "}
        </a>{" "}
      </div>
    </div>
  );
};

// Sample usage of the Card component
export default function CaseStudyCard() {
  return (
    <div className="flex gap-8">
      {/* Example card */}
      <Card
        show={
          <div className="m-4 flex h-full items-start justify-center p-2 text-base font-bold leading-tight tracking-wide text-red-600">
            How Delivery Hero streamlines marketing reports across all their brands with Clarisights
          </div>
        }
        link={"#"}
      />

      {/* Another example card */}
      <Card
        show={
          <img
            className="rounded-lg"
            src="https://images.unsplash.com/photo-1472772224448-b24d00409675?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="HelloFresh Case Study"
          />
        }
        link={"#"}
      />
    </div>
  );
}
