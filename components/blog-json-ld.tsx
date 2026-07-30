import { buildBlogDescription, buildBlogJsonLd, type PublishedBlog } from "@/lib/metadata";

export function BlogJsonLd({ blog }: { blog: PublishedBlog }) {
  const description = buildBlogDescription(blog);
  const graphs = buildBlogJsonLd(blog, description);

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
