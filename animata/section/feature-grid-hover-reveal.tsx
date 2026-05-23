"use client";

import { BarChart, Code, Globe, Layers, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  features?: FeatureItem[];
  columns?: 2 | 3;
  title?: string;
  subtitle?: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description:
      "Optimised for speed at every layer. Sub-second load times keep your users engaged and your conversion rate high.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, SSO, and role-based access controls built in from day one.",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Advanced Analytics",
    description:
      "Real-time dashboards and custom reports give your team the clarity to make confident, data-driven decisions.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global CDN",
    description:
      "Content delivered from 200+ edge locations worldwide so every user gets a fast, reliable experience.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Developer First",
    description:
      "Powerful REST and GraphQL APIs, webhooks, and an SDK for every major language. Automate anything.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Seamless Integrations",
    description:
      "Connect to 200+ tools including Slack, Salesforce, and Stripe in minutes — no custom code required.",
  },
];

const columnClass: Record<2 | 3, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
};

export default function FeatureGridHoverReveal({
  features = defaultFeatures,
  columns = 3,
  title = "Everything you need to ship faster",
  subtitle = "A complete platform built for modern teams — from zero to production without the growing pains.",
}: FeatureGridProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const safeFeatures = Array.isArray(features) ? features : defaultFeatures;

  return (
    <section className="w-full px-4 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
            )}
          </div>
        )}

        <div className={cn("grid grid-cols-1 gap-6", columnClass[columns])}>
          {safeFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: FeatureItem;
  prefersReducedMotion: boolean;
}

function FeatureCard({ feature, prefersReducedMotion }: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border p-6",
        "bg-card text-card-foreground",
        "shadow-sm transition-shadow duration-300",
        !prefersReducedMotion && "transition-transform duration-300",
        !prefersReducedMotion && hovered && "-translate-y-1.5 shadow-md",
        hovered ? "border-primary/40" : "border-border",
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl",
          "bg-primary/10 text-primary",
          "transition-transform duration-200",
          !prefersReducedMotion && hovered && "scale-115",
        )}
      >
        {feature.icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
      </div>

      {!prefersReducedMotion && (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/20 transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0",
          )}
          aria-hidden="true"
        />
      )}
    </article>
  );
}
