"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}

export interface AnimatedPricingCardsProps {
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small projects and personal use",
    features: ["Up to 3 projects", "5GB storage", "Community support", "Basic analytics"],
    ctaText: "Get Started",
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "Ideal for growing teams and businesses",
    features: [
      "Unlimited projects",
      "100GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Team collaboration",
    ],
    highlighted: true,
    ctaText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large-scale operations and custom needs",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "24/7 dedicated support",
      "SLA guarantee",
      "Custom contracts",
      "On-premise option",
    ],
    ctaText: "Contact Sales",
  },
];

export default function AnimatedPricingCards({ plans = defaultPlans }: AnimatedPricingCardsProps) {
  const safePlans = Array.isArray(plans) ? plans : defaultPlans;

  return (
    <section className="w-full px-4 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Choose the perfect plan for your needs. Always flexible to scale.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {safePlans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "group relative flex flex-col rounded-2xl border transition-all duration-300",
                "motion-safe:hover:-translate-y-2",
                "bg-background p-6 sm:p-8 lg:p-10",
                plan.highlighted
                  ? "border-primary shadow-lg lg:scale-105"
                  : "border-border shadow-sm motion-safe:hover:shadow-md",
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "h-11 w-full rounded-lg font-semibold transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "motion-reduce:hover:scale-100",
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:bg-muted",
                )}
              >
                {plan.ctaText || "Get Started"}
              </motion.button>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  );
}
