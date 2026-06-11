"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";
import { type FormEvent, useId } from "react";

import { cn } from "@/lib/utils";

const subscribeFieldClassName =
  "flex h-8 max-h-8 min-h-8 min-w-0 flex-1 items-center rounded-sm border border-border bg-white px-2.5 shadow-none transition-colors focus-within:border-[hsl(var(--accent))]/35 dark:bg-background";

const subscribeInputClassName =
  "w-full border-0 bg-transparent text-xs leading-none text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none";

const subscribeButtonClassName =
  "inline-flex size-8 shrink-0 touch-manipulation items-center justify-center rounded-full border border-border bg-white text-foreground shadow-none transition-colors hover:text-[hsl(var(--accent))] disabled:pointer-events-none disabled:opacity-40 dark:bg-background";

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
  const statusText = success ? "Thank you for subscribing!" : error;

  return (
    <div className={cn("w-full", className)}>
      <form className="flex h-8 max-h-8 items-center gap-1.5" onSubmit={onSubmit}>
        <label htmlFor={inputId} className={subscribeFieldClassName}>
          <input
            id={inputId}
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className={subscribeInputClassName}
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          aria-label="Subscribe"
          className={subscribeButtonClassName}
        >
          {isLoading ? (
            <Loader2 className="size-3.5 animate-spin text-[hsl(var(--accent))]" />
          ) : (
            <ArrowUpRight aria-hidden weight="bold" className="size-3.5" />
          )}
        </button>
      </form>

      <p
        aria-live="polite"
        className={cn(
          "mt-2 h-3.5 font-(family-name:--font-mono) text-[10px] leading-[14px] tracking-[0.02em]",
          success ? "text-[hsl(var(--accent))]" : error ? "text-[#C41E3A]" : "text-transparent",
        )}
      >
        {statusText ?? "\u00a0"}
      </p>
    </div>
  );
}
