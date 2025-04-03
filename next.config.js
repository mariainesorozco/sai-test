/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/sai-test' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sai-test/' : '',
};

module.exports = nextConfig;
