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

type NavMenuProps =
  | {
      title: string;
      value?: never;
      sideBarNavItems?: never;
      baseRoute?: never;
    }
  | {
      title?: never;
      value: string;
      sideBarNavItems: SidebarNavItem[];
      baseRoute: "docs" | "blog";
    };

function NavMenuTitle({ title }: { title: string }) {
  return <span className="truncate font-medium text-foreground">{title}</span>;
}

function NavMenuSelect({
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
          onValueChange={(nextValue) => {
            if (nextValue) {
              setNavigating(true);
              router.push(nextValue);
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

function isSelectNavMenu(props: NavMenuProps): props is Extract<NavMenuProps, { value: string }> {
  return "value" in props && typeof props.value === "string";
}

export default function NavMenu(props: NavMenuProps) {
  if (isSelectNavMenu(props)) {
    return (
      <NavMenuSelect
        value={props.value}
        sideBarNavItems={props.sideBarNavItems}
        baseRoute={props.baseRoute}
      />
    );
  }

  return <NavMenuTitle title={props.title} />;
}
