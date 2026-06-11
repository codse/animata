import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Callout({ title, children, icon, className, ...props }: CalloutProps) {
  return (
    <Alert
      {...props}
      className={cn(
        "mb-6 border-[color-mix(in_oklab,var(--ink)_32%,transparent)] bg-[color-mix(in_oklab,var(--ink)_6%,transparent)] text-[color-mix(in_oklab,var(--ink)_88%,transparent)] [&_a]:text-foreground [&_a]:underline-offset-[3px] [&_a:hover]:text-link",
        className,
      )}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      {title && <AlertTitle className="text-foreground">{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
