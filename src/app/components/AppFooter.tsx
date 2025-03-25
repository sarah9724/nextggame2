'use client'

import React from 'react'
import Link from 'next/link'

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <span className="text-3xl mr-2">🎮</span>
              <span className="font-poppins font-semibold text-xl text-gray-900">
                NextGGame
              </span>
            </div>
            <p className="mt-4 text-gray-600 max-w-md">
              为女性用户提供精选游戏体验，包括游戏分类、评分、评价和排行功能，
              让您轻松找到喜爱的休闲娱乐。
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-4">
              快速链接
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  游戏分类
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  搜索
                </Link>
              </li>
              <li>
                <Link href="/ranking" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  排行榜
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-4">
              帮助与支持
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  使用条款
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} NextGGame. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter 