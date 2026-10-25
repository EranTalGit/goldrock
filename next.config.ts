import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/nikayon-chidush-ambatia",
        destination: "/services/nikayon-kirtzuf-ambatia",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
