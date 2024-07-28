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
    <Alert {...props} className={cn("border-muted-foreground/50", className)}>
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
