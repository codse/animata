"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useExitIntent from "@/hooks/use-exit-intent";
import useNewsletterSubscription from "@/hooks/use-newsletter-subscription";

function NewsletterInline() {
  const { isLoading, error, success, addSubscriber, setEmail, email } =
    useNewsletterSubscription("exit_intent");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubscriber();
  };

  if (success) {
    return (
      <p className="py-2 text-center text-sm font-medium text-emerald-600">
        Subscribed. New components when they ship.
      </p>
    );
  }

  return (
    <div className="relative space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
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
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </Button>
      </form>
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        <p className="text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
      )}
    </div>
  );
}

export default function ExitIntentModal() {
  const { showModal, setShowModal } = useExitIntent();

  return (
    <DialogPrimitive.Root open={showModal} onOpenChange={setShowModal}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-[hsl(var(--surface-card))] p-0 shadow-lg">
          <div className="border-b border-border bg-foreground/[0.03] px-6 pb-5 pt-6">
            <DialogPrimitive.Title className="font-(family-name:--font-display) text-[22px] leading-tight text-foreground">
              Get new components by email
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1 text-[15px] text-[hsl(var(--text-secondary))]">
              One short note when something new ships.
            </DialogPrimitive.Description>
          </div>

          <div className="px-6 py-5">
            <NewsletterInline />
          </div>

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
