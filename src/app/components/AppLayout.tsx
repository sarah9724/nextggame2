'use client'

import React from 'react'
import AppNavigation from './AppNavigation'
import AppFooter from './AppFooter'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigation />
      <main className="flex-1">
        {children}
      </main>
      <AppFooter />
    </div>
  )
}

export default AppLayout 