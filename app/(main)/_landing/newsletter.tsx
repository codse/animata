import { Loader2, Mail } from "lucide-react";
import type React from "react";

import { FooterSubscribe } from "@/components/footer-subscribe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useNewsletterSubscription from "@/hooks/use-newsletter-subscription";
import { FOOTER_INK } from "@/lib/footer-theme";
import { cn } from "@/lib/utils";

function NewsletterInput({
  compact = false,
  brand = false,
}: {
  compact?: boolean;
  brand?: boolean;
}) {
  const { isLoading, error, success, addSubscriber, setEmail, email } = useNewsletterSubscription();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addSubscriber();
  };

  if (brand) {
    return (
      <FooterSubscribe
        email={email}
        onEmailChange={setEmail}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        success={success}
        error={error}
      />
    );
  }

  return (
    <>
      <form
        className={cn(
          "flex gap-2",
          compact ? "flex-row items-stretch" : "flex-col sm:flex-row sm:items-center",
        )}
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          className={cn(
            "min-w-0 flex-1 border-border bg-background",
            compact && "h-9 rounded-none",
          )}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "shrink-0 bg-[hsl(var(--accent))] text-white shadow-none hover:!bg-[hsl(var(--accent))]/90 hover:!text-white",
            compact ? "h-9 rounded-none px-4" : "w-full sm:w-auto",
          )}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Please wait" : "Join now"}
        </Button>
      </form>
      <p className={cn("text-xs text-muted-foreground", compact ? "mt-2" : "mt-4 text-center")}>
        {success ? (
          <span className="text-green-500">Thank you for subscribing!</span>
        ) : error ? (
          <span className="text-red-500">{error}</span>
        ) : (
          "100% free. No spam. No noise. Unsubscribe at any time."
        )}
      </p>
    </>
  );
}

type NewsletterSectionProps = {
  compact?: boolean;
  brand?: boolean;
};

export default function NewsletterSection({
  compact = false,
  brand = false,
}: NewsletterSectionProps) {
  if (brand) {
    return (
      <div id="join" className="w-full md:max-w-none">
        <p className="max-w-md text-[13px] font-light leading-snug tracking-[-0.02em] md:max-w-sm">
          Sign up for updates on new components and releases.
        </p>
        <div className="mt-2">
          <NewsletterInput brand />
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        "w-full border border-border bg-[hsl(var(--surface-card))] shadow-none",
        compact ? "rounded-none shadow-(--shadow-card)" : "mx-auto mt-16 max-w-2xl rounded-2xl",
      )}
      id="join"
    >
      <CardHeader
        className={cn(
          "border-b border-border bg-foreground/3",
          compact ? "gap-1 space-y-0 rounded-none px-4 py-3" : "rounded-t-2xl",
        )}
      >
        <CardTitle
          className={cn(
            "flex items-center text-lg font-semibold leading-tight text-foreground",
            compact ? "text-sm" : "justify-center",
          )}
        >
          <Mail className={cn(compact ? "mr-1.5 h-3.5 w-3.5" : "mr-2 h-5 w-5")} />
          Stay in the loop
        </CardTitle>
        <CardDescription
          className={cn("text-muted-foreground", compact ? "text-xs leading-snug" : "text-center")}
        >
          New components, tips, and updates. No spam.
        </CardDescription>
      </CardHeader>
      <CardContent className={cn("mx-4 mb-1 mt-6", compact && "mx-0 mb-0 mt-0 px-4 py-3")}>
        <NewsletterInput compact={compact} />
      </CardContent>
    </Card>
  );
}
