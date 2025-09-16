import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['bjzmizunuyepnszcplti.supabase.co'], // Add your Supabase domain here
  },
};

export default nextConfig;
