"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types";

import { Icons } from "./icons";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();
  const [closed, setClosed] = useState(new Set<string>());

  useEffect(() => {
    setClosed((current) => {
      const next = new Set(current);
      // Open the current section if one of the child pages is active
      const path = "/docs/" + pathname.split("/")[1];
      if (next.has(path)) {
        next.delete(path);
      }
      return next;
    });

    const node = document.querySelector(`[href="${pathname}"]`);
    if (node) {
      node.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  }, [pathname]);

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => {
        const isOpen = !closed.has(item.href ?? item.title);
        const Icon = item.icon && Icons[item.icon as keyof typeof Icons];

        const toggle = () => {
          setClosed((prev) => {
            const next = new Set(prev);
            if (isOpen) {
              next.add(item.href ?? item.title);
            } else {
              next.delete(item.href ?? item.title);
            }
            return next;
          });
        };

        const specialHeaderCount = 2; // Getting started & contributing;

        return (
          <div key={index}>
            <Link
              href={item.href ?? (item.items?.[0].href as string)}
              className="cursor-pointer"
              onClick={toggle}
            >
              <h4 className="mb-1 flex items-center gap-1 rounded-md py-1 pr-2 text-sm font-semibold">
                {Icon ? (
                  <Icon className="w-4" />
                ) : (
                  <ChevronDown
                    className={cn("w-4 transform transition-all hover:opacity-50", {
                      "-rotate-90": !isOpen,
                    })}
                  />
                )}
                {item.title}
                {Boolean(item.items?.length || item.label) && index >= specialHeaderCount && (
                  <span className="flex aspect-square items-center justify-center rounded-full bg-gray-200 px-1 py-0.5 text-[10px] leading-none text-[#000000] no-underline">
                    {item.label || item.items?.length}
                  </span>
                )}
              </h4>
            </Link>
            {!!item?.items?.length && (
              <div
                className={cn("pb-3 pl-3", {
                  hidden: !isOpen,
                })}
              >
                <DocsSidebarNavItems items={item.items} pathname={pathname} />
              </div>
            )}
            {index === specialHeaderCount - 1 && (
              <div className="mb-1 mt-2 pl-4 text-xs font-semibold uppercase text-muted-foreground">
                COMPONENTS
              </div>
            )}
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

export function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 capitalize hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href
                ? "bg-muted font-normal text-foreground"
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
