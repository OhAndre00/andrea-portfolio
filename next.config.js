/** @type {import('next').NextConfig} */
const nextConfig = {
  // CONFIGURAZIONE BASE - NIENTE 'experimental'
  reactStrictMode: true,

  // RIMUOVI 'output: export' se usi:
  // - API Routes (/api/*)
  // - Server Components
  // - getServerSideProps / getStaticProps con revalidate
  output: "export",

  images: {
    unoptimized: true,
  },

  // Aggiungi solo se necessario
  // trailingSlash: true,
  // basePath: '',
  // assetPrefix: '',
};

module.exports = nextConfig;
