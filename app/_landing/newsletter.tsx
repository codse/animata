import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useNewsletterSubscription from "@/hooks/use-newsletter-subscription";

export function NewsletterInput() {
  const { isLoading, error, success, addSubscriber, setEmail, email } =
    useNewsletterSubscription();

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
          className="max-w-lg flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Please wait" : "Request access"}
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
    <section className="py-18 w-full md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center" id="join">
          <p className="mb-1 mt-12 max-w-[750px] text-center text-sm font-medium text-foreground opacity-60">
            Be among the first to use Animata.
          </p>
          <NewsletterInput />
        </div>
      </div>
    </section>
  );
}
