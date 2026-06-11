import { DocsShellLayout } from "@/components/docs-shell-layout";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return <DocsShellLayout>{children}</DocsShellLayout>;
}
