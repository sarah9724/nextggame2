const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 创建 Express 应用
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 创建数据库连接
const db = new sqlite3.Database(path.join(__dirname, 'comments.db'), (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    
    // 创建评论表
    db.run(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gameId INTEGER NOT NULL,
        nickname TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      )
    `);
  }
});

// 根路径处理
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the NextGGame API',
    endpoints: {
      comments: {
        get: '/api/comments/:gameId',
        post: '/api/comments'
      }
    }
  });
});

// 测试路由
app.get('/api/test', (req, res) => {
  res.json({ status: 'API is working' });
});

// API 路由

// 获取游戏评论
app.get('/api/comments/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  
  db.all(
    'SELECT * FROM comments WHERE gameId = ? ORDER BY timestamp DESC',
    [gameId],
    (err, rows) => {
      if (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Failed to fetch comments' });
      } else {
        res.json(rows);
      }
    }
  );
});

// 添加评论
app.post('/api/comments', (req, res) => {
  const { gameId, nickname, content } = req.body;
  
  if (!gameId || !nickname || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const timestamp = Date.now();

  db.run(
    'INSERT INTO comments (gameId, nickname, content, timestamp) VALUES (?, ?, ?, ?)',
    [gameId, nickname, content, timestamp],
    function(err) {
      if (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ error: 'Failed to add comment' });
      } else {
        res.json({
          id: this.lastID,
          gameId,
          nickname,
          content,
          timestamp
        });
      }
    }
  );
});

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}/api/test`);
  console.log(`View API documentation at http://localhost:${PORT}/`);
}); 