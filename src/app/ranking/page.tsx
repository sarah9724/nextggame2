'use client'

import React, { useState, useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import Link from 'next/link'

// 定义游戏数据类型
interface Game {
  id: number
  title: string
  category: string
  rating: number
  image: string
  description: string
  plays?: number
  trend?: 'up' | 'down' | 'stable'
  releaseDate?: string
  commentCount?: number
  averageRating?: number
  iframeUrl?: string
}

// 定义排行榜数据类型
interface RankingData {
  popular: Game[]
  rating: Game[]
  latest: Game[]
}

// 基础游戏数据
const baseGamesData: Game[] = [
  {
    id: 1,
    title: '开心消消乐',
    category: '休闲',
    rating: 4.8,
    image: '/placeholder.jpg',
    description: '经典三消游戏，简单易上手',
    releaseDate: '2024-03-01'
  },
  {
    id: 2,
    title: '模拟人生',
    category: '模拟',
    rating: 4.6,
    image: '/placeholder.jpg',
    description: '创建和经营你的虚拟生活',
    releaseDate: '2024-03-10'
  },
  {
    id: 3,
    title: '动物之森',
    category: '模拟',
    rating: 4.9,
    image: '/placeholder.jpg',
    description: '在温馨的小岛上展开新生活',
    releaseDate: '2024-03-15'
  },
  {
    id: 5,
    title: '国际象棋',
    category: '益智',
    rating: 4.7,
    image: '/placeholder.jpg',
    description: '经典的国际象棋游戏，锻炼战略思维',
    releaseDate: '2024-03-20',
    iframeUrl: 'https://playpager.com/embed/chess/index.html'
  },
  {
    id: 7,
    title: '花园物语',
    category: '模拟',
    rating: 4.7,
    image: '/placeholder.jpg',
    description: '经营自己的花园，种植各种植物，创造美丽空间',
    releaseDate: '2024-02-20'
  },
  {
    id: 8,
    title: '魔法学院',
    category: '角色扮演',
    rating: 4.4,
    image: '/placeholder.jpg',
    description: '成为魔法学院的学生，学习魔法并完成各种任务',
    releaseDate: '2024-02-15'
  },
  {
    id: 9,
    title: '星际探险',
    category: '冒险',
    rating: 4.6,
    image: '/placeholder.jpg',
    description: '探索未知的星球，完成各种任务和挑战',
    releaseDate: '2024-02-10'
  },
  {
    id: 10,
    title: '王国守卫',
    category: '策略',
    rating: 4.2,
    image: '/placeholder.jpg',
    description: '建立防御系统，保护王国免受入侵者的威胁',
    releaseDate: '2024-02-05'
  },
  {
    id: 11,
    title: '黑白棋',
    category: '益智',
    rating: 4.0,
    image: '/placeholder.jpg',
    description: '经典的黑白棋(奥赛罗)游戏，简单规则蕴含无限变化',
    releaseDate: '2024-01-30',
    iframeUrl: 'https://playpager.com/embed/reversi/index.html'
  },
  {
    id: 12,
    title: '餐厅大亨',
    category: '模拟',
    rating: 4.5,
    image: '/placeholder.jpg',
    description: '经营自己的餐厅，招待顾客，提升餐厅等级',
    releaseDate: '2024-01-25'
  },
  {
    id: 18,
    title: '跳棋',
    category: '益智',
    rating: 4.2,
    image: '/placeholder.jpg',
    description: '经典的跳棋游戏，与电脑对战锻炼战略思维',
    releaseDate: '2023-12-25',
    iframeUrl: 'https://playpager.com/embed/checkers/index.html'
  },
  {
    id: 19,
    title: '卡通农场',
    category: '模拟',
    rating: 4.5,
    image: '/placeholder.jpg',
    description: '在可爱的卡通世界中建设和管理自己的农场，结交朋友',
    releaseDate: '2023-12-20'
  },
  {
    id: 20,
    title: '美妆达人',
    category: '模拟',
    rating: 4.3,
    image: '/placeholder.jpg',
    description: '体验化妆和时尚造型的乐趣，成为虚拟世界的造型师',
    releaseDate: '2023-12-15'
  },
  {
    id: 21,
    title: '城市建造者',
    category: '模拟',
    rating: 4.4,
    image: '/placeholder.jpg',
    description: '设计和建造自己的梦想城市，管理资源，解决市民问题',
    releaseDate: '2023-12-10'
  },
  {
    id: 22,
    title: '小花仙',
    category: '角色扮演',
    rating: 4.5,
    image: '/placeholder.jpg',
    description: '在花仙子世界中收集花朵，培养精灵，完成奇幻冒险',
    releaseDate: '2023-12-05'
  },
  {
    id: 23,
    title: '恋与制作人',
    category: '角色扮演',
    rating: 4.7,
    image: '/placeholder.jpg',
    description: '在虚拟世界中体验恋爱剧情，与不同性格的角色互动',
    releaseDate: '2023-11-30'
  },
  {
    id: 24,
    title: '小小医师',
    category: '角色扮演',
    rating: 4.2,
    image: '/placeholder.jpg',
    description: '扮演医院院长角色，管理医院，治疗患者，提升医疗技能',
    releaseDate: '2023-11-30'
  },
  {
    id: 25,
    title: '2048',
    category: '益智',
    rating: 4.8,
    image: '/placeholder.jpg',
    description: '经典的数字合并游戏，简单上手但极具挑战性',
    releaseDate: '2024-04-05',
    iframeUrl: 'https://play2048.co/'
  },
  {
    id: 26,
    title: '怪物生存者',
    category: '冒险',
    rating: 4.9,
    image: '/placeholder.jpg',
    description: '在充满怪物的世界中生存并变得更强',
    releaseDate: '2024-04-10',
    iframeUrl: 'https://wanted5games.com/games/html5/monster-survivors-new-en-s-iga-cloud/index.html?pub=10',
    trend: 'up'
  }
]

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<keyof RankingData>('popular')
  const [rankingData, setRankingData] = useState<RankingData>({
    popular: [],
    rating: [],
    latest: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchGameData() {
      try {
        setIsLoading(true)
        
        // 创建游戏对象数组的副本
        let games = [...baseGamesData]
        
        // 获取每个游戏的评分和评论数据
        const gamesWithData = await Promise.all(
          games.map(async (game) => {
            // 获取评分数据
            const ratingResponse = await fetch(`/api/ratings/${game.id}`)
            const ratingData = await ratingResponse.json()
            
            // 获取评论数据
            const commentsResponse = await fetch(`/api/comments/${game.id}`)
            const commentsData = await commentsResponse.json()
            
            return {
              ...game,
              commentCount: commentsData.length,
              averageRating: ratingData.averageRating || game.rating
            }
          })
        )
        
        // 创建不同排序的排行榜
        const rankings: RankingData = {
          // 热门游戏 - 按评论数量排序
          popular: [...gamesWithData].sort((a, b) => 
            (b.commentCount || 0) - (a.commentCount || 0)
          ),
          
          // 好评游戏 - 按平均评分排序
          rating: [...gamesWithData].sort((a, b) => 
            (b.averageRating || 0) - (a.averageRating || 0)
          ),
          
          // 最新游戏 - 按添加时间排序（通过releaseDate字段）
          latest: [...gamesWithData].sort((a, b) => 
            new Date(b.releaseDate || '').getTime() - new Date(a.releaseDate || '').getTime()
          )
        }
        
        setRankingData(rankings)
      } catch (error) {
        console.error('Error fetching game data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchGameData()
  }, [])

  // 获取当前排行榜数据
  const currentRanking = rankingData[activeTab]

  // 渲染趋势图标
  const renderTrendIcon = (trend: Game['trend']) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        )
      case 'down':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        )
    }
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">游戏排行榜</h1>

        {/* 排行榜切换标签 */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'popular'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-indigo-50'
            }`}
          >
            热门游戏
          </button>
          <button
            onClick={() => setActiveTab('rating')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'rating'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-indigo-50'
            }`}
          >
            好评游戏
          </button>
          <button
            onClick={() => setActiveTab('latest')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'latest'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-indigo-50'
            }`}
          >
            最新游戏
          </button>
        </div>

        {/* 排行榜列表 */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {currentRanking.map((game: Game, index: number) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
              >
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex items-start">
                    {/* 排名编号 */}
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-lg font-semibold text-indigo-600">{index + 1}</span>
                    </div>
                    
                    {/* 游戏图标/图片 */}
                    <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-4xl">🎮</span>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{game.title}</h3>
                          <p className="text-sm text-gray-500">{game.category}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          {/* 显示对应的数据 */}
                          {activeTab === 'popular' && (
                            <div className="text-sm text-gray-600">
                              {game.commentCount || 0} 条评论
                            </div>
                          )}
                          
                          {/* 评分 */}
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="text-gray-600">{game.averageRating ? game.averageRating.toFixed(1) : game.rating.toFixed(1)}</span>
                          </div>
                          
                          {/* 发布日期（仅在最新游戏标签页显示） */}
                          {activeTab === 'latest' && (
                            <div className="text-sm text-gray-500">
                              {game.releaseDate}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{game.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
} 