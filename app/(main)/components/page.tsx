import Link from "next/link";

import CategorySkeleton from "@/animata/skeleton/category-skeleton";
import { siteStats } from "@/config/site-stats";
import { getComponentCategories } from "@/lib/component-categories";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Components",
  description: `${siteStats.componentsFormatted} animated React components, filed by category. Text, backgrounds, cards, widgets, and the rest. Each links to a live preview and copy-paste docs for Next.js and Tailwind.`,
  path: "/components",
  keywords: ["component library", "React UI categories", "animated components index"],
});

export default function ComponentsPage() {
  const categories = getComponentCategories();

  return (
    <main id="main-content" className="relative min-w-0 py-6 lg:py-8">
      <header className="max-w-3xl">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Components</h1>
        <p className="mt-4 text-balance text-muted-foreground">
          Everything in Animata lives here, sorted by type. Open a category for live previews and
          copy-paste docs.
        </p>
      </header>

      <ul className="mt-14 grid list-none grid-cols-2 gap-x-4 gap-y-8 p-0 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.slug} className="min-w-0">
            <Link href={category.href} className="group group/cg block">
              <CategorySkeleton variant={category.slug} />
              <p className="mt-3 px-2.5 text-base leading-snug tracking-tight sm:text-lg">
                <span className="font-semibold text-foreground transition-colors duration-300 group-hover:text-foreground/40">
                  {category.title}
                </span>
                <span className="text-foreground/35"> · </span>
                <span className="font-normal text-foreground/40 transition-colors duration-300 group-hover:font-semibold group-hover:text-foreground">
                  {category.count}
                </span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
