import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static exports
  basePath: "/", // Replace with your repo name
  reactStrictMode: true,
  swcMinify: true,
};

export default withContentlayer(nextConfig);
