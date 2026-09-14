"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/events";
import { withOutboundRef } from "@/lib/outbound-ref";
import { cn } from "@/lib/utils";

type GitHubStarLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  source: string;
  children?: ReactNode;
  showIcon?: boolean;
};

/** Shared star CTA — same label/destination, tracked for conversion. */
export function GitHubStarLink({
  source,
  className,
  children = "Star to follow releases",
  showIcon = true,
  ...props
}: GitHubStarLinkProps) {
  return (
    <a
      href={withOutboundRef(siteConfig.links.github)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      onClick={() => trackEvent({ name: "github_star_click", properties: { source } })}
      {...props}
    >
      {showIcon ? <Icons.gitHub className="size-4 shrink-0" /> : null}
      {children}
    </a>
  );
}
