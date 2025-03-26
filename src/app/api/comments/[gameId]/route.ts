import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { NextRequest } from 'next/server';

// 处理GET请求 - 获取特定游戏的评论
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

    // 创建comments表（如果不存在）
    await db.exec(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gameId INTEGER NOT NULL,
        nickname TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      )
    `);

    // 获取特定游戏的评论
    const comments = await db.all(
      `SELECT * FROM comments WHERE gameId = ? ORDER BY timestamp DESC`,
      [gameId]
    );

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: '获取评论失败' },
      { status: 500 }
    );
  }
} 