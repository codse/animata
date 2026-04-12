import { Loader2, Mail } from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useNewsletterSubscription from "@/hooks/use-newsletter-subscription";

function NewsletterInput(): React.JSX.Element {
  const { isLoading, error, success, addSubscriber, setEmail, email } = useNewsletterSubscription();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addSubscriber();
  };

  return (
    <>
      <form
        className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border-border bg-background"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[hsl(var(--accent))] text-white hover:opacity-90 sm:w-auto"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Please wait" : "Join now"}
        </Button>
      </form>
      <p className="mt-4 text-center text-xs text-muted-foreground">
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

export default function NewsletterSection() {
  return (
    <Card
      className="mx-auto mt-16 w-full max-w-2xl rounded-2xl border border-border bg-[hsl(var(--surface-card))] shadow-none"
      id="join"
    >
      <CardHeader className="rounded-t-2xl border-b border-border bg-foreground/[0.03]">
        <CardTitle className="flex items-center justify-center text-lg font-semibold text-foreground">
          <Mail className="mr-2 h-5 w-5" />
          Stay in the loop
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          New components, tips, and updates. No spam.
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-4 mb-1 mt-6">
        <NewsletterInput />
      </CardContent>
    </Card>
  );
}
