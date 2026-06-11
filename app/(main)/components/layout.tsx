import { DocsShellLayout } from "@/components/docs-shell-layout";

interface ComponentsLayoutProps {
  children: React.ReactNode;
}

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
  return <DocsShellLayout>{children}</DocsShellLayout>;
}
