"use client";

import { Loader2 } from "lucide-react";
import { type FormEvent, useId } from "react";

import { cn } from "@/lib/utils";

const subscribeFieldClassName =
  "flex h-10 min-w-0 flex-1 items-center rounded-md border border-border bg-white px-3 shadow-none transition-colors focus-within:border-[hsl(var(--accent))]/35 dark:bg-background";

const subscribeInputClassName =
  "w-full border-0 bg-transparent text-sm leading-none text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none";

const subscribeButtonClassName =
  "inline-flex h-10 shrink-0 touch-manipulation items-center justify-center rounded-md border border-border bg-[hsl(var(--accent))] px-3.5 text-xs font-semibold text-white shadow-none transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40";

type FooterSubscribeProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  isLoading?: boolean;
  success?: boolean;
  error?: string | null;
  className?: string;
};

export function FooterSubscribe({
  email,
  onEmailChange,
  onSubmit,
  isLoading = false,
  success = false,
  error = null,
  className,
}: FooterSubscribeProps) {
  const inputId = useId().replace(/:/g, "");
  const statusText = success
    ? "Subscribed. New components when they ship."
    : error
      ? error
      : "No spam. Unsubscribe anytime.";

  return (
    <div className={cn("w-full", className)}>
      <form className="flex items-center gap-1.5" onSubmit={onSubmit}>
        <label htmlFor={inputId} className={subscribeFieldClassName}>
          <input
            id={inputId}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-label="Email address"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className={subscribeInputClassName}
          />
        </label>

        <button type="submit" disabled={isLoading} className={subscribeButtonClassName}>
          {isLoading ? <Loader2 className="size-3.5 animate-spin" /> : "Subscribe"}
        </button>
      </form>

      <p
        aria-live="polite"
        className={cn(
          "mt-2 min-h-3.5 font-(family-name:--font-mono) text-[10px] leading-[14px] tracking-[0.02em]",
          success
            ? "text-[hsl(var(--accent))]"
            : error
              ? "text-[#C41E3A]"
              : "text-muted-foreground",
        )}
      >
        {statusText}
      </p>
    </div>
  );
}
