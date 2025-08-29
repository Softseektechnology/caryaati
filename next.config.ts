/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Disable source maps in production
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false; // Disable source maps in development
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.icartea.com',
        pathname: '/cc/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-cmocf.nitrocdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'carpla.vn',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;