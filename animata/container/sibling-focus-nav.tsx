import { type ComponentProps, createContext, use } from "react";

import { cn } from "@/lib/utils";

export type SiblingFocusNavMode = "opacity" | "blur";

const SiblingFocusNavModeContext = createContext<SiblingFocusNavMode>("opacity");

/** Opacity mode: dim siblings on hover or when the nav has focus; active link stays at full opacity. */
export const siblingFocusNavOpacityGroupClassName = cn(
  "[&:hover>a]:opacity-30 [&:focus-within>a]:opacity-30",
  "[&>a:hover]:opacity-100 [&>a:focus-visible]:opacity-100",
);

/** Blur mode: same sibling trick, but with blur-sm instead of opacity. */
export const siblingFocusNavBlurGroupClassName = cn(
  "[&:hover>a]:blur-sm [&:focus-within>a]:blur-sm",
  "[&>a:hover]:blur-none [&>a:focus-visible]:blur-none",
  "motion-reduce:[&:hover>a]:blur-none motion-reduce:[&:focus-within>a]:blur-none",
);

const siblingFocusNavLinkBaseClassName = cn(
  "inline-flex min-h-11 touch-manipulation items-center outline-none focus-visible:ring-2 focus-visible:ring-ring",
);

/** Classes for direct-child links. Merge onto Next.js Link or use SiblingFocusNav.Link. */
export function siblingFocusNavLinkClassName(mode: SiblingFocusNavMode = "opacity") {
  return cn(
    siblingFocusNavLinkBaseClassName,
    mode === "opacity"
      ? "transition-opacity duration-200 ease-out motion-reduce:transition-none"
      : "blur-0 transition-[filter] duration-200 ease-out motion-reduce:transition-none",
  );
}

export function siblingFocusNavGroupClassName(mode: SiblingFocusNavMode = "opacity") {
  return mode === "blur" ? siblingFocusNavBlurGroupClassName : siblingFocusNavOpacityGroupClassName;
}

type SiblingFocusNavRootProps = ComponentProps<"nav"> & {
  mode?: SiblingFocusNavMode;
};

function SiblingFocusNavRoot({ mode = "opacity", className, ...props }: SiblingFocusNavRootProps) {
  return (
    <SiblingFocusNavModeContext.Provider value={mode}>
      <nav
        className={cn(
          "flex flex-wrap items-center gap-6",
          siblingFocusNavGroupClassName(mode),
          className,
        )}
        {...props}
      />
    </SiblingFocusNavModeContext.Provider>
  );
}

type SiblingFocusNavLinkProps = ComponentProps<"a"> & {
  mode?: SiblingFocusNavMode;
};

function SiblingFocusNavLink({ mode, className, ...props }: SiblingFocusNavLinkProps) {
  const contextMode = use(SiblingFocusNavModeContext);
  const resolvedMode = mode ?? contextMode;

  return <a className={cn(siblingFocusNavLinkClassName(resolvedMode), className)} {...props} />;
}

const SiblingFocusNav = Object.assign(SiblingFocusNavRoot, {
  Link: SiblingFocusNavLink,
  linkClassName: siblingFocusNavLinkClassName("opacity"),
  groupClassName: siblingFocusNavOpacityGroupClassName,
  getLinkClassName: siblingFocusNavLinkClassName,
  getGroupClassName: siblingFocusNavGroupClassName,
});

export default SiblingFocusNav;
export { SiblingFocusNavLink };
