import { useEffect, useRef, useState } from "react";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { EyeOpenIcon, GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

export default function InteractiveNavBar() {
  const [activeItem, setActiveItem] = useState<string>();
  const menuRef = useRef<HTMLDivElement>(null);
  const [viewportPosition, setViewportPosition] = useState({ left: "50%" });

  useEffect(() => {
    if (!activeItem || !menuRef.current) {
      return;
    }

    const activeElement = menuRef.current.querySelector('[data-state="open"]');
    if (!activeElement) {
      return;
    }

    const menuRect = menuRef.current.getBoundingClientRect();
    const activeRect = activeElement.getBoundingClientRect();
    const newLeft = activeRect.left + activeRect.width / 2 - menuRect.left;
    setViewportPosition({ left: `${newLeft}px` });
  }, [activeItem]);

  return (
    <NavigationMenuPrimitive.Root
      ref={menuRef}
      onValueChange={setActiveItem}
      value={activeItem}
      className="relative mt-32 flex max-w-max flex-1 flex-col items-center justify-center"
    >
      <NavigationMenuList className="rounded-lg p-1 shadow-lg">
        <NavigationMenuItem value="wip">
          <NavigationMenuTrigger>WIP</NavigationMenuTrigger>
          <NavigationMenuContent className="p-1">
            <div className="h-12 w-24 rounded-xl bg-red-50" />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <Separator orientation="vertical" className="h-6 bg-gray-300" />
        <NavigationMenuItem value="shop">
          <NavigationMenuTrigger>SHOP</NavigationMenuTrigger>
          <NavigationMenuContent className="p-1">
            <div className="h-12 w-24 rounded-xl bg-blue-50" />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="work">
          <NavigationMenuTrigger>WORK</NavigationMenuTrigger>
          <NavigationMenuContent className="p-1">
            <div className="h-12 w-24 rounded-xl bg-green-50" />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <Separator orientation="vertical" className="h-6 bg-gray-300" />
        <NavigationMenuItem value="x">
          <div className="flex gap-4 px-2">
            <InstagramLogoIcon width={24} height={24} />
            <GitHubLogoIcon width={24} height={24} />
          </div>
        </NavigationMenuItem>
        <Separator orientation="vertical" className="h-6 bg-gray-300" />
        <NavigationMenuItem value="about">
          <NavigationMenuTrigger>ABOUT</NavigationMenuTrigger>
          <NavigationMenuContent className="p-1">
            <div className="h-12 w-24 rounded-xl bg-green-50" />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <div>
          <EyeOpenIcon width={24} height={24} />
        </div>
      </NavigationMenuList>
      <NavigationMenuViewport
        className="menu-container pointer-events-none -top-28 w-fit -translate-x-1/2 gap-4 transition-all duration-300 ease-in-out"
        style={{
          ...viewportPosition,
        }}
      />
    </NavigationMenuPrimitive.Root>
  );
}
