/**
 * @type {import('next').NextConfig}
 */

const path = require("path");

const nextConfig = {
  images: {
    domains: ["gethugothemes.com", "teamosis-sg.vercel.app"],
    deviceSizes: [200, 430, 640, 900, 1200, 1920],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
