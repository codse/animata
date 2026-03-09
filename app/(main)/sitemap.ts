import type { MetadataRoute } from "next";

import { docs as allDocs } from "#site/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  return [
    {
      url: `${domain}/`,
      lastModified: new Date(),
    },
    ...allDocs
      .filter((doc) => doc.published)
      .map((doc) => ({
        url: `${domain}/docs/${doc.slugAsParams}`,
        lastModified: doc.date ?? doc.dateModified,
      })),
  ];
}
