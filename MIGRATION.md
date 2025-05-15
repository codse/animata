# Migration Guide

## Tailwind CSS v4 Migration

This project has been migrated to Tailwind CSS v4. The following changes were made:

1. Updated the `tailwind.config.ts` file to include v4 features:
   ```ts
   future: {
     // Enable all v4 features
     respectDefaultRingColorOpacity: true,
     disableColorOpacityUtilitiesByDefault: true,
     relativeContentPathsByDefault: true,
   }
   ```

2. Removed deprecated utilities like `filter` and `brightness` as they're handled differently in v4.

3. Updated dependencies in package.json to use the latest version of Tailwind CSS.

## Framer Motion to Motion.dev Migration

This project has been migrated from framer-motion to @motionone/dom (motion.dev). The following changes were made:

1. Created a compatibility layer in `/lib/motion.ts` that provides similar APIs to framer-motion but uses motion.dev under the hood.

2. Updated all imports from `framer-motion` to use our custom motion utility:
   ```tsx
   // Before
   import { motion, useInView } from "framer-motion";

   // After
   import { motion, useInView } from "@/lib/motion";
   ```

3. The compatibility layer provides:
   - `motion` components (div, span, button, etc.)
   - `useInView` hook
   - Animation utilities like `animate`, `inView`, `scroll`, `stagger`, and `timeline`

### Known Limitations

The compatibility layer may not support all framer-motion features. If you encounter issues, you may need to:

1. Update the component to use motion.dev's native API
2. Enhance the compatibility layer in `/lib/motion.ts`

## Testing

After migration, please test all animations thoroughly to ensure they work as expected. Pay special attention to:

1. Hover and tap animations
2. Scroll-triggered animations
3. Complex animation sequences
4. Staggered animations

If you find any issues, please report them or submit a pull request with a fix.