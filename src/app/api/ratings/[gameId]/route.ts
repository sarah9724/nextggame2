import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { NextRequest } from 'next/server';

// 处理GET请求 - 获取游戏评分
export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const gameIdParam = params.gameId;
    const gameId = parseInt(gameIdParam);

    if (isNaN(gameId)) {
      return NextResponse.json(
        { error: 'Invalid game ID' },
        { status: 400 }
      );
    }

    // 检查现有ratings表结构
    const tableInfo = await db.all(
      `PRAGMA table_info(ratings)`
    );
    
    // 如果表不存在或表结构不匹配预期，则重新创建
    if (tableInfo.length === 0) {
      // 创建ratings表
      await db.exec(`
        CREATE TABLE ratings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          gameId INTEGER NOT NULL,
          rating INTEGER NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }

    // 获取游戏的平均评分和总评分数
    const result = await db.get(
      `SELECT AVG(rating) as averageRating, COUNT(*) as totalRatings 
       FROM ratings WHERE gameId = ?`,
      [gameId]
    );

    return NextResponse.json({
      averageRating: result.averageRating ? Number(result.averageRating) : 0,
      totalRatings: result.totalRatings || 0,
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { error: '获取评分失败' },
      { status: 500 }
    );
  }
} 