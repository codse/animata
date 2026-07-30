import { buildDocDescription, buildDocJsonLd } from "@/lib/metadata";
import type { PublishedDoc } from "@/lib/published-docs";

export function DocJsonLd({ doc }: { doc: PublishedDoc }) {
  const description = buildDocDescription(doc);
  const jsonLd = buildDocJsonLd(doc, description);
  const graphs = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return (
    <>
      {graphs.map((graph) => (
        <script
          key={graph["@type"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
