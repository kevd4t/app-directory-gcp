/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: { removeConsole: false },
  images: { unoptimized: true },
  output: 'standalone',
  distDir: 'dist'
}

export default nextConfig
