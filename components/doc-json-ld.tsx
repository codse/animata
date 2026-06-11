import { buildDocDescription, buildDocJsonLd } from "@/lib/metadata";
import type { PublishedDoc } from "@/lib/published-docs";

export function DocJsonLd({ doc }: { doc: PublishedDoc }) {
  const description = buildDocDescription(doc);
  const jsonLd = buildDocJsonLd(doc, description);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
