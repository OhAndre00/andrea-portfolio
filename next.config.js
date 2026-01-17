/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // Tienilo se vuoi sito statico

  // CONFIGURAZIONE IMMAGINI PER SITI STATICI
  images: {
    unoptimized: true, // ESSENZIALE per output: 'export'
    // Configura anche i domini se usi immagini esterne
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permetti tutte le immagini esterne
      },
    ],
  },

  // Aggiungi se usi immagini in `public/` con path complessi
  trailingSlash: true, // Opzionale, aiuta con alcuni path
};

module.exports = nextConfig;
