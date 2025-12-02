/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
