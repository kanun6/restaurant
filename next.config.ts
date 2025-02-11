import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    },
  },
   
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hpzdtfffwzbzitdjkmbp.supabase.co'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
