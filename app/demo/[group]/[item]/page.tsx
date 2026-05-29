import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { group: groupSlug, item: itemSlug } = await params;
  const found = findItem(groupSlug, itemSlug);
  if (!found) return { title: "Demo - animata" };

  const title = `${found.group.label} · ${found.item.label} — animata`;
  return {
    title,
    description: found.group.phrase,
    robots: { index: false, follow: false },
    openGraph: { title, description: found.group.phrase },
  };
}

export async function generateViewport({ params }: PageProps): Promise<Viewport> {
  const { group: groupSlug, item: itemSlug } = await params;
  const found = findItem(groupSlug, itemSlug);
  if (!found) return {};

  return {
    themeColor: demoThemeColor(found.item, found.group),
  };
}

export default async function DemoItemPage({ params }: PageProps) {
  const { group: groupSlug, item: itemSlug } = await params;
  const found = findItem(groupSlug, itemSlug);
  if (!found) notFound();

  return (
    <Suspense fallback={null}>
      <DemoExperience groupSlug={found.group.slug} itemSlug={found.item.slug} />
    </Suspense>
  );
}
