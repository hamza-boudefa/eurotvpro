import createNextIntlPlugin from 'next-intl/plugin';
import './src/lib/env.mjs';

const withNextIntlConfig = createNextIntlPlugin('./src/i18n/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,

    dirs: ['.'],
  },
  images: {
    remotePatterns: [{
      protocol:'https',
      hostname:'eurosiptv.com',
      pathname:'**',

    }
     ,{
      protocol:'https',
      hostname:"cdn.prod.website-files.com",
      pathname:'**'
    } 
     ,{
      protocol:'http',
      hostname:"localhost",
      pathname:'**'
    } 
  ],
  },
};

export default withNextIntlConfig(nextConfig);
