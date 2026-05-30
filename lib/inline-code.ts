import { cn } from "@/lib/utils";

/** Shared HSL tokens — warm silver surface + matched type. */
const inlineCodeLight = {
  border: "hsl(60 5% 82%)",
  bg: "linear-gradient(180deg, hsl(60 8% 97.5%) 0%, hsl(60 4% 92.5%) 100%)",
  text: "hsl(240 5% 28%)",
  textShadow: "0 1px 0 hsl(0 0% 100% / 0.92)",
  boxShadow: "inset 0 1px 0 0 hsl(0 0% 100% / 0.78), 0 1px 1px hsl(240 8% 12% / 0.08)",
} as const;

const inlineCodeDark = {
  border: "hsl(240 4% 34% / 0.52)",
  bg: "linear-gradient(180deg, hsl(240 5% 21%) 0%, hsl(240 6% 16%) 100%)",
  text: "hsl(60 6% 86%)",
  textShadow: "0 1px 0 hsl(0 0% 100% / 0.06)",
  boxShadow: "inset 0 1px 0 0 hsl(0 0% 100% / 0.05), 0 1px 2px hsl(0 0% 0% / 0.34)",
} as const;

/** Keep tokens on one line — asymmetric pad + trailing margin for prose gaps. */
const inlineCodeWhitespaceClasses = "whitespace-nowrap ms-[0.06em] me-[0.32em]";

/** Rich inline chip — gradient fill, hairline border, inset highlight. */
export const inlineCodeClassName = cn(
  "relative rounded-[0.35rem] border py-0.5 px-1.5 font-mono text-[0.88em]",
  inlineCodeWhitespaceClasses,
  "border-[hsl(60_5%_82%)] bg-[linear-gradient(180deg,hsl(60_8%_97.5%),hsl(60_4%_92.5%))]",
  "text-[hsl(240_5%_28%)]",
  "[text-shadow:0_1px_0_hsl(0_0%_100%/0.92)]",
  "shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.78),0_1px_1px_hsl(240_8%_12%/0.08)]",
  "dark:border-[hsl(240_4%_34%/0.52)]",
  "dark:bg-[linear-gradient(180deg,hsl(240_5%_21%),hsl(240_6%_16%))]",
  "dark:text-[hsl(60_6%_86%)]",
  "dark:[text-shadow:0_1px_0_hsl(0_0%_100%/0.06)]",
  "dark:shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.05),0_1px_2px_hsl(0_0%_0%/0.34)]",
);

/** CSS for demo recipe prose — Tailwind can't scan dynamically prefixed utilities. */
export const inlineCodeProseCss = `
  .demo-notes-prose :is(p, li, td, th, dd, figcaption) code {
    position: relative;
    white-space: nowrap;
    margin-inline: 0.06em 0.32em;
    border-radius: 0.35rem;
    padding: 0.125rem 0.5rem 0.125rem 0.375rem;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.88em;
    border: 1px solid ${inlineCodeLight.border};
    background: ${inlineCodeLight.bg};
    color: ${inlineCodeLight.text};
    text-shadow: ${inlineCodeLight.textShadow};
    box-shadow: ${inlineCodeLight.boxShadow};
  }

  .dark .demo-notes-prose :is(p, li, td, th, dd, figcaption) code {
    border-color: ${inlineCodeDark.border};
    background: ${inlineCodeDark.bg};
    color: ${inlineCodeDark.text};
    text-shadow: ${inlineCodeDark.textShadow};
    box-shadow: ${inlineCodeDark.boxShadow};
  }
`;

type InlineCodeProps = {
  className?: string;
  "data-language"?: string;
  "data-theme"?: string;
};

/** True only for backtick inline code — not Shiki / rehype-pretty-code blocks. */
export function isInlineCodeElement({ className, ...props }: InlineCodeProps = {}) {
  if (className?.includes("language-")) return false;
  if (props["data-language"]) return false;
  if (props["data-theme"]) return false;
  return true;
}

/** Defense-in-depth on docs \`<pre>\` — chip classes must never land on block code. */
export const inlineCodePreResetClasses = cn(
  "[&_code]:m-0 [&_code]:rounded-none [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0",
  "[&_code]:shadow-none [&_code]:[text-shadow:none] [&_code]:text-inherit",
  "[&_code]:whitespace-pre [&_code]:font-[inherit] [&_code]:text-[inherit]",
  "dark:[&_code]:bg-transparent dark:[&_code]:shadow-none dark:[&_code]:[text-shadow:none]",
);
