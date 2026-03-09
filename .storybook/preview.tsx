import { Controls, Description, Primary, Subtitle, Title } from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react";
import { type ReactNode, useEffect } from "react";
import { themes } from "storybook/theming";

import "../styles/globals.css";
import "../styles/storybook.css";

const isEmbedded = typeof window !== "undefined" && window.location.href.includes("docs-view");

// Add embedded class to body so CSS selectors like .embedded .docs-story work
if (isEmbedded && typeof document !== "undefined") {
  document.body.classList.add("embedded");
}

const ThemeWrapper = ({ children, isDark }: { children: ReactNode; isDark: boolean }) => {
  const theme = isDark ? "dark" : "";

  useEffect(() => {
    if (!isEmbedded) return;
    document.body.classList.toggle("dark", isDark);

    const sendHeight = () => {
      const el =
        document.querySelector(".sbdocs-wrapper") ?? document.querySelector("#storybook-root");
      if (!el) return;
      window.parent.postMessage({ type: "animata-set-height", height: el.scrollHeight }, "*");
    };
    sendHeight();
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
  }, [isDark]);

  return (
    <div className={theme} style={{ padding: isEmbedded ? 0 : "4rem 20px" }}>
      {children}
    </div>
  );
};

const preview: Preview = {
  tags: ["autodocs"],
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === "dark";
      return (
        <ThemeWrapper isDark={isDark}>
          <Story />
        </ThemeWrapper>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.light,
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
