/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    images: {
      unoptimized: true,
    },
    basePath: '/expediente-digital-dashboard',
    eslint: {
        ignoreDuringBuilds: true, 
      },
  };
  
  module.exports = nextConfig;