"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarNavItem } from "@/types";

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
              {item?.items?.length &&
                item.items.map((item) => (
                  <SelectItem key={item.href} value={item.href ?? item.title}>
                    {!item.disabled &&
                      (item.href ? (
                        <Link href={item.href} className="text-muted-foreground">
                          {item.title}
                          {item.label && (
                            <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                              {item.label}
                            </span>
                          )}
                        </Link>
                      ) : (
                        item.title
                      ))}
                  </SelectItem>
                ))}
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
