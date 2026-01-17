/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rimuovi completamente la sezione 'experimental' o correggila
  // Per disabilitare Turbopack in produzione, non usare 'turbo'

  // Se il tuo sito è completamente statico:
  output: "export",

  // Se usi immagini:
  images: {
    unoptimized: true, // Necessario per 'output: export'
  },

  // Altre configurazioni se necessario...
};

module.exports = nextConfig;
