import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuration pour Netlify (static export)
  output: 'export',
  // Configuration des images pour Netlify
  images: {
    unoptimized: true,
  },
  // Configuration du trailing slash pour Netlify
  trailingSlash: true,
};

export default nextConfig;
