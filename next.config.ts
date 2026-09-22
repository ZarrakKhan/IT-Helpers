import type { NextConfig } from "next";
import withBundleAnalyzerInit from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
};

// Run `ANALYZE=true npm run build` to inspect client/server bundle
// composition (opens an interactive treemap) when chasing unused-JS or
// bundle-size regressions.
const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
