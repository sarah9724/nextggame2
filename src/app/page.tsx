'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import AppLayout from './components/AppLayout'
import { useSearchParams } from 'next/navigation'

// 分类数据
const categories = ['全部', '休闲', '益智', '模拟', '角色扮演', '冒险', '策略']

// 游戏数据
const gamesData = [
  {
    id: 1,
    title: '开心消消乐',
    category: '休闲',
    rating: 4.8,
    image: '/placeholder.jpg',
    description: '经典三消游戏，简单易上手，关卡丰富多样。'
  },
  {
    id: 2,
    title: '模拟人生',
    category: '模拟',
    rating: 4.6,
    image: '/placeholder.jpg',
    description: '创建和经营你的虚拟生活，体验不同人生可能性。'
  },
  {
    id: 3,
    title: '动物之森',
    category: '模拟',
    rating: 4.9,
    image: '/placeholder.jpg',
    description: '在温馨的小岛上展开新生活，与可爱的动物邻居互动。'
  },
  {
    id: 5,
    title: '国际象棋',
    category: '益智',
    rating: 4.7,
    image: '/placeholder.jpg',
    description: '经典的国际象棋游戏，锻炼战略思维'
  },
  {
    id: 7,
    title: '花园物语',
    category: '模拟',
    rating: 4.7,
    image: '/placeholder.jpg',
    description: '经营自己的花园，种植各种植物，创造美丽空间。'
  },
  {
    id: 8,
    title: '魔法学院',
    category: '角色扮演',
    rating: 4.4,
    image: '/placeholder.jpg',
    description: '成为魔法学院的学生，学习魔法并完成各种任务。'
  },
  {
    id: 9,
    title: '星际探险',
    category: '冒险',
    rating: 4.6,
    image: '/placeholder.jpg',
    description: '探索未知的星球，完成各种任务和挑战。'
  },
  {
    id: 10,
    title: '王国守卫',
    category: '策略',
    rating: 4.2,
    image: '/placeholder.jpg',
    description: '建立防御系统，保护王国免受入侵者的威胁。'
  },
  {
    id: 11,
    title: '黑白棋',
    category: '益智',
    rating: 4.0,
    image: '/placeholder.jpg',
    description: '经典的黑白棋(奥赛罗)游戏，简单规则蕴含无限变化'
  },
  {
    id: 12,
    title: '餐厅大亨',
    category: '模拟',
    rating: 4.5,
    image: '/placeholder.jpg',
    description: '经营自己的餐厅，招待顾客，提升餐厅等级。'
  },
  {
    id: 18,
    title: '跳棋',
    category: '益智',
    rating: 4.2,
    image: '/placeholder.jpg',
    description: '经典的跳棋游戏，与电脑对战锻炼战略思维'
  },
  {
    id: 19,
    title: '卡通农场',
    category: '模拟',
    rating: 4.5,
    image: '/placeholder.jpg',
    description: '在可爱的卡通世界中建设和管理自己的农场，结交朋友。'
  },
  {
    id: 20,
    title: '美妆达人',
    category: '模拟',
    rating: 4.3,
    image: '/placeholder.jpg',
    description: '体验化妆和时尚造型的乐趣，成为虚拟世界的造型师。'
  },
  {
    id: 21,
    title: '城市建造者',
    category: '模拟',
    rating: 4.4,
    image: '/placeholder.jpg',
    description: '设计和建造自己的梦想城市，管理资源，解决市民问题。'
  },
  {
    id: 22,
    title: '小花仙',
    category: '角色扮演',
    rating: 4.5,
    image: '/placeholder.jpg',
    description: '在花仙子世界中收集花朵，培养精灵，完成奇幻冒险。'
  },
  {
    id: 23,
    title: '恋与制作人',
    category: '角色扮演',
    rating: 4.7,
    image: '/placeholder.jpg',
    description: '在虚拟世界中体验恋爱剧情，与不同性格的角色互动。'
  },
  {
    id: 24,
    title: '小小医师',
    category: '角色扮演',
    rating: 4.2,
    image: '/placeholder.jpg',
    description: '扮演医院院长角色，管理医院，治疗患者，提升医疗技能。'
  },
  {
    id: 25,
    title: '2048',
    category: '益智',
    rating: 4.8,
    image: '/placeholder.jpg',
    description: '经典的数字合并游戏，简单上手但极具挑战性。'
  }
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [filteredGames, setFilteredGames] = useState(gamesData)
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  // 处理分类和搜索过滤
  useEffect(() => {
    let filtered = gamesData

    // 首先按分类过滤
    if (selectedCategory !== '全部') {
      filtered = filtered.filter(game => game.category === selectedCategory)
    }

    // 然后按搜索关键词过滤
    if (searchQuery) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredGames(filtered)
  }, [selectedCategory, searchQuery])

  // 根据分类获取对应的emoji
  function getCategoryEmoji(category: string): string {
    const emojiMap: Record<string, string> = {
      '全部': '🌟',
      '休闲': '🎯',
      '益智': '🧩',
      '模拟': '🏠',
      '角色扮演': '👑',
      '冒险': '🏝️',
      '策略': '♟️'
    }
    return emojiMap[category] || '🎮'
  }

  return (
    <AppLayout>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              搜索结果: "{searchQuery}"
            </h2>
            <p className="text-gray-600 mt-1">
              找到 {filteredGames.length} 个游戏
            </p>
          </div>
        )}

        {/* 分类过滤器 */}
        <div className="mb-12 overflow-auto pb-4 no-scrollbar">
          <div className="flex space-x-3">
            {categories.map(category => (
              <button
                key={category}
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="mr-2">
                  {getCategoryEmoji(category)}
                </span>
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 游戏网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGames.map(game => (
            <Link
              href={`/games/${game.id}`}
              key={game.id}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full border border-gray-100">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-purple-100 to-indigo-100 w-full h-48 flex items-center justify-center">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🎮</div>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center bg-black/50 backdrop-blur-md rounded-full px-2 py-1">
                    <span className="text-yellow-400 text-xs mr-1">★</span>
                    <span className="text-white text-xs">{game.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {game.title}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">
                      {game.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {game.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <span className="text-indigo-600 text-sm font-medium group-hover:underline">查看详情</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 空状态 */}
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">😢</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">没有找到游戏</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `没有找到与"${searchQuery}"相关的游戏，请尝试其他关键词`
                : '当前分类下没有可用的游戏，请尝试选择其他分类'
              }
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
