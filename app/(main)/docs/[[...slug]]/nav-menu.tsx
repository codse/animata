"use client";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SidebarNavItem } from "@/types";

export default function NavMenu({
  value,
  sideBarNavItems,
  baseRoute,
}: {
  value: string;
  sideBarNavItems: SidebarNavItem[];
  baseRoute: "docs" | "blog";
}) {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);
  return (
    <>
      <Select
        defaultValue={`/${baseRoute}${value ? `/${value}` : ""}`}
        onValueChange={(value) => {
          if (value) {
            setNavigating(true);
            router.push(value);
          }
        }}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Change page" />
        </SelectTrigger>
        <SelectContent>
          {sideBarNavItems.map((item, index) => (
            <SelectGroup key={index}>
              <SelectLabel className="font-medium">{item.title}</SelectLabel>
              {item?.items?.map((subItem) => {
                if (subItem.items?.length) {
                  return (
                    <SelectGroup key={subItem.href}>
                      <SelectSeparator />
                      <SelectLabel className="font-medium">{subItem.title}</SelectLabel>
                      {subItem.items.map((child) => (
                        <SelectItem key={child.href} value={child.href ?? child.title}>
                          {child.href ? (
                            <Link href={child.href} className="text-muted-foreground">
                              {child.title}
                            </Link>
                          ) : (
                            child.title
                          )}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  );
                }
                return (
                  <SelectItem key={subItem.href} value={subItem.href ?? subItem.title}>
                    {!subItem.disabled &&
                      (subItem.href ? (
                        <Link href={subItem.href} className="text-muted-foreground">
                          {subItem.title}
                          {subItem.label && (
                            <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                              {subItem.label}
                            </span>
                          )}
                        </Link>
                      ) : (
                        subItem.title
                      ))}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      {navigating && (
        <div className="px-1">
          <Loader className="inline-block size-4 animate-spin" />
        </div>
      )}
    </>
  );
}
