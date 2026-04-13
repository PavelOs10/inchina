import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';
import { authMiddleware, generateToken, checkPassword } from './auth.js';
import { initBot, notifyNewLead } from './telegram.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Public API: submit lead ──
app.post('/api/leads', (req, res) => {
  const { name, company, email, qty, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  try {
    const stmt = db.prepare(
      'INSERT INTO leads (name, company, email, qty, message) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(name, company || '', email, qty || '', message || '');
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(result.lastInsertRowid);

    // Notify via Telegram
    notifyNewLead(lead);

    res.status(201).json({ success: true, id: lead.id });
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── Public API: get contacts ──
app.get('/api/contacts', (_req, res) => {
  const contacts = db.prepare('SELECT key, value FROM contacts ORDER BY key').all();
  const obj = {};
  contacts.forEach(c => { obj[c.key] = c.value; });
  res.json(obj);
});

// ── Auth: login ──
app.post('/api/auth/login', async (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD not configured' });
  }

  const isValid = await checkPassword(password, adminPassword);
  if (!isValid) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  const token = generateToken({ role: 'admin' });
  res.json({ token });
});

// ── Protected: leads CRUD ──
app.get('/api/admin/leads', authMiddleware, (req, res) => {
  const { status, page = 1, limit = 20, search } = req.query;
  const offset = (page - 1) * limit;

  let where = '1=1';
  const params = [];

  if (status && status !== 'all') {
    where += ' AND status = ?';
    params.push(status);
  }
  if (search) {
    where += ' AND (name LIKE ? OR email LIKE ? OR company LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s);
  }

  const total = db.prepare(`SELECT COUNT(*) as c FROM leads WHERE ${where}`).get(...params).c;
  const leads = db.prepare(
    `SELECT * FROM leads WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`
  ).all(...params, Number(limit), Number(offset));

  res.json({ leads, total, page: Number(page), pages: Math.ceil(total / limit) });
});

app.get('/api/admin/leads/:id', authMiddleware, (req, res) => {
  const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!lead) return res.status(404).json({ error: 'Not found' });
  res.json(lead);
});

app.patch('/api/admin/leads/:id', authMiddleware, (req, res) => {
  const { status, notes } = req.body;
  const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!lead) return res.status(404).json({ error: 'Not found' });

  if (status) {
    db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(status, req.params.id);
  }
  if (notes !== undefined) {
    db.prepare('UPDATE leads SET notes = ? WHERE id = ?').run(notes, req.params.id);
  }

  const updated = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  res.json(updated);
});

app.delete('/api/admin/leads/:id', authMiddleware, (req, res) => {
  const result = db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// ── Protected: contacts CRUD ──
app.get('/api/admin/contacts', authMiddleware, (_req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY key').all();
  res.json(contacts);
});

app.put('/api/admin/contacts/:key', authMiddleware, (req, res) => {
  const { value } = req.body;
  if (!value) return res.status(400).json({ error: 'value is required' });

  db.prepare(
    'INSERT INTO contacts (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP'
  ).run(req.params.key, value, value);

  res.json({ key: req.params.key, value });
});

app.delete('/api/admin/contacts/:key', authMiddleware, (req, res) => {
  const result = db.prepare('DELETE FROM contacts WHERE key = ?').run(req.params.key);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// ── Protected: stats ──
app.get('/api/admin/stats', authMiddleware, (_req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM leads').get().c;
  const byStatus = db.prepare('SELECT status, COUNT(*) as c FROM leads GROUP BY status').all();
  const today = db.prepare("SELECT COUNT(*) as c FROM leads WHERE date(created_at) = date('now')").get().c;
  const week = db.prepare("SELECT COUNT(*) as c FROM leads WHERE created_at >= datetime('now', '-7 days')").get().c;
  const month = db.prepare("SELECT COUNT(*) as c FROM leads WHERE created_at >= datetime('now', '-30 days')").get().c;

  const daily = db.prepare(
    "SELECT date(created_at) as date, COUNT(*) as count FROM leads WHERE created_at >= datetime('now', '-30 days') GROUP BY date(created_at) ORDER BY date"
  ).all();

  res.json({ total, today, week, month, byStatus, daily });
});

// ── Serve frontend (production) ──
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ── Start ──
initBot(process.env.TELEGRAM_BOT_TOKEN);

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
