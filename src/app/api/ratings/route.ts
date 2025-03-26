import { NextResponse } from 'next/server';
import { db } from '../../lib/db';

// 处理POST请求 - 提交评分
export async function POST(request: Request) {
  try {
    const { gameId, rating } = await request.json();

    if (!gameId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: '无效的游戏ID或评分' },
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

    // 插入新评分
    await db.run(
      `INSERT INTO ratings (gameId, rating) VALUES (?, ?)`,
      [gameId, rating]
    );

    // 获取更新后的平均评分和总评分数
    const result = await db.get(
      `SELECT AVG(rating) as averageRating, COUNT(*) as totalRatings 
       FROM ratings WHERE gameId = ?`,
      [gameId]
    );

    return NextResponse.json({
      success: true,
      averageRating: Number(result.averageRating),
      totalRatings: result.totalRatings,
    });
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json(
      { error: '评分提交失败' },
      { status: 500 }
    );
  }
} 