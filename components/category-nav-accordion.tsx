"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";

import type { FooterCategory } from "@/lib/docs";
import { cn } from "@/lib/utils";

const categoryTextClassName = "text-[12px] leading-[1.33337] tracking-[0.01em]";

const categoryLinkTouchClassName =
  "block px-2 py-[6px] touch-manipulation [-webkit-tap-highlight-color:transparent]";

const categoryTriggerTouchClassName =
  "m-0 py-2.5 touch-manipulation [-webkit-tap-highlight-color:transparent]";

const variantStyles = {
  footer: {
    rootBorder: "border-[color:color-mix(in_oklab,var(--footer-ink)_14%,transparent)]",
    itemBorder: "border-[color:color-mix(in_oklab,var(--footer-ink)_14%,transparent)]",
    title: "font-semibold text-[var(--footer-category-title)]",
    link: "font-normal text-[var(--footer-category-link)] transition-colors hover:text-[var(--footer-category-title)]",
    icon: "text-[var(--footer-ink)]",
    ring: "focus-visible:ring-[var(--footer-accent)]/35",
  },
  sheet: {
    rootBorder: "border-border/60",
    itemBorder: "border-border/60",
    title: "font-semibold text-foreground",
    link: "font-normal text-muted-foreground transition-colors hover:text-foreground",
    icon: "text-muted-foreground",
    ring: "focus-visible:ring-ring/35",
  },
} as const;

type CategoryNavAccordionProps = {
  categories: FooterCategory[];
  className?: string;
  onLinkClick?: () => void;
  variant?: keyof typeof variantStyles;
};

function CategoryLinks({
  category,
  onLinkClick,
  variant = "footer",
}: {
  category: FooterCategory;
  onLinkClick?: () => void;
  variant?: keyof typeof variantStyles;
}) {
  const styles = variantStyles[variant];

  return (
    <ul className="flex flex-col">
      {category.links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onLinkClick}
            className={cn(categoryTextClassName, categoryLinkTouchClassName, styles.link)}
          >
            {link.title}
          </Link>
        </li>
      ))}

      {category.showViewAll ? (
        <li>
          <Link
            href={category.viewAllHref}
            onClick={onLinkClick}
            className={cn(categoryTextClassName, categoryLinkTouchClassName, styles.link)}
            aria-label={`View ${category.moreCount} more ${category.title} components`}
          >
            {category.moreCount}+ more
          </Link>
        </li>
      ) : null}
    </ul>
  );
}

export function CategoryNavAccordion({
  categories,
  className,
  onLinkClick,
  variant = "footer",
}: CategoryNavAccordionProps) {
  const styles = variantStyles[variant];

  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn("w-full border-t", styles.rootBorder, className)}
    >
      {categories.map((category) => (
        <Accordion.Item
          key={category.title}
          value={category.title}
          className={cn("border-b", styles.itemBorder)}
        >
          <Accordion.Header className="m-0">
            <Accordion.Trigger
              className={cn(
                "group flex w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
                categoryTriggerTouchClassName,
                styles.ring,
              )}
            >
              <span className={cn(categoryTextClassName, styles.title)}>{category.title}</span>
              <span
                aria-hidden
                className={cn(
                  "relative block size-3.5 shrink-0 opacity-70 before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-full after:w-px after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-200 group-data-[state=open]:after:rotate-90 group-data-[state=open]:after:opacity-0",
                  styles.icon,
                )}
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="pb-[6px]">
              <CategoryLinks category={category} onLinkClick={onLinkClick} variant={variant} />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
