/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack(config, { isServer }) {
    if (!isServer) {
      // 기존 svg loader 유지
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      // ✅ .css?inline → 문자열 import 가능하도록 추가
      config.module.rules.push({
        test: /\.css$/,
        resourceQuery: /inline/, // ?inline 쿼리 붙은 파일만
        use: ['raw-loader'],
      });
    }

    return config;
  },
  reactStrictMode: false,
};

export default nextConfig;
