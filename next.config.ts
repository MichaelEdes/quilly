import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables React strict mode for catching potential issues in the app
  reactStrictMode: true,

  // Allows serving images from external domains
  images: {
    domains: ["flowbite.s3.amazonaws.com", "github.com"] // Add the allowed domain here
  },

  // Add custom environment variables
  env: {
    API_BASE_URL: "https://api.example.com"
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
