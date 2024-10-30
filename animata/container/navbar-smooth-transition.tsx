"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Send } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    name: "Overview",
    href: "#",
    hasDropdown: true,
    options: ["How does it Work?", "Personalized Benefits", "Insights"],
  },
  { name: "Why Tedy?", href: "#", hasDropdown: true, options: ["10 reasons Why", "Our Story"] },
  {
    name: "Resources",
    href: "#",
    hasDropdown: true,
    options: ["FAQ", "Help Center", "Blog"],
  },
  { name: "Demo", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function NavbarSmoothTransition() {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [hoveredDropdownItem, setHoveredDropdownItem] = React.useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [transformOrigin, setTransformOrigin] = React.useState("center");

  // Timeout reference for delaying the dropdown hide
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (e: React.MouseEvent, directionSetter: (origin: string) => void) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, height, width } = currentTarget.getBoundingClientRect();
    const isFromLeft = clientX - left < width / 2;
    const isFromBelow = clientY - top > height / 2;

    if (isFromLeft) {
      directionSetter("left");
    } else if (isFromBelow) {
      directionSetter("bottom");
    } else {
      directionSetter("center");
    }
  };

  const handleItemMouseEnter = (name: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredItem(name);
  };

  const handleItemMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredItem(null), 500);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md max-sm:h-52 max-sm:w-full">
      <div className="space-between container mx-auto flex h-16 items-center gap-24 px-4 md:h-20">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="mr-2 text-lg font-bold text-gray-900">
            Tedy
          </Link>
        </div>

        <nav className="hidden space-x-3 transition-all max-md:mt-1 max-md:space-x-1 sm:flex">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="group relative"
              onMouseEnter={() => handleItemMouseEnter(item.name)}
              onMouseLeave={handleItemMouseLeave}
            >
              <Link
                href={item.href}
                className={`inline-flex items-center text-sm font-medium transition-colors duration-300 ${
                  hoveredItem
                    ? hoveredItem === item.name
                      ? "text-black"
                      : "text-gray-400"
                    : "text-black"
                }`}
              >
                {item.name}
              </Link>
              {item.hasDropdown && (
                <div className="invisible absolute left-0 top-full mt-2 w-48 scale-95 transform rounded-lg bg-white py-2 opacity-0 shadow-lg shadow-black ring-1 ring-black ring-opacity-5 transition-opacity duration-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100 group-hover:delay-150">
                  {item.options.map((option) => (
                    <Link
                      key={option}
                      href="#"
                      className={`block px-4 py-2 text-sm transition-colors duration-300 ${
                        hoveredDropdownItem
                          ? hoveredDropdownItem === option
                            ? "text-black"
                            : "text-gray-400"
                          : "text-black"
                      }`}
                      onMouseEnter={() => setHoveredDropdownItem(option)}
                      onMouseLeave={() => setHoveredDropdownItem(null)}
                    >
                      {option}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center space-x-3 max-md:space-x-1 sm:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-2 inline-flex items-center bg-white text-sm text-gray-800 hover:text-gray-800">
                EN <ChevronDown className="ml-1 h-4 max-md:hidden" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg bg-white text-gray-800">
              <DropdownMenuItem className="cursor-pointer">EN</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">FR</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Request a Demo Button with Directional Bubble Effect */}
          <button
            className="group relative overflow-hidden rounded-full bg-pink-600 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-pink-400 max-md:rounded-sm max-md:px-1 max-md:py-1"
            onMouseEnter={(e) => handleMouseEnter(e, setTransformOrigin)}
            style={{ transformOrigin }}
          >
            <span className="relative z-10">Request a demo</span>
            <Send className="relative z-10 ml-2 inline-block h-4 w-4 fill-white" />
            <span
              className="absolute inset-0 scale-0 rounded-full bg-pink-700 transition-transform duration-500 group-hover:scale-110"
              style={{ transformOrigin }}
            ></span>
          </button>

          {/* Sign In Button with Directional Bubble Effect */}
          <button
            className="group relative overflow-hidden rounded-full border border-gray-300 bg-black px-6 py-2 text-sm font-medium text-gray-100 transition-colors duration-300 hover:bg-white hover:text-black max-md:rounded-sm max-md:px-1 max-md:py-1"
            onMouseEnter={(e) => handleMouseEnter(e, setTransformOrigin)}
            style={{ transformOrigin }}
          >
            <span className="relative z-10 max-md:text-sm">Sign in</span>
            <span
              className="absolute inset-0 scale-0 rounded-full bg-gray-100 transition-transform duration-500 group-hover:scale-110"
              style={{ transformOrigin }}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex items-center sm:hidden">
          <button
            className="text-gray-700"
            aria-label="Open mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div
            className="absolute inset-0 bg-gray-800 opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 mr-14 mt-7 w-1/4 bg-white px-4 py-2 shadow-lg">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-base font-medium text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
