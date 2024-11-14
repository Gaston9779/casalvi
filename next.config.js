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
};

module.exports = nextConfig;
