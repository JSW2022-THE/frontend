const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  pwa: { dest: "public" },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "/",
  },
});
module.exports = nextConfig;
