/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    domains: ["www.pokepedia.fr"],
    formats: ["image/webp"]
  }
}