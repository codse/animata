"use client";
import { Loader } from "lucide-react";
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
      <div className="text-foreground">
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
                <SelectLabel>{item.title}</SelectLabel>
                {item?.items?.map((subItem) => {
                  if (subItem.items?.length) {
                    return (
                      <SelectGroup key={subItem.href}>
                        <SelectSeparator />
                        <SelectLabel>{subItem.title}</SelectLabel>
                        {subItem.items.map((child) => (
                          <SelectItem key={child.href} value={child.href ?? child.title}>
                            {child.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    );
                  }
                  return (
                    <SelectItem key={subItem.href} value={subItem.href ?? subItem.title}>
                      {!subItem.disabled && (
                        <span className="inline-flex items-center gap-1">
                          {subItem.title}
                          {subItem.label ? (
                            <span className="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000]">
                              {subItem.label}
                            </span>
                          ) : null}
                        </span>
                      )}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      {navigating && (
        <div className="px-1">
          <Loader className="inline-block size-4 animate-spin" />
        </div>
      )}
    </>
  );
}
