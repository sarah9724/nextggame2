'use client'

import React, { useState, useEffect } from 'react'

interface RatingSystemProps {
  gameId: number
  initialRating?: number
}

// 获取唯一用户ID，安全处理服务器端渲染
function getUserId() {
  if (typeof window === 'undefined') {
    // 在服务器端返回空字符串
    return '';
  }
  
  // 检查sessionStorage中是否已有userId
  let userId = sessionStorage.getItem('femaleGamer-userId');
  
  // 如果没有，生成一个新的并保存
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('femaleGamer-userId', userId);
  }
  
  return userId;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ gameId, initialRating = 0 }) => {
  const [rating, setRating] = useState<number>(0)
  const [hover, setHover] = useState<number>(0)
  const [hasRated, setHasRated] = useState<boolean>(false)
  const [avgRating, setAvgRating] = useState<number>(initialRating)
  const [totalRatings, setTotalRatings] = useState<number>(0)
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    // 在客户端设置userId
    setUserId(getUserId());
    
    // 加载用户之前的评分和游戏的平均评分
    const fetchRatings = async () => {
      try {
        // 获取游戏的评分信息
        const response = await fetch(`/api/ratings/${gameId}`);
        if (response.ok) {
          const data = await response.json();
          setAvgRating(data.averageRating || initialRating);
          setTotalRatings(data.totalRatings || 0);
          
          // 检查当前会话中用户是否已经评分
          if (typeof window !== 'undefined') {
            const userRating = sessionStorage.getItem(`game-rating-${gameId}`);
            if (userRating) {
              setRating(parseInt(userRating));
              setHasRated(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [gameId, initialRating]);

  const handleRating = async (value: number) => {
    if (hasRated) {
      console.log('您在此次会话中已经评分过了');
      return; // 用户在此次会话中已经评分，不允许再次评分
    }

    setRating(value);
    setHasRated(true);
    
    // 存储用户评分到会话存储
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`game-rating-${gameId}`, value.toString());
    }

    try {
      // 发送评分到服务器
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId,
          rating: value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvgRating(data.averageRating);
        setTotalRatings(data.totalRatings);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center">
        <div className="mr-2 text-sm text-gray-600 min-w-20">你的评分:</div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-2xl focus:outline-none ${
                (hover || rating) >= star
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              } transition-colors`}
              onClick={() => handleRating(star)}
              onMouseEnter={() => !hasRated && setHover(star)}
              onMouseLeave={() => !hasRated && setHover(0)}
              disabled={hasRated}
            >
              ★
            </button>
          ))}
        </div>
        {hasRated && (
          <span className="ml-2 text-sm text-green-600">
            已评分
          </span>
        )}
      </div>
      
      <div className="flex items-center mt-1">
        <div className="mr-2 text-sm text-gray-600 min-w-20">平均评分:</div>
        <div className="flex text-yellow-400 text-2xl">
          {'★'.repeat(Math.floor(avgRating))}
          {avgRating % 1 >= 0.5 ? '½' : ''}
          {'☆'.repeat(5 - Math.ceil(avgRating))}
        </div>
        <span className="ml-2 text-gray-500">
          {avgRating.toFixed(1)} ({totalRatings} 人评分)
        </span>
      </div>
    </div>
  )
}

export default RatingSystem 