import AnnouncementRibbon from "@/animata/container/announcement-ribbon";
import { CSPostHogProvider } from "@/app/(main)/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <CSPostHogProvider>
      <div vaul-drawer-wrapper="">
        <div className="relative flex min-h-screen flex-col bg-background">
          <AnnouncementRibbon className="sticky top-0 z-60" />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </div>
      <TailwindIndicator />
    </CSPostHogProvider>
  );
}
