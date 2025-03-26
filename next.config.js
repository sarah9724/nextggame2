/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置
  output: 'export',
  
  // 禁用图像优化
  images: {
    unoptimized: true,
  },
  
  // 优化生产环境
  productionBrowserSourceMaps: false,
  
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
  
  // 阻止解析TailwindCSS
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    
    // 阻止解析TailwindCSS相关包
    config.resolve.alias['tailwindcss'] = false;
    config.resolve.alias['postcss'] = false;
    config.resolve.alias['autoprefixer'] = false;
    
    return config;
  },
}

module.exports = nextConfig 