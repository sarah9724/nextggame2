'use client'

import React, { useState } from 'react'

interface GameEmbedProps {
  gameUrl: string
  title: string
  width?: string | number
  height?: string | number
}

const GameEmbed: React.FC<GameEmbedProps> = ({
  gameUrl,
  title,
  width = '100%',
  height = 600
}) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="game-embed-container w-full rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="relative" style={{ height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-2"></div>
              <p className="text-gray-500">游戏加载中...</p>
            </div>
          </div>
        )}
        
        <iframe
          src={gameUrl}
          title={title}
          width={width}
          height={height}
          className="border-0 w-full h-full"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          此游戏由外部提供，如遇到问题请刷新页面。游戏全屏后按ESC键可退出全屏模式。
        </p>
      </div>
    </div>
  )
}

export default GameEmbed 