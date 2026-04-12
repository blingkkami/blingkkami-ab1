import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  /*
  async rewrites() {
    return [
      {
        source: encodeURI("/어드민"),
        destination: "/admin",
      },
    ];
  },
  */
};

export default nextConfig;
