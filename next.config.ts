import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    serverActions:{
      bodySizeLimit: '5mb'
    }
  },
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'hpzdtfffwzbzitdjkmbp.supabase.co'
      }
    ]
  }
};

export default nextConfig;
