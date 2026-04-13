import TelegramBot from 'node-telegram-bot-api';
import db from './db.js';
import bcrypt from 'bcrypt';

let bot = null;

export function initBot(token) {
  if (!token) {
    console.warn('[TG Bot] TELEGRAM_BOT_TOKEN not set — bot disabled');
    return null;
  }

  bot = new TelegramBot(token, { polling: true });
  const authorizedChats = new Set();

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id,
      '🏭 *InChina Admin Bot*\n\n' +
      'Для доступа к заявкам введите пароль:\n' +
      '`/login <пароль>`',
      { parse_mode: 'Markdown' }
    );
  });

  bot.onText(/\/login (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const password = match[1].trim();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      bot.sendMessage(chatId, '❌ ADMIN_PASSWORD не настроен в .env');
      return;
    }

    const isValid = await bcrypt.compare(password, adminPassword);
    if (isValid) {
      authorizedChats.add(chatId);
      bot.sendMessage(chatId,
        '✅ Доступ разрешён!\n\n' +
        'Команды:\n' +
        '/leads — последние 10 заявок\n' +
        '/lead <id> — подробности заявки\n' +
        '/stats — статистика\n' +
        '/contacts — контактная информация\n' +
        '/status <id> <new|processing|done|rejected> — сменить статус',
        { parse_mode: 'Markdown' }
      );
    } else {
      bot.sendMessage(chatId, '❌ Неверный пароль');
    }
  });

  function isAuthorized(chatId) {
    if (!authorizedChats.has(chatId)) {
      bot.sendMessage(chatId, '🔒 Сначала введите `/login <пароль>`', { parse_mode: 'Markdown' });
      return false;
    }
    return true;
  }

  bot.onText(/\/leads/, (msg) => {
    if (!isAuthorized(msg.chat.id)) return;
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC LIMIT 10').all();
    if (leads.length === 0) {
      bot.sendMessage(msg.chat.id, '📭 Заявок пока нет');
      return;
    }
    const statusEmoji = { new: '🆕', processing: '⏳', done: '✅', rejected: '❌' };
    const text = leads.map(l =>
      `${statusEmoji[l.status] || '❔'} *#${l.id}* — ${l.name}\n` +
      `   📧 ${l.email} | 🏢 ${l.company || '—'}\n` +
      `   📅 ${l.created_at}`
    ).join('\n\n');
    bot.sendMessage(msg.chat.id, `📋 *Последние заявки:*\n\n${text}`, { parse_mode: 'Markdown' });
  });

  bot.onText(/\/lead (\d+)/, (msg, match) => {
    if (!isAuthorized(msg.chat.id)) return;
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(match[1]);
    if (!lead) {
      bot.sendMessage(msg.chat.id, '❌ Заявка не найдена');
      return;
    }
    const statusEmoji = { new: '🆕', processing: '⏳', done: '✅', rejected: '❌' };
    const text =
      `${statusEmoji[lead.status] || '❔'} *Заявка #${lead.id}*\n\n` +
      `👤 *Имя:* ${lead.name}\n` +
      `🏢 *Компания:* ${lead.company || '—'}\n` +
      `📧 *Email:* ${lead.email}\n` +
      `📦 *Объём:* ${lead.qty || '—'}\n` +
      `💬 *Сообщение:* ${lead.message || '—'}\n` +
      `📊 *Статус:* ${lead.status}\n` +
      `📝 *Заметки:* ${lead.notes || '—'}\n` +
      `📅 *Дата:* ${lead.created_at}`;
    bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' });
  });

  bot.onText(/\/status (\d+) (new|processing|done|rejected)/, (msg, match) => {
    if (!isAuthorized(msg.chat.id)) return;
    const result = db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(match[2], match[1]);
    if (result.changes > 0) {
      bot.sendMessage(msg.chat.id, `✅ Статус заявки #${match[1]} изменён на *${match[2]}*`, { parse_mode: 'Markdown' });
    } else {
      bot.sendMessage(msg.chat.id, '❌ Заявка не найдена');
    }
  });

  bot.onText(/\/stats/, (msg) => {
    if (!isAuthorized(msg.chat.id)) return;
    const total = db.prepare('SELECT COUNT(*) as c FROM leads').get().c;
    const byStatus = db.prepare('SELECT status, COUNT(*) as c FROM leads GROUP BY status').all();
    const today = db.prepare("SELECT COUNT(*) as c FROM leads WHERE date(created_at) = date('now')").get().c;
    const week = db.prepare("SELECT COUNT(*) as c FROM leads WHERE created_at >= datetime('now', '-7 days')").get().c;

    const statusEmoji = { new: '🆕', processing: '⏳', done: '✅', rejected: '❌' };
    const statusText = byStatus.map(s => `  ${statusEmoji[s.status] || '❔'} ${s.status}: ${s.c}`).join('\n');

    bot.sendMessage(msg.chat.id,
      `📊 *Статистика:*\n\n` +
      `📝 Всего: ${total}\n` +
      `📅 Сегодня: ${today}\n` +
      `📆 За неделю: ${week}\n\n` +
      `*По статусам:*\n${statusText}`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.onText(/\/contacts/, (msg) => {
    if (!isAuthorized(msg.chat.id)) return;
    const contacts = db.prepare('SELECT key, value FROM contacts ORDER BY key').all();
    const text = contacts.map(c => `*${c.key}:* ${c.value}`).join('\n');
    bot.sendMessage(msg.chat.id, `📇 *Контактная информация:*\n\n${text}`, { parse_mode: 'Markdown' });
  });

  console.log('[TG Bot] Started successfully');
  return bot;
}

export function notifyNewLead(lead) {
  if (!bot) return;

  const notifyChatIds = process.env.NOTIFY_CHAT_IDS;
  if (!notifyChatIds) return;

  const chatIds = notifyChatIds.split(',').map(id => id.trim());
  const text =
    `🔔 *Новая заявка #${lead.id}!*\n\n` +
    `👤 *Имя:* ${lead.name}\n` +
    `🏢 *Компания:* ${lead.company || '—'}\n` +
    `📧 *Email:* ${lead.email}\n` +
    `📦 *Объём:* ${lead.qty || '—'}\n` +
    `💬 *Сообщение:* ${lead.message || '—'}\n\n` +
    `Для деталей: /lead ${lead.id}`;

  chatIds.forEach(chatId => {
    bot.sendMessage(chatId, text, { parse_mode: 'Markdown' }).catch(err => {
      console.error(`[TG Bot] Failed to notify ${chatId}:`, err.message);
    });
  });
}
