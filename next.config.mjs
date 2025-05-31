/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuration pour déploiement statique sur Hostinger
  output: 'export',
  trailingSlash: true,
  // Si votre site n'est pas à la racine du domaine, décommentez et modifiez :
  // basePath: '/mon-dossier',
  // assetPrefix: '/mon-dossier',
}

export default nextConfig