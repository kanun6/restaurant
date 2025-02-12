/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  output: 'standalone'
};

module.exports = nextConfig;
