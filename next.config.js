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
    serverActions: {
      allowedOrigins: ['nextggame2.pages.dev']
    }
  },
  
  // 外部包配置（修复了从experimental中移出的配置）
  serverExternalPackages: ['sqlite', 'sqlite3'],

  webpack: (config) => {
    // 防止 webpack 从 node_modules 中解析 tailwindcss
    config.resolve.alias = {
      ...config.resolve.alias,
      'tailwindcss': false,
      'postcss': false,
      'autoprefixer': false,
    };
    
    return config;
  }
}

module.exports = nextConfig 