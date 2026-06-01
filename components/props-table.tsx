import type { ReactNode } from "react";

import { inlineCodeClassName } from "@/lib/inline-code";
import { cn } from "@/lib/utils";

function CodeCell({ children }: { children: ReactNode }) {
  if (children == null || children === "" || children === "—" || children === "-") {
    return <span className="text-muted-foreground">—</span>;
  }

  return <code className={cn(inlineCodeClassName, "font-normal")}>{children}</code>;
}

export interface PropsTableRowProps {
  /** Prop name as exported from the component (no backticks). */
  prop: string;
  /** Type expression as shown in docs (no backticks). */
  type: string;
  /** Default value as shown in docs; omit or use — when none. */
  default?: string;
  /** When true, shows a Required badge instead of a default cell emphasis. */
  required?: boolean;
  children?: ReactNode;
  className?: string;
}

export function PropsTableRow({
  prop,
  type,
  default: defaultValue,
  required,
  children,
  className,
}: PropsTableRowProps) {
  return (
    <tr className={cn("border-b border-border last:border-0", className)}>
      <th
        scope="row"
        className="w-[1%] whitespace-nowrap px-4 py-3 text-left align-top font-medium text-foreground"
      >
        <CodeCell>{prop}</CodeCell>
      </th>
      <td className="w-[1%] whitespace-nowrap px-4 py-3 align-top text-muted-foreground">
        <CodeCell>{type}</CodeCell>
      </td>
      <td className="w-[1%] whitespace-nowrap px-4 py-3 align-top">
        {required ? (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Required
          </span>
        ) : (
          <CodeCell>{defaultValue ?? "—"}</CodeCell>
        )}
      </td>
      <td className="min-w-[12rem] px-4 py-3 align-top text-[0.9375rem] leading-relaxed text-muted-foreground">
        {children}
      </td>
    </tr>
  );
}

export interface PropsTableProps {
  children: ReactNode;
  /** Optional subheading above the table (e.g. compound part name). */
  title?: string;
  className?: string;
}

export function PropsTable({ children, title, className }: PropsTableProps) {
  return (
    <figure className={cn("my-6", className)}>
      {title ? (
        <figcaption className="mb-3 font-heading text-base font-semibold tracking-tight text-foreground">
          {title}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto rounded-lg border border-border bg-card/40">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <caption className="sr-only">{title ? `${title} props` : "Component props"}</caption>
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th
                scope="col"
                className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Prop
              </th>
              <th
                scope="col"
                className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Default
              </th>
              <th
                scope="col"
                className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </figure>
  );
}

PropsTable.Row = PropsTableRow;
