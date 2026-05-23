import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../animata/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-themes", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: "./next.config.mjs",
    },
  },
  tags: {},
  webpackFinal: async (config) => {
    // Suppress Google Fonts loading errors during dev
    if (config.plugins) {
      config.plugins = config.plugins.map((plugin) => {
        if (
          plugin &&
          typeof plugin === "object" &&
          "constructor" in plugin &&
          plugin.constructor.name === "ProgressPlugin"
        ) {
          return plugin;
        }
        return plugin;
      });
    }
    return config;
  },
};
export default config;
