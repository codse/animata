import type { MetadataRoute } from "next";

import { blogs as allBlogs, docs as allDocs } from "#site/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${domain}/`, lastModified: now },
    { url: `${domain}/components`, lastModified: now },
    { url: `${domain}/resources`, lastModified: now },
    { url: `${domain}/credits`, lastModified: now },
    { url: `${domain}/text-animations`, lastModified: now },
    { url: `${domain}/blog`, lastModified: now },
  ];

  const docRoutes = allDocs.flatMap((doc) =>
    doc.published
      ? [
          {
            url: `${domain}${doc.slug}`,
            lastModified: doc.date ?? doc.dateModified ?? now,
          },
        ]
      : [],
  );

  const blogRoutes = allBlogs.flatMap((blog) =>
    blog.published && blog.slug !== "/blog"
      ? [
          {
            url: `${domain}${blog.slug}`,
            lastModified: blog.date ?? blog.dateModified ?? now,
          },
        ]
      : [],
  );

  return [...staticRoutes, ...docRoutes, ...blogRoutes];
}
