"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import type { FooterCategory } from "@/lib/docs";
import {
  footerCategoryAccordionClassName,
  footerCategoryColumnClassName,
  footerCategoryColumnsClassName,
  footerCategorySectionClassName,
} from "@/lib/footer-grid";
import { cn } from "@/lib/utils";

const COLUMN_COUNT = 4;

const footerCategoryTextClassName = "text-[12px] leading-[1.33337] tracking-[0.01em]";

const footerCategoryHeadingClassName = cn(
  footerCategoryTextClassName,
  "p-0 ms-0 mt-0 me-2 mb-2 block font-semibold text-[var(--footer-category-title)] transition-colors hover:text-[var(--footer-accent)]",
);

const footerCategoryLinkClassName = cn(
  footerCategoryTextClassName,
  "p-0 ms-0 mt-0 me-2 mb-2 block font-normal text-[var(--footer-category-link)] transition-colors hover:text-[var(--footer-category-title)]",
);

const footerCategoryRuleClassName =
  "border-[color:color-mix(in_oklab,var(--footer-ink)_14%,transparent)]";

function splitColumns<T>(items: T[], columns: number): T[][] {
  const size = Math.ceil(items.length / columns);
  return Array.from({ length: columns }, (_, index) =>
    items.slice(index * size, (index + 1) * size),
  );
}

function FooterCategoryLinks({ category }: { category: FooterCategory }) {
  return (
    <ul className="flex flex-col">
      {category.links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={footerCategoryLinkClassName}>
            {link.title}
          </Link>
        </li>
      ))}

      {category.showViewAll ? (
        <li>
          <Link
            href={category.viewAllHref}
            className={footerCategoryLinkClassName}
            aria-label={`View ${category.moreCount} more ${category.title} components`}
          >
            {category.moreCount}+ more
          </Link>
        </li>
      ) : null}
    </ul>
  );
}

function FooterCategorySection({ category }: { category: FooterCategory }) {
  return (
    <section className={footerCategorySectionClassName}>
      <h3 className="m-0 p-0 leading-none">
        <Link href={category.href} className={footerCategoryHeadingClassName}>
          {category.title}
        </Link>
      </h3>

      <FooterCategoryLinks category={category} />
    </section>
  );
}

function FooterCategoryAccordion({ categories }: { categories: FooterCategory[] }) {
  return (
    <Accordion.Root type="single" collapsible className={footerCategoryAccordionClassName}>
      {categories.map((category) => (
        <Accordion.Item
          key={category.title}
          value={category.title}
          className={cn("border-b", footerCategoryRuleClassName)}
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--footer-accent)]/35">
              <span
                className={cn(
                  footerCategoryTextClassName,
                  "font-semibold text-[var(--footer-category-title)]",
                )}
              >
                {category.title}
              </span>
              <span
                aria-hidden
                className="relative block size-3.5 shrink-0 text-[var(--footer-ink)] opacity-70 before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-full after:w-px after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-200 group-data-[state=open]:after:rotate-90 group-data-[state=open]:after:opacity-0"
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="pb-3.5">
              <FooterCategoryLinks category={category} />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

type FooterCategoryGridProps = {
  categories: FooterCategory[];
  className?: string;
};

export function FooterCategoryGrid({ categories, className }: FooterCategoryGridProps) {
  const columns = splitColumns(categories, COLUMN_COUNT);

  return (
    <>
      <FooterCategoryAccordion categories={categories} />

      <div className={cn(footerCategoryColumnsClassName, className)}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className={footerCategoryColumnClassName}>
            {column.map((category) => (
              <FooterCategorySection key={category.title} category={category} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
