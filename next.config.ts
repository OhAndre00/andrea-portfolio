/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabilita completamente Turbopack per il build
  experimental: {
    turbo: false,
  },
  // Se è un sito statico, aggiungi:
  output: "export",
  // Altrimenti rimuovi la linea output
  images: {
    unoptimized: true, // Per siti statici esportati
  },
};

module.exports = nextConfig;
