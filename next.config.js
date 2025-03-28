/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    images: {
      unoptimized: true,
    },
    // Ajusta esta URL a tu nombre de repositorio
    basePath: '/expediente-digital-dashboard',
  };
  
  module.exports = nextConfig;