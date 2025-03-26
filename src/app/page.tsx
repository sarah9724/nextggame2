'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { gamesData } from './data/games'

// 简单的Header组件
function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1>在线游戏中心</h1>
        <p>发现你喜爱的游戏</p>
      </div>
    </header>
  )
}

// 简单的Footer组件
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© 2025 在线游戏中心 版权所有</p>
      </div>
    </footer>
  )
}

export default function HomePage() {
  const [categoryFilter, setCategoryFilter] = useState('all')
  
  // 筛选游戏
  const filteredGames = categoryFilter === 'all' 
    ? gamesData 
    : gamesData.filter(game => game.category === categoryFilter)
  
  // 获取所有分类
  const categories = ['all', ...new Set(gamesData.map(game => game.category))]
  
  return (
    <div>
      <Header />
      
      <main className="container">
        {/* 分类筛选器 */}
        <div className="card p-4 mb-4">
          <h2 className="mb-4">游戏分类</h2>
          <div className="mb-4">
            {categories.map(category => (
              <button 
                key={category}
                className={`btn ${categoryFilter === category ? 'btn-active' : ''} mr-2`}
                onClick={() => setCategoryFilter(category)}
              >
                {category === 'all' ? '全部' : category}
              </button>
            ))}
          </div>
        </div>
        
        {/* 游戏列表 */}
        <div className="grid">
          {filteredGames.map(game => (
            <Link href={`/games/${game.id}`} key={game.id}>
              <div className="card">
                <div className="p-4 text-center">
                  <div className="text-2xl mb-2">🎮</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{game.title}</h3>
                  <p>{game.category}</p>
                  <div className="mt-2">
                    <span>{'★'.repeat(Math.floor(game.rating))}</span>
                    <span>{'☆'.repeat(5-Math.floor(game.rating))}</span>
                    <span>{game.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
