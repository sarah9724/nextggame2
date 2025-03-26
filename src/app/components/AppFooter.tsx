'use client'

import React from 'react'
import Link from 'next/link'

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span>NextGGame</span>
            </Link>
            <p>精选女性游戏平台</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-nav">
              <h3 className="footer-heading">导航</h3>
              <ul className="footer-list">
                <li><Link href="/">首页</Link></li>
                <li><Link href="/ranking">排行榜</Link></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3 className="footer-heading">联系我们</h3>
              <p>support@nextggame.com</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} NextGGame. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter 