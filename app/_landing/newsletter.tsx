import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
          {isLoading ? "Please wait" : "Subscribe"}
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
    <section className="w-full bg-gray-50 py-12 dark:bg-gray-900 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Exclusive <span className="text-primary">Updates</span> - In Your
              Inbox
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Subscribe to our newsletter and never miss our updates
            </p>
          </div>
          <NewsletterInput />
        </div>
      </div>
    </section>
  );
}
