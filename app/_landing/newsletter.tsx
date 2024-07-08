import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useNewsletterSubscription from "@/hooks/use-newsletter-subscription";

export function NewsletterInput() {
  const { isLoading, error, success, addSubscriber, setEmail, email } = useNewsletterSubscription();

  return (
    <div className="w-full max-w-sm space-y-2">
      <form
        className="flex space-x-2"
        onSubmit={(event) => {
          event.preventDefault();
          addSubscriber();
        }}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          className="max-w-lg flex-1 bg-background"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Please wait" : "Join now"}
        </Button>
      </form>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {success ? (
          <span className="text-green-500">Thank you for subscribing!</span>
        ) : error ? (
          error
        ) : isLoading ? (
          ""
        ) : (
          "100% free. No spam. No noise. Unsubscribe at any time."
        )}
      </p>
    </div>
  );
}

export default function NewsletterSection() {
  return (
    <div className="my-16 flex flex-col md:my-8" id="join">
      <p className="mb-1 text-sm font-medium text-foreground opacity-60">
        Join our newsletter to get the latest updates.
      </p>
      <NewsletterInput />
    </div>
  );
}
