import { Controls, Description, Primary, Subtitle, Title } from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react";
// @ts-nocheck importing react to fix type warning
import { type ReactNode, useEffect } from "react";

import "../styles/globals.css";
import "../styles/storybook.css";

const isEmbedded = typeof window !== "undefined" && window.location.href.includes("docs-view");

// Add embedded class to body so CSS selectors like .embedded .docs-story work
// regardless of whether we're in story or docs view mode
if (isEmbedded && typeof document !== "undefined") {
  document.body.classList.add("embedded");
}

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const globals = params?.get("globals") ?? "";
  const isDark =
    globals.includes("theme:dark") ||
    (!globals.includes("theme:light") && globals.includes("dark"));
  const theme = isDark ? "dark" : "";

  useEffect(() => {
    if (!isEmbedded) return;
    // Apply dark theme class to body for embedded mode
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    const sendHeight = () => {
      // In docs view, measure the full docs container (sbdocs-wrapper) rather than
      // just the story canvas, so Controls/Title/Stories are included
      const el =
        document.querySelector(".sbdocs-wrapper") ?? document.querySelector("#storybook-root");
      if (!el) return;
      window.parent.postMessage({ type: "animata-set-height", height: el.scrollHeight }, "*");
    };
    sendHeight();
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
  }, [theme]);

  return (
    <div className={theme} style={{ padding: isEmbedded ? 0 : "4rem 20px" }}>
      {children}
    </div>
  );
};

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeWrapper>
        <Story />
      </ThemeWrapper>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
};

export default preview;
