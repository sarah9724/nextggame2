import { NextResponse } from 'next/server';
import { db } from '../../lib/db';

// 处理POST请求 - 提交新评论
export async function POST(request: Request) {
  try {
    const { gameId, nickname, content } = await request.json();

    if (!gameId || !nickname || !content) {
      return NextResponse.json(
        { error: '缺少必要参数' },
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

    // 插入新评论
    const timestamp = Date.now();
    const result = await db.run(
      `INSERT INTO comments (gameId, nickname, content, timestamp) VALUES (?, ?, ?, ?)`,
      [gameId, nickname, content, timestamp]
    );

    // 获取插入的评论ID
    const commentId = result.lastID;

    // 返回新创建的评论
    return NextResponse.json({
      id: commentId,
      gameId,
      nickname,
      content,
      timestamp
    });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json(
      { error: '评论提交失败' },
      { status: 500 }
    );
  }
} 