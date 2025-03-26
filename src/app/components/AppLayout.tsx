'use client'

import React from 'react'
import AppNavigation from './AppNavigation'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <AppNavigation />
      <main className="main-content">
        {children}
      </main>
      <AppFooter />
    </div>
  )
}

export default AppLayout 