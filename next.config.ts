import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "i.ibb.co.com",
      "muksitul.biddaneer.com",
      "pub-bb13b0ae287e4dcaa9ef3ce08a211ce8.r2.dev",
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "swiper"],
  },
};

export default nextConfig;
