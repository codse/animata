import { redirect } from "next/navigation";

import { DEFAULT_GROUP, DEFAULT_ITEM, itemHref } from "@/app/demo/demos";

export default function FullscreenDemoPage() {
  if (DEFAULT_GROUP && DEFAULT_ITEM) {
    redirect(`${itemHref(DEFAULT_GROUP, DEFAULT_ITEM)}?fullscreen=1`);
  }

  return (
    <main className="grid min-h-svh place-items-center bg-white px-6 text-[#171717] dark:bg-[#171717] dark:text-white">
      <p className="text-sm text-[#171717]/70 dark:text-white/70">No demos to display.</p>
    </main>
  );
}
