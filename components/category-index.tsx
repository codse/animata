import { CategoryIndexGrid, CategoryIndexLink } from "@/components/category-index-grid";
import { getPublishedCategoryDocs } from "@/lib/published-docs";

export function CategoryIndex({ category }: { category: string }) {
  const docs = getPublishedCategoryDocs(category);

  if (!docs.length) {
    return (
      <p className="text-sm text-muted-foreground">No published components in this category yet.</p>
    );
  }

  return (
    <CategoryIndexGrid>
      {docs.map((doc) => (
        <CategoryIndexLink key={doc.slug} href={doc.slug}>
          {doc.title}
        </CategoryIndexLink>
      ))}
    </CategoryIndexGrid>
  );
}
