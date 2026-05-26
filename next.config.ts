import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // Redirect apex → www (keeps SSL and SEO canonical)
      {
        source: "/:path*",
        has: [{ type: "host", value: "thelaundryproject.ph" }],
        destination: "https://www.thelaundryproject.ph/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
