import { cn } from "@/lib/utils";

/** 8-column footer grid — 4 cols on small screens, 8 from md up */
export const footerGridClassName = "grid w-full grid-cols-4 gap-y-8 md:grid-cols-8";

/** Category footer — flex columns on md+, accordion on small screens */
export const footerCategoryColumnsClassName =
  "mt-8 md:mt-12 lg:mt-16 hidden w-full md:flex md:flex-row md:gap-0";

/** Mobile accordion — Apple-style bordered rows */
export const footerCategoryAccordionClassName = cn(
  "mt-8 md:mt-12 lg:mt-16 w-full border-t md:hidden",
  "border-[color:color-mix(in_oklab,var(--footer-ink)_14%,transparent)]",
);

/** One flex column of category sections */
export const footerCategoryColumnClassName = "flex min-w-0 flex-1 flex-col";

export const footerCategorySectionClassName = "min-w-0";

/** Outer footer shell — stacked rows */
export const footerOuterGridClassName =
  "grid w-full grid-rows-[auto_auto_auto] py-4 md:py-6 lg:py-8";

/** Section label — sits bottom-left in a spacer row on the 8-col grid */
export const footerSectionLabelClassName =
  "font-(family-name:--font-mono) text-[10px] font-medium uppercase leading-none tracking-[0.14em]";

/** Top + bottom left — brand / copyright (cols 1–2) */
export const footerColBrandClassName = "col-span-4 md:col-span-2 md:col-start-1";

/** Top row — nav links (cols 3–4) */
export const footerColLinksClassName = "col-span-4 md:col-span-2 md:col-start-3";

/** Top row — newsletter (cols 5–8 on desktop; stamp column removed) */
export const footerColNewsletterClassName =
  "col-span-2 md:col-span-2 md:col-start-5 -mr-4 sm:-mr-5 md:-mr-6 lg:-mr-8";
