'use client'

import React, { useState, useEffect } from 'react'

interface Comment {
  id: number
  nickname: string
  content: string
  timestamp: number
  gameId: number
}

interface CommentSectionProps {
  gameId: number
}

const API_BASE_URL = '/api'

export default function CommentSection({ gameId }: CommentSectionProps) {
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 从API加载评论
  useEffect(() => {
    fetchComments()
  }, [gameId])

  // 获取评论
  const fetchComments = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`${API_BASE_URL}/comments/${gameId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch comments')
      }
      const data = await response.json()
      setComments(data)
    } catch (err) {
      setError('加载评论失败，请稍后再试')
      console.error('Error fetching comments:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // 提交评论
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nickname.trim() || !content.trim()) {
      alert('请填写昵称和评论内容')
      return
    }

    try {
      setError(null)
      const response = await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId,
          nickname: nickname.trim(),
          content: content.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add comment')
      }

      const newComment = await response.json()
      setComments([newComment, ...comments])
      setContent('')
      
    } catch (err) {
      setError('发表评论失败，请稍后再试')
      console.error('Error adding comment:', err)
    }
  }

  // 格式化时间
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* 评论输入区域 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="你的昵称"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            maxLength={20}
          />
        </div>
        <div>
          <textarea
            placeholder="写下你的评论..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            rows={4}
            maxLength={500}
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            发表评论
          </button>
        </div>
      </form>

      {/* 评论列表 */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-500 py-4">
            加载评论中...
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-800">{comment.nickname}</h3>
                <span className="text-sm text-gray-500">
                  {formatTime(comment.timestamp)}
                </span>
              </div>
              <p className="mt-2 text-gray-600 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            还没有评论，来说说你的想法吧~
          </div>
        )}
      </div>
    </div>
  )
} 