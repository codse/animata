"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ArrowUpRight, Loader2, Mail } from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import useExitIntent from "@/hooks/use-exit-intent";
import useNewsletterSubscription from "@/hooks/use-newsletter-subscription";

function NewsletterInline() {
  const { isLoading, error, success, addSubscriber, setEmail, email } = useNewsletterSubscription();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubscriber();
  };

  if (success) {
    return (
      <p className="py-2 text-center text-sm font-medium text-emerald-600">
        Subscribed. We&apos;ll keep it short.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 border-border bg-background text-sm"
      />
      <Button
        type="submit"
        disabled={isLoading}
        size="sm"
        className="shrink-0 bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent))]/90"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign up"}
      </Button>
      {error && <p className="absolute -bottom-5 left-0 text-xs text-red-500">{error}</p>}
    </form>
  );
}

export default function ExitIntentModal() {
  const { showModal, setShowModal } = useExitIntent();

  return (
    <DialogPrimitive.Root open={showModal} onOpenChange={setShowModal}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-[hsl(var(--surface-card))] p-0 shadow-lg sm:max-w-md">
          {/* Header */}
          <div className="border-b border-border bg-foreground/[0.03] px-6 pb-5 pt-6">
            <DialogPrimitive.Title className="font-[family-name:var(--font-display)] text-[22px] leading-tight text-foreground">
              Didn&apos;t find the right component?
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1 text-[15px] text-[hsl(var(--text-secondary))]">
              Tell us what to build next.
            </DialogPrimitive.Description>
          </div>

          <div className="space-y-0 divide-y divide-border">
            {/* Request a component */}
            <div className="px-6 py-5">
              <p className="text-[15px] font-medium text-foreground">Missing something?</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                Open an issue and we&apos;ll build it.
              </p>
              <a
                href={`${siteConfig.links.github}/issues/new?labels=component-request&title=Component+request%3A+`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-[hsl(var(--link))] transition-colors hover:text-[hsl(var(--link-hover))]"
              >
                Request on GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Newsletter signup */}
            <div className="relative px-6 py-5">
              <p className="flex items-center gap-1.5 text-[15px] font-medium text-foreground">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Or just follow along
              </p>
              <p className="mb-3 mt-1 text-[13px] leading-relaxed text-muted-foreground">
                We send new components when they&apos;re ready. That&apos;s it.
              </p>
              <NewsletterInline />
            </div>
          </div>

          {/* Close button */}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
