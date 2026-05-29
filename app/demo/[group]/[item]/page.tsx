import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoExperience } from "@/app/demo/demo-experience";
import { DEMO_GROUPS, demoThemeColor, findItem } from "@/app/demo/demos";

export const dynamicParams = false;

export function generateStaticParams() {
  return DEMO_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      group: group.slug,
      item: item.slug,
    })),
  );
}

interface PageProps {
  params: Promise<{ group: string; item: string }>;
  searchParams: Promise<{ fullscreen?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { group: groupSlug, item: itemSlug } = await params;
  const found = findItem(groupSlug, itemSlug);
  if (!found) return { title: "Demo - animata" };

  const title = `${found.group.label} · ${found.item.label} — animata`;
  const themeColor = demoThemeColor(found.item, found.group);
  return {
    title,
    description: found.group.phrase,
    themeColor,
    robots: { index: false, follow: false },
    openGraph: { title, description: found.group.phrase },
  };
}

export default async function DemoItemPage({ params, searchParams }: PageProps) {
  const { group: groupSlug, item: itemSlug } = await params;
  const { fullscreen } = await searchParams;
  const found = findItem(groupSlug, itemSlug);
  if (!found) notFound();

  const isFullscreen = fullscreen === "1" || fullscreen === "true";

  return (
    <DemoExperience
      groupSlug={found.group.slug}
      itemSlug={found.item.slug}
      isFullscreen={isFullscreen}
    />
  );
}
