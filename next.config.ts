import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    qualities: [25, 50, 75, 100],
  },
};

export default nextConfig;
