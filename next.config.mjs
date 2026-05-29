/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  reactStrictMode: true,
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  images: {
    unoptimized: true,
  },
  // Turbopack config (Next.js 16 default)
  turbopack: {},
  // Webpack config (velite plugin)
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    config.plugins.push(new DemoSourcesWebpackPlugin());
    return config;
  },
};

class DemoSourcesWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise("DemoSourcesWebpackPlugin", async () => {
      if (DemoSourcesWebpackPlugin.started) return;
      DemoSourcesWebpackPlugin.started = true;
      const { buildDemoSources } = await import("./scripts/build-demo-sources.js");
      await buildDemoSources();
    });
  }
}

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      const { build } = await import("velite");
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
