"use client";

import Link from "next/link";
import { CategoryNavAccordion } from "@/components/category-nav-accordion";
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

type FooterCategoryGridProps = {
  categories: FooterCategory[];
  className?: string;
};

export function FooterCategoryGrid({ categories, className }: FooterCategoryGridProps) {
  const columns = splitColumns(categories, COLUMN_COUNT);

  return (
    <>
      <CategoryNavAccordion
        categories={categories}
        variant="footer"
        className={footerCategoryAccordionClassName}
      />

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
