"use client";

import Link from "next/link";

import { Icons } from "@/components/icons";

export function MainNav() {
  return (
    <div className="me-4 ms-2 hidden md:flex">
      <Link href="/" className="flex items-center space-x-2">
        <span className="origin-[top_center] animate-[swing] transition-all duration-1000 ease-in-out direction-alternate repeat-[2]">
          <Icons.logo className="h-6 w-6" />
        </span>
      </Link>
    </div>
  );
}
