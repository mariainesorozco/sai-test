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
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/admin': { page: '/admin' },
      '/expediente-digital-dashboard': { page: '/expediente-digital-dashboard' },
    }
  }
};

module.exports = nextConfig;
