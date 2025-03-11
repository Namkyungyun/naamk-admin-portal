/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      // Turbopack에서 `@svgr/webpack`을 사용하려면 커스터마이징이 필요할 수 있습니다.
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
    }

    return config;
  },
  // experimental: {
  //   turbo: {
  //     // ...
  //   },
  // },
  reactStrictMode: false,
};

export default nextConfig;


