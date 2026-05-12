# Animated Feature Grid

A premium animated feature grid for React, TypeScript, Tailwind CSS, and Framer Motion.

## What it does

- Cursor-follow spotlight glow with smooth spring interpolation
- Hover lift and shadow expansion on each card
- Animated gradient border reveal on hover and focus
- Responsive mobile fallback with a static ambient glow
- Keyboard accessible and reduced-motion aware

## Files

- `animated-feature-grid.tsx` - grid container and layout
- `feature-card.tsx` - reusable card primitive
- `demo.tsx` - sample usage with demo data
- `index.ts` - barrel exports

## Usage

```tsx
import {
  AnimatedFeatureGrid,
  type FeatureGridItem,
} from "@/components/animated-feature-grid";

const items: FeatureGridItem[] = [
  {
    icon: <Sparkles className="size-5" />,
    title: "Cursor spotlight",
    description: "A refined spotlight follows the cursor with smooth motion.",
  },
];

export default function Page() {
  return <AnimatedFeatureGrid title="Features" items={items} />;
}
```

## Props

### `AnimatedFeatureGrid`

- `title?: string`
- `description?: string`
- `eyebrow?: string`
- `items: readonly FeatureGridItem[]`
- `columns?: 2 | 3 | 4`
- `className?: string`
- `gridClassName?: string`
- `headerClassName?: string`
- `renderFooter?: ReactNode`

### `FeatureGridItem`

- `icon: ReactNode`
- `title: string`
- `description: string`
- `tone?: "blue" | "cyan" | "emerald" | "violet" | "amber" | "rose"`

## Notes

- Cursor tracking is disabled on coarse pointers and touch devices.
- Reduced-motion users get a static, readable layout without movement-heavy effects.
- The component is designed to drop into existing Tailwind + Framer Motion projects without extra dependencies beyond `lucide-react` for the demo.
