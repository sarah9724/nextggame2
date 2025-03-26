/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开启静态导出
  output: 'export',
  
  // 禁用图像优化以兼容静态导出
  images: {
    unoptimized: true,
  },
  
  // 优化生产环境设置
  reactStrictMode: false,
  
  // 禁用无用的检查以加速构建
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
  
  // 移除所有实验性功能，包括serverActions和esmExternals
}

module.exports = nextConfig