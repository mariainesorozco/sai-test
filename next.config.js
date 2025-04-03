/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Generación estática
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  eslint: {
      ignoreDuringBuilds: true, 
  },
  trailingSlash: true, // Hace que las rutas sean generadas como /ruta/index.html
};

module.exports = nextConfig;
