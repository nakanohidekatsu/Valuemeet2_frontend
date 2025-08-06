/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ←これを追加
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // あると無難なオプション
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { unoptimized: true },
// };

// module.exports = nextConfig;
