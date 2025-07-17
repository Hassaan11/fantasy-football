import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, options) {
    // Adding the rule for handling SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
