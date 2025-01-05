/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Consigliato per siti statici su Netlify
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    unoptimized: true, // Netlify consiglia di disabilitare l'ottimizzazione delle immagini integrata
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI, // Variabile d'ambiente
  },
  async redirects() {
    return [
      {
        source: '/api/protected',
        has: [{ type: 'header', key: 'x-role' }],
        destination: '/api/unauthorized', // Indirizza se il middleware fallisce
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
