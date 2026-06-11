import { DocsSidebarNav } from "@/components/sidebar-nav";
import { docsConfig } from "@/config/docs";

import "@fontsource-variable/instrument-sans";
import "@/styles/docs.css";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="docs-shell border-b border-border">
      <div className="mx-auto w-full max-w-7xl flex-1 items-start px-4 sm:px-6 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6">
        <aside className="sticky hidden md:block top-(--site-header-height) h-[calc(100svh-var(--site-header-height))] w-full max-w-64 shrink-0 self-start overflow-hidden pt-6 pb-6 lg:pt-8">
          <DocsSidebarNav items={docsConfig.sidebarNav} className="h-full" />
        </aside>
        {children}
      </div>
    </div>
  );
}
