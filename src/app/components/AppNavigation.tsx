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
      window.location.href = `/?search=${encodeURIComponent(searchInput.trim())}`
    }
  }

  return (
    <header className="header">
      <nav className="nav-container">
        {/* 网站logo */}
        <Link href="/" className="logo">
          <span>NextGGame</span>
        </Link>

        {/* 导航菜单 - 桌面版 */}
        <div className="desktop-menu">
          <Link href="/" className="nav-link">首页</Link>
          <Link href="/ranking" className="nav-link">排行榜</Link>
        </div>

        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="搜索游戏..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">
            搜索
          </button>
        </form>

        {/* 移动端菜单按钮 */}
        <button
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="菜单"
        >
          ☰
        </button>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-container">
              <div className="mobile-menu-header">
                <Link href="/" className="logo" onClick={() => setIsMenuOpen(false)}>
                  <span>NextGGame</span>
                </Link>
                <button
                  className="mobile-close-button"
                  onClick={toggleMenu}
                  aria-label="关闭菜单"
                >
                  ✕
                </button>
              </div>

              <div className="mobile-menu-links">
                <Link href="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>首页</Link>
                <Link href="/ranking" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>排行榜</Link>
              </div>

              <form onSubmit={handleSearch} className="mobile-search-form">
                <input
                  type="text"
                  placeholder="搜索游戏..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="mobile-search-input"
                />
                <button type="submit" className="btn btn-primary">
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