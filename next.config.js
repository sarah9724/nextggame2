/** @type {import('next').NextConfig} */
const nextConfig = {
  // 输出模式优化，适合静态部署
  output: 'export',
  
  // 配置图片处理
  images: {
    unoptimized: true,
    domains: ['play2048.co', 'playpager.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.gameflare.com',
      },
      {
        protocol: 'https',
        hostname: '*.pages.dev',
      },
    ],
  },
  
  // 优化生产环境
  productionBrowserSourceMaps: false,
  
  // 路径重写和重定向
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  
  // 禁用严格模式以避免双重渲染引起的问题
  reactStrictMode: false,
  
  // 跳过类型检查加速构建
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 跳过ESLint检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 自定义webpack配置
  webpack: (config) => {
    // 避免解析不必要的包
    if (!config.resolve) {
      config.resolve = {};
    }
    
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    
    return config;
  },
}

module.exports = nextConfig 