import React from "react";
import { Loader2, Mail } from "lucide-react";

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
        className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border-gray-200 bg-gray-50 dark:border-zinc-600 dark:bg-zinc-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-1 w-full bg-blue-500 text-white hover:bg-blue-600 sm:w-auto"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Please wait" : "Join now"}
        </Button>
      </form>
      <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
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
      className="mx-auto mt-16 w-full max-w-2xl rounded-xl border border-border bg-gray-50 shadow-none dark:border-zinc-600 dark:bg-zinc-800"
      id="join"
    >
      <CardHeader className="rounded-t-xl border-b bg-gray-100 dark:border-b-zinc-700 dark:bg-zinc-700">
        <CardTitle className="flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-100">
          <Mail className="mr-2 h-6 w-6" />
          Join our Newsletter
        </CardTitle>
        <CardDescription className="text-center text-gray-600 dark:text-gray-300">
          Get the latest updates from animata.
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-4 mb-1 mt-6">
        <NewsletterInput />
      </CardContent>
    </Card>
  );
}
