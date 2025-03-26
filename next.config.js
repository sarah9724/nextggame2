/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // 为Cloudflare Pages优化的输出模式
  reactStrictMode: true,
  images: {
    unoptimized: true, // 在Cloudflare Pages上部署时可能需要禁用图像优化
    domains: ['play2048.co', 'playpager.com'], // 允许的图片域名
  },
  // 在生产环境中禁用源映射以减小构建大小
  productionBrowserSourceMaps: false,
  
  // 忽略构建时的ESLint错误
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 忽略构建时的TypeScript错误
  typescript: {
    ignoreBuildErrors: true,
  },

  // 修复错误: 无法发送API请求的问题
  experimental: {
    serverComponentsExternalPackages: ['sqlite', 'sqlite3'],
    serverActions: true
  },

  webpack: (config) => {
    // 忽略 tailwindcss 相关模块
    config.resolve.alias = {
      ...config.resolve.alias,
      'tailwindcss': false,
      'postcss': false,
      'autoprefixer': false,
    }
    return config;
  }
}

module.exports = nextConfig 