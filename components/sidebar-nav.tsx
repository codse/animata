"use client";

import { SidebarNavItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();
  const [closed, setClosed] = useState(new Set());

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => {
        const isOpen = !closed.has(item.title);
        return (
          <div key={index}>
            <Link
              key={index}
              href={item.href ?? (item.items?.[0].href as string)}
            >
              <h4 className="mb-1 flex items-center gap-1 rounded-md py-1 pr-2 text-sm font-semibold">
                <ChevronDown
                  className={cn("transform transition-all hover:opacity-50", {
                    "-rotate-90": !isOpen,
                  })}
                  onClick={() => {
                    setClosed((prev) => {
                      const next = new Set(prev);
                      if (isOpen) {
                        next.add(item.title);
                      } else {
                        next.delete(item.title);
                      }
                      return next;
                    });
                  }}
                  size={16}
                />
                {item.title}
                {Boolean(item.items?.length) && index !== 0 && (
                  <span className="flex aspect-square items-center justify-center rounded-full bg-gray-200 px-1 py-0.5 text-[10px] leading-none text-[#000000] no-underline">
                    {item.items?.length}
                  </span>
                )}
              </h4>
            </Link>
            <div
              className={cn("pb-3 pl-3", {
                hidden: !isOpen,
              })}
            >
              {item?.items?.length && (
                <DocsSidebarNavItems items={item.items} pathname={pathname} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href
                ? "font-normal text-foreground"
                : "text-muted-foreground",
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-lime-300 px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        ),
      )}
    </div>
  ) : null;
}
