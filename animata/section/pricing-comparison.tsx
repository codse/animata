"use client";

import { Check, Minus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "yearly";
type FeatureValue = boolean | string;

export interface PricingComparisonPlan {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  badge?: string;
  highlighted?: boolean;
  ctaLabel?: string;
  onCtaClick?: (planId: string) => void;
}

export interface PricingComparisonFeature {
  feature: string;
  description?: string;
  values: Record<string, FeatureValue>;
}

interface PricingComparisonProps {
  plans: PricingComparisonPlan[];
  features: PricingComparisonFeature[];
  currency?: string;
  title?: string;
  subtitle?: string;
  defaultCycle?: BillingCycle;
  defaultPlanId?: string;
  className?: string;
  onPlanChange?: (planId: string) => void;
}

const formatPrice = (value: number | string, currency: string): string => {
  if (typeof value === "string") {
    return value;
  }

  return `${currency}${value}`;
};

const getFirstPlanId = (plans: PricingComparisonPlan[]): string => {
  return plans[0]?.id ?? "";
};

const getStartingPlanId = (plans: PricingComparisonPlan[], defaultPlanId?: string): string => {
  if (defaultPlanId && plans.some((plan) => plan.id === defaultPlanId)) {
    return defaultPlanId;
  }

  const highlightedPlan = plans.find((plan) => plan.highlighted);
  return highlightedPlan?.id ?? getFirstPlanId(plans);
};

const getFeatureCellValue = (value: FeatureValue) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check
        className="mx-auto h-4 w-4 text-emerald-600 dark:text-emerald-400"
        aria-hidden="true"
      />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
    );
  }

  return <span className="text-xs font-medium sm:text-sm">{value}</span>;
};

export default function PricingComparison({
  plans,
  features,
  currency = "$",
  title = "Choose a plan that grows with your product",
  subtitle = "Compare features at a glance, then launch with the plan that fits your stage.",
  defaultCycle = "monthly",
  defaultPlanId,
  className,
  onPlanChange,
}: Readonly<PricingComparisonProps>) {
  const reduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState<BillingCycle>(defaultCycle);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    getStartingPlanId(plans, defaultPlanId),
  );

  const orderedPlans = useMemo(() => {
    return [...plans].sort((a, b) => Number(b.highlighted) - Number(a.highlighted));
  }, [plans]);

  const transitionClass = reduceMotion ? "duration-0" : "duration-300";

  return (
    <section
      className={cn(
        "mx-auto w-full max-w-6xl rounded-3xl border border-zinc-200/80 bg-white/95 p-4 shadow-2xl shadow-zinc-900/5 backdrop-blur sm:p-6 lg:p-8 dark:border-zinc-800 dark:bg-zinc-950/90",
        className,
      )}
      aria-label="Pricing comparison"
    >
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
            {title}
          </h2>
          <p className="text-pretty text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <fieldset className="inline-flex w-full rounded-full border border-zinc-200 bg-zinc-100/80 p-1 dark:border-zinc-700 dark:bg-zinc-900 md:w-auto">
          <legend className="sr-only">Billing cycle</legend>
          {(["monthly", "yearly"] as const).map((item) => {
            const isActive = cycle === item;

            return (
              <button
                key={item}
                type="button"
                aria-pressed={isActive}
                onClick={() => setCycle(item)}
                className={cn(
                  "relative min-w-28 rounded-full px-4 py-2 text-sm font-medium capitalize transition",
                  transitionClass,
                  isActive
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
              >
                {item}
              </button>
            );
          })}
        </fieldset>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {orderedPlans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const displayedPrice =
            cycle === "monthly"
              ? formatPrice(plan.monthlyPrice, currency)
              : formatPrice(plan.yearlyPrice, currency);

          return (
            <motion.article
              key={plan.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={cn(
                "relative rounded-2xl border p-4 transition",
                transitionClass,
                plan.highlighted
                  ? "border-zinc-900 bg-zinc-950 text-zinc-50 shadow-lg shadow-zinc-900/30 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/70",
                isSelected &&
                  "ring-2 ring-zinc-900 dark:ring-zinc-200 dark:ring-offset-zinc-950 ring-offset-2 ring-offset-white",
              )}
            >
              {plan.badge ? (
                <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white dark:bg-emerald-400 dark:text-zinc-900">
                  {plan.badge}
                </span>
              ) : null}

              <p className="text-lg font-semibold">{plan.name}</p>
              {plan.description ? (
                <p className="mt-1 min-h-10 text-sm opacity-80">{plan.description}</p>
              ) : null}

              <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {displayedPrice}
                <span className="ml-1 text-xs font-normal opacity-75 sm:text-sm">
                  /{cycle === "monthly" ? "mo" : "yr"}
                </span>
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlanId(plan.id);
                  onPlanChange?.(plan.id);
                  plan.onCtaClick?.(plan.id);
                }}
                className={cn(
                  "mt-4 inline-flex w-full items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition",
                  transitionClass,
                  plan.highlighted
                    ? "border-zinc-200/20 bg-white/10 hover:bg-white/20 dark:border-zinc-700 dark:bg-zinc-950/20 dark:hover:bg-zinc-950/40"
                    : "border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-900",
                )}
              >
                {plan.ctaLabel ?? "Select plan"}
              </button>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <caption className="sr-only">Feature comparison by plan</caption>
          <thead className="bg-zinc-100/70 dark:bg-zinc-900/80">
            <tr>
              <th
                scope="col"
                className="w-52 border-b border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
              >
                Feature
              </th>
              {orderedPlans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn(
                    "border-b border-zinc-200 px-4 py-3 text-center text-sm font-semibold dark:border-zinc-800",
                    selectedPlanId === plan.id
                      ? "bg-zinc-950 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-700 dark:text-zinc-300",
                  )}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((row, rowIndex) => (
              <tr
                key={row.feature}
                className={cn(
                  "border-b border-zinc-200 align-top dark:border-zinc-800",
                  rowIndex % 2 === 0
                    ? "bg-white dark:bg-zinc-950"
                    : "bg-zinc-50/50 dark:bg-zinc-900/40",
                )}
              >
                <th
                  scope="row"
                  className="px-4 py-3 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {row.feature}
                  {row.description ? (
                    <span className="mt-1 block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                      {row.description}
                    </span>
                  ) : null}
                </th>
                {orderedPlans.map((plan) => (
                  <td
                    key={`${row.feature}-${plan.id}`}
                    className={cn(
                      "px-4 py-3 text-center text-zinc-700 dark:text-zinc-300",
                      selectedPlanId === plan.id && "bg-zinc-950/5 dark:bg-zinc-100/5",
                    )}
                  >
                    {getFeatureCellValue(row.values[plan.id] ?? false)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
