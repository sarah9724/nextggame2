'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const AppNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      window.location.href = `/search?search=${encodeURIComponent(searchInput.trim())}`
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* 网站logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">NextGGame</span>
        </Link>

        {/* 导航菜单 - 桌面版 */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-lg hover:text-primary">首页</Link>
          <Link href="/ranking" className="text-lg hover:text-primary">排行榜</Link>
        </div>

        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="搜索游戏..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-4 py-2 rounded bg-gray-100 border border-gray-200"
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-primary text-white rounded">
            搜索
          </button>
        </form>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden text-xl p-2"
          onClick={toggleMenu}
          aria-label="菜单"
        >
          ☰
        </button>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <span className="text-2xl font-bold text-primary">NextGGame</span>
                </Link>
                <button
                  className="text-xl p-2"
                  onClick={toggleMenu}
                  aria-label="关闭菜单"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col space-y-4 mb-8">
                <Link href="/" className="text-xl py-2" onClick={() => setIsMenuOpen(false)}>首页</Link>
                <Link href="/ranking" className="text-xl py-2" onClick={() => setIsMenuOpen(false)}>排行榜</Link>
              </div>

              <form onSubmit={handleSearch} className="flex items-center mb-8">
                <input
                  type="text"
                  placeholder="搜索游戏..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded bg-gray-100 border border-gray-200"
                />
                <button type="submit" className="ml-2 px-4 py-3 bg-primary text-white rounded">
                  搜索
                </button>
              </form>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default AppNavigation 