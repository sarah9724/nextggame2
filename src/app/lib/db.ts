import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let dbInstance: Database | null = null;

async function getDb(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }

  // 确保在服务器端而不是客户端运行
  if (typeof window === 'undefined') {
    const dbPath = path.join(process.cwd(), 'gameweb.db');
    
    dbInstance = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    return dbInstance;
  } else {
    throw new Error('Cannot access database from client side');
  }
}

class DBWrapper {
  async exec(sql: string): Promise<void> {
    const db = await getDb();
    return db.exec(sql);
  }

  async get<T = any>(sql: string, params: any[] = []): Promise<T> {
    const db = await getDb();
    return db.get(sql, ...params);
  }

  async all<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const db = await getDb();
    return db.all(sql, ...params);
  }

  async run(sql: string, params: any[] = []): Promise<any> {
    const db = await getDb();
    return db.run(sql, ...params);
  }
}

export const db = new DBWrapper(); 