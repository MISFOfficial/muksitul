import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.ibb.co.com", "muksitul.biddaneer.com"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "swiper"],
  },
};

export default nextConfig;
