import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: require("path").join(__dirname, '..'),
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
