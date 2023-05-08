/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "/dist",
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
