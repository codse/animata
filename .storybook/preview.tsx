import { Controls, Description, Primary, Subtitle, Title } from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react";
import type { ReactNode } from "react";

import "../styles/globals.css";
import "../styles/storybook.css";

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  return <div style={{ padding: "4rem 20px" }}>{children}</div>;
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
