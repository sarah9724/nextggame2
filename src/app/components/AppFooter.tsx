'use client'

import React from 'react'
import Link from 'next/link'

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">NextGGame</span>
            </Link>
            <p className="mt-2">精选女性游戏平台</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="font-bold mb-2">导航</h3>
              <ul className="space-y-1">
                <li><Link href="/">首页</Link></li>
                <li><Link href="/ranking">排行榜</Link></li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="font-bold mb-2">联系我们</h3>
              <p>support@nextggame.com</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center">
          <p>&copy; {currentYear} NextGGame. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter 