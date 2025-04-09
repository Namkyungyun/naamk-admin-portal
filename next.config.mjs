/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  webpack(config, { isServer }) {
    if (!isServer) {
      // 기존 svg loader 유지
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
  
    return config;
  },
  reactStrictMode: false,
  images: {
    loader: "akamai",
    path: "/",
  },
};

export default nextConfig;
