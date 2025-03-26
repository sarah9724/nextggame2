'use client'

import { gamesData } from '../../data/games'
import { commentsData } from '../../data/comments'
import React from 'react'
import { useParams } from 'next/navigation'
import CommentSection from '../../components/CommentSection'
import RatingSystem from '../../components/RatingSystem'
import GameEmbed from '../../components/GameEmbed'
import AppLayout from '../../components/AppLayout'

export default function GamePage() {
  const params = useParams()
  const gameId = Number(params.id)
  const game = gamesData.find(g => g.id === gameId)

  if (!game) {
    return (
      <AppLayout>
        <div className="container">
          <div className="text-center py-4">
            <h1 className="text-2xl font-bold mb-4">游戏未找到</h1>
            <p className="mb-4">抱歉，您查找的游戏不存在或已被移除</p>
            <a href="/" className="btn btn-primary">
              返回首页
            </a>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="container">
        {/* 游戏标题区 */}
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold mb-2">{game.title}</h1>
          <div className="text-lg">
            {game.category}
          </div>
        </div>

        <div className="card">
          {/* 游戏iframe嵌入 */}
          <div className="mb-4">
            <GameEmbed 
              gameUrl={game.iframeUrl} 
              title={game.title} 
              height={550}
            />
          </div>

          {/* 游戏描述和信息 */}
          <div className="p-4">
            <div>
              <p>{game.longDescription}</p>
            </div>
            
            {/* 评分系统 */}
            <div className="mt-4 p-4 bg-light">
              <RatingSystem gameId={gameId} initialRating={game.rating} />
            </div>
            
            {/* 游戏特点 */}
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4">游戏特点</h2>
              <div className="grid grid-cols-2">
                {game.features.map((feature, index) => (
                  <div key={index} className="flex items-center p-2">
                    <span className="mr-2">✦</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 社区互动区 */}
          <div className="p-4">
            <div>
              {/* 评论区域标题 */}
              <div className="mb-4">
                <h2 className="text-xl font-bold">玩家评论</h2>
              </div>
              
              {/* 评论组件 */}
              <div className="card p-4">
                <CommentSection gameId={gameId} />
              </div>
            </div>
          </div>
        </div>
        
        {/* 相关推荐 */}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">猜你喜欢</h2>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {gamesData.filter(g => g.id !== gameId).slice(0, 4).map(relatedGame => (
              <a 
                href={`/games/${relatedGame.id}`}
                key={relatedGame.id} 
                className="card"
              >
                <div className="p-4 text-center">
                  <div className="text-2xl mb-2">🎮</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{relatedGame.title}</h3>
                  <p className="text-lg">{relatedGame.category}</p>
                  <div className="mt-2">
                    <span>{'★'.repeat(Math.floor(relatedGame.rating))}</span>
                    <span>{'☆'.repeat(5-Math.floor(relatedGame.rating))}</span>
                    <span>{relatedGame.rating}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 