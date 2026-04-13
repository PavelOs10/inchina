import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'data', 'inchina.db');

import fs from 'fs';
fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT DEFAULT '',
    email TEXT NOT NULL,
    qty TEXT DEFAULT '',
    message TEXT DEFAULT '',
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT DEFAULT ''
  );

  -- Seed default contacts if empty
  INSERT OR IGNORE INTO contacts (key, value) VALUES
    ('email', 'contact@in-china.shop'),
    ('phone', '+7 (999) 000-00-00'),
    ('telegram', '@in_china_shop'),
    ('whatsapp', '+7 (999) 000-00-00'),
    ('wechat', 'InChinaShop'),
    ('response_time', 'В течение 24 часов'),
    ('address', 'Москва, Россия');
`);

export default db;
