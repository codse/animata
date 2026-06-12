"use client";

import { ChevronDown, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SidebarNavItem } from "@/types";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
  className?: string;
  /** Docs layout: filter bar + scroll-driven edge fade. Blog keeps the simple list. */
  variant?: "docs" | "plain";
}

const SPECIAL_HEADER_TITLES = new Set(["Getting Started", "Contributing"]);

function isSpecialHeader(item: SidebarNavItem) {
  return SPECIAL_HEADER_TITLES.has(item.title);
}

function findSidebarLink(pathname: string, root: ParentNode = document) {
  return Array.from(root.querySelectorAll("[data-sidebar-link]")).find(
    (element) => element.getAttribute("data-sidebar-link") === pathname,
  );
}

function normalizeForFilter(value: string) {
  return value
    .toLowerCase()
    .replace(/[-_/\\s]+/g, " ")
    .trim();
}

function matchesFilter(query: string, ...parts: Array<string | undefined>) {
  const tokens = normalizeForFilter(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) {
    return true;
  }

  const haystack = normalizeForFilter(parts.filter(Boolean).join(" "));
  return tokens.every((token) => haystack.includes(token));
}

function collectSearchParts(item: SidebarNavItem): string[] {
  return [item.title, item.href ?? "", ...(item.items?.flatMap(collectSearchParts) ?? [])];
}

function filterSidebarItems(items: SidebarNavItem[], query: string): SidebarNavItem[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return items;
  }

  return items.reduce<SidebarNavItem[]>((acc, item) => {
    const categoryMatches = matchesFilter(trimmed, ...collectSearchParts(item));
    const filteredChildren = item.items ? filterNestedItems(item.items, trimmed) : [];

    if (categoryMatches) {
      acc.push(item);
      return acc;
    }

    if (filteredChildren.length) {
      acc.push({ ...item, items: filteredChildren });
    }

    return acc;
  }, []);
}

function filterNestedItems(items: SidebarNavItem[], query: string): SidebarNavItem[] {
  return items.reduce<SidebarNavItem[]>((acc, item) => {
    const childMatches = matchesFilter(query, ...collectSearchParts(item));
    const filteredChildren = item.items ? filterNestedItems(item.items, query) : [];

    if (childMatches) {
      acc.push(item);
      return acc;
    }

    if (filteredChildren.length) {
      acc.push({ ...item, items: filteredChildren });
    }

    return acc;
  }, []);
}

function isCategoryActive(item: SidebarNavItem, pathname: string | null): boolean {
  if (!pathname) {
    return false;
  }

  if (item.href && pathname === item.href) {
    return true;
  }

  return item.items?.some((child) => isCategoryActive(child, pathname)) ?? false;
}

function getCategoryKey(item: SidebarNavItem) {
  return item.href ?? item.title;
}

function useSidebarScrollEdges(enabled: boolean) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });

  const updateEdges = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    const { scrollTop, clientHeight, scrollHeight } = node;
    const overflow = scrollHeight - clientHeight > 1;

    setEdges({
      top: overflow && scrollTop > 1,
      bottom: overflow && scrollTop + clientHeight < scrollHeight - 1,
    });
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    updateEdges();

    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    node.addEventListener("scroll", updateEdges, { passive: true });
    const resizeObserver = new ResizeObserver(updateEdges);
    resizeObserver.observe(node);

    const content = node.firstElementChild;
    if (content) {
      resizeObserver.observe(content);
    }

    return () => {
      node.removeEventListener("scroll", updateEdges);
      resizeObserver.disconnect();
    };
  }, [enabled, updateEdges]);

  return { scrollerRef, edges, updateEdges };
}

export function DocsSidebarNav({ items, variant = "docs", className }: DocsSidebarNavProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [closed, setClosed] = useState(new Set<string>());
  const { scrollerRef, edges, updateEdges } = useSidebarScrollEdges(variant === "docs");

  const filteredItems = useMemo(() => filterSidebarItems(items, query), [items, query]);
  const isFiltering = query.trim().length > 0;

  useEffect(() => {
    setClosed((current) => {
      const next = new Set(current);
      const segments = pathname.split("/").filter(Boolean);
      const categorySlug = segments[1];

      if (categorySlug) {
        next.delete(`/docs/${categorySlug}`);
      }

      for (const item of items) {
        if (isCategoryActive(item, pathname)) {
          next.delete(getCategoryKey(item));
        }
      }

      return next;
    });

    const node = findSidebarLink(pathname);
    node?.scrollIntoView({ behavior: "instant", block: "nearest" });
    updateEdges();
  }, [items, pathname, updateEdges]);

  const toggleSection = (key: string) => {
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const navList = filteredItems.length ? (
    <div className="w-full pb-4">
      {filteredItems.map((item) => {
        const sectionKey = getCategoryKey(item);
        const isOpen = isFiltering || !closed.has(sectionKey);
        const categoryHref = item.href ?? item.items?.[0]?.href;
        const isActive = isCategoryActive(item, pathname);
        const hasChildren = Boolean(item.items?.length || item.label);

        const toggle = () => toggleSection(sectionKey);

        return (
          <div key={sectionKey}>
            <div className="mb-1 flex items-center gap-0.5 rounded-md py-1 pr-2">
              {item.items?.length ? (
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-label={isOpen ? `Collapse ${item.title}` : `Expand ${item.title}`}
                  onClick={toggle}
                  className="rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <ChevronDown
                    className={cn("size-4 shrink-0 transition-transform", {
                      "-rotate-90": !isOpen,
                    })}
                  />
                </button>
              ) : (
                <span className="size-5 shrink-0" aria-hidden="true" />
              )}

              {categoryHref ? (
                <Link
                  href={categoryHref}
                  data-sidebar-link={categoryHref}
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-1 text-sm font-semibold hover:underline",
                    isActive ? "text-foreground" : "text-foreground/90",
                  )}
                >
                  <span className="truncate">{item.title}</span>
                  {hasChildren && !isSpecialHeader(item) ? (
                    <span className="flex aspect-square shrink-0 items-center justify-center rounded-full bg-muted px-1 py-0.5 text-[10px] leading-none text-muted-foreground no-underline">
                      {item.label || item.items?.length}
                    </span>
                  ) : null}
                </Link>
              ) : (
                <span className="flex min-w-0 flex-1 items-center gap-1 text-sm font-semibold text-foreground">
                  <span className="truncate">{item.title}</span>
                </span>
              )}
            </div>

            {item.items?.length ? (
              <div
                className={cn("pb-3 pl-3", {
                  hidden: !isOpen,
                })}
              >
                <DocsSidebarNavItems items={item.items} pathname={pathname} />
              </div>
            ) : null}

            {item.title === "Contributing" ? (
              <div className="mt-2 mb-1 pl-5.5 text-xs font-semibold text-muted-foreground uppercase">
                Components
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  ) : (
    <p className="px-1 text-sm text-muted-foreground">No matches for &ldquo;{query}&rdquo;</p>
  );

  if (variant === "plain") {
    return items.length ? navList : null;
  }

  return items.length ? (
    <div className={cn("grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)]", className)}>
      <div className="pr-6 pb-3">
        <div className="relative translate-x-px translate-y-0.5">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter docs..."
            className="h-8 rounded-lg bg-[hsl(var(--surface-alt))] pl-8 pr-8 text-sm shadow-none"
            aria-label="Filter documentation"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
              aria-label="Clear filter"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="relative min-h-0 overflow-hidden">
        <div
          ref={scrollerRef}
          className="docs-sidebar-scroller absolute inset-0 overflow-y-auto overscroll-contain pr-6"
        >
          {navList}
        </div>
        <div
          aria-hidden
          className={cn(
            "docs-sidebar-fade-top pointer-events-none absolute inset-x-0 top-0 z-10 h-8 transition-opacity duration-150",
            edges.top ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "docs-sidebar-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 transition-opacity duration-150",
            edges.bottom ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </div>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid auto-rows-max grid-flow-row gap-0.5 text-sm font-normal text-foreground">
      {items.map((item) => {
        const itemKey = item.href ?? item.title;

        if (item.href && !item.disabled) {
          return (
            <Link
              key={itemKey}
              href={item.href}
              data-sidebar-link={item.href}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 capitalize hover:underline",
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href ? "bg-muted" : undefined,
              )}
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noreferrer" : ""}
            >
              <span className="truncate">{item.title}</span>
              {item.label ? (
                <span className="ml-2 rounded-md bg-[var(--footer-gold)] px-1.5 py-0.5 text-xs leading-none text-neutral-900 no-underline group-hover:no-underline">
                  {item.label}
                </span>
              ) : null}
            </Link>
          );
        }

        return (
          <span
            key={itemKey}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            <span className="truncate">{item.title}</span>
            {item.label ? (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  ) : null;
}
