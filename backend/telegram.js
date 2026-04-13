import TelegramBot from 'node-telegram-bot-api';
import db from './db.js';
import bcrypt from 'bcrypt';

let bot = null;

// ── DB: авторизованные чаты ──
function initChatTable() {
  db.exec(`CREATE TABLE IF NOT EXISTS bot_chats (
    chat_id INTEGER PRIMARY KEY,
    username TEXT DEFAULT '',
    authorized_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );`);
}
function getAuthorizedChats() {
  return db.prepare('SELECT chat_id FROM bot_chats').all().map(r => r.chat_id);
}
function saveChat(chatId, username) {
  db.prepare('INSERT OR IGNORE INTO bot_chats (chat_id, username) VALUES (?, ?)').run(chatId, username || '');
}
function removeChat(chatId) {
  db.prepare('DELETE FROM bot_chats WHERE chat_id = ?').run(chatId);
}
function isChatAuthorized(chatId) {
  return !!db.prepare('SELECT 1 FROM bot_chats WHERE chat_id = ?').get(chatId);
}

// ── Клавиатуры ──
const mainKeyboard = {
  reply_markup: {
    keyboard: [
      ['📋 Заявки', '📊 Статистика'],
      ['📇 Контакты', '🔕 Отключить уведомления'],
    ],
    resize_keyboard: true,
  },
};

const leadsKeyboard = {
  reply_markup: {
    keyboard: [
      ['🆕 Новые', '⏳ В работе'],
      ['✅ Завершённые', '❌ Отклонённые'],
      ['📋 Все заявки', '◀️ Назад'],
    ],
    resize_keyboard: true,
  },
};

const removeKeyboard = { reply_markup: { remove_keyboard: true } };
const statusEmoji = { new: '🆕', processing: '⏳', done: '✅', rejected: '❌' };

// ── Инициализация ──
export function initBot(token) {
  if (!token) {
    console.warn('[TG Bot] TELEGRAM_BOT_TOKEN not set — bot disabled');
    return null;
  }

  initChatTable();
  bot = new TelegramBot(token, { polling: true });

  const savedCount = getAuthorizedChats().length;
  if (savedCount > 0) console.log(`[TG Bot] ${savedCount} authorized chat(s) loaded`);

  function checkAuth(chatId) {
    if (!isChatAuthorized(chatId)) {
      bot.sendMessage(chatId, '🔒 Введите пароль:\n`/login <пароль>`', { parse_mode: 'Markdown', ...removeKeyboard });
      return false;
    }
    return true;
  }

  function sendLeadsList(chatId, filterStatus) {
    const leads = filterStatus
      ? db.prepare('SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC LIMIT 10').all(filterStatus)
      : db.prepare('SELECT * FROM leads ORDER BY created_at DESC LIMIT 10').all();

    if (!leads.length) {
      bot.sendMessage(chatId, `📭 Заявок${filterStatus ? ` (${filterStatus})` : ''} нет`, leadsKeyboard);
      return;
    }
    const text = leads.map(l =>
      `${statusEmoji[l.status] || '❔'} *#${l.id}* — ${l.name}\n   📧 ${l.email} | 🏢 ${l.company || '—'}\n   📅 ${l.created_at}`
    ).join('\n\n');
    const title = filterStatus ? `Заявки (${filterStatus})` : 'Последние заявки';
    bot.sendMessage(chatId, `📋 *${title}:*\n\n${text}\n\n_Подробнее: /lead <номер>_`, { parse_mode: 'Markdown', ...leadsKeyboard });
  }

  function sendStats(chatId) {
    const total = db.prepare('SELECT COUNT(*) as c FROM leads').get().c;
    const today = db.prepare("SELECT COUNT(*) as c FROM leads WHERE date(created_at) = date('now')").get().c;
    const week = db.prepare("SELECT COUNT(*) as c FROM leads WHERE created_at >= datetime('now', '-7 days')").get().c;
    const byStatus = db.prepare('SELECT status, COUNT(*) as c FROM leads GROUP BY status').all();
    const st = byStatus.map(s => `  ${statusEmoji[s.status] || '❔'} ${s.status}: ${s.c}`).join('\n');
    bot.sendMessage(chatId, `📊 *Статистика:*\n\n📝 Всего: ${total}\n📅 Сегодня: ${today}\n📆 За неделю: ${week}\n\n*По статусам:*\n${st}`, { parse_mode: 'Markdown', ...mainKeyboard });
  }

  function sendContacts(chatId) {
    const contacts = db.prepare('SELECT key, value FROM contacts ORDER BY key').all();
    bot.sendMessage(chatId, `📇 *Контакты:*\n\n${contacts.map(c => `*${c.key}:* ${c.value}`).join('\n')}`, { parse_mode: 'Markdown', ...mainKeyboard });
  }

  // ── /start ──
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '🏭 *InChina Admin Bot*\n\nВведите пароль:\n`/login <пароль>`', { parse_mode: 'Markdown', ...removeKeyboard });
  });

  // ── /login ──
  bot.onText(/\/login (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) { bot.sendMessage(chatId, '❌ ADMIN_PASSWORD не настроен'); return; }

    const isValid = await bcrypt.compare(match[1].trim(), adminPassword);
    if (isValid) {
      saveChat(chatId, msg.from?.username || msg.from?.first_name || '');
      bot.sendMessage(chatId,
        '✅ *Доступ разрешён!*\n\n🔔 Уведомления о новых заявках включены.\n\nИспользуйте кнопки ниже 👇',
        { parse_mode: 'Markdown', ...mainKeyboard }
      );
    } else {
      bot.sendMessage(chatId, '❌ Неверный пароль');
    }
  });

  // ── /lead <id> с inline-кнопками смены статуса ──
  bot.onText(/\/lead (\d+)/, (msg, match) => {
    if (!checkAuth(msg.chat.id)) return;
    const l = db.prepare('SELECT * FROM leads WHERE id = ?').get(match[1]);
    if (!l) { bot.sendMessage(msg.chat.id, '❌ Заявка не найдена', mainKeyboard); return; }

    bot.sendMessage(msg.chat.id,
      `${statusEmoji[l.status] || '❔'} *Заявка #${l.id}*\n\n` +
      `👤 *Имя:* ${l.name}\n🏢 *Компания:* ${l.company || '—'}\n` +
      `📧 *Email:* ${l.email}\n📦 *Объём:* ${l.qty || '—'}\n` +
      `💬 *Сообщение:* ${l.message || '—'}\n📊 *Статус:* ${l.status}\n` +
      `📝 *Заметки:* ${l.notes || '—'}\n📅 *Дата:* ${l.created_at}\n\n_Сменить статус:_`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🆕 Новая', callback_data: `st_${l.id}_new` },
              { text: '⏳ В работе', callback_data: `st_${l.id}_processing` },
            ],
            [
              { text: '✅ Завершена', callback_data: `st_${l.id}_done` },
              { text: '❌ Отклонена', callback_data: `st_${l.id}_rejected` },
            ],
          ],
        },
      }
    );
  });

  // ── /status текстовая команда ──
  bot.onText(/\/status (\d+) (new|processing|done|rejected)/, (msg, match) => {
    if (!checkAuth(msg.chat.id)) return;
    const r = db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(match[2], match[1]);
    bot.sendMessage(msg.chat.id, r.changes > 0 ? `${statusEmoji[match[2]]} Заявка *#${match[1]}* → *${match[2]}*` : '❌ Не найдена', { parse_mode: 'Markdown', ...mainKeyboard });
  });

  // ── Inline-кнопки (смена статуса в карточке заявки) ──
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    if (!isChatAuthorized(chatId)) {
      bot.answerCallbackQuery(query.id, { text: '🔒 Не авторизован' });
      return;
    }
    if (query.data.startsWith('st_')) {
      const [, leadId, newStatus] = query.data.split('_');
      const result = db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(newStatus, leadId);
      if (result.changes > 0) {
        bot.answerCallbackQuery(query.id, { text: '✅ Статус изменён' });
        bot.sendMessage(chatId, `${statusEmoji[newStatus]} Заявка *#${leadId}* → *${newStatus}*`, { parse_mode: 'Markdown', ...mainKeyboard });
      } else {
        bot.answerCallbackQuery(query.id, { text: '❌ Не найдена' });
      }
    }
  });

  // ── Обработка кнопок reply-клавиатуры ──
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (!text || text.startsWith('/')) return;

    switch (text) {
      case '📋 Заявки':
      case '📋 Все заявки':
        if (checkAuth(chatId)) sendLeadsList(chatId, null);
        break;
      case '🆕 Новые':
        if (checkAuth(chatId)) sendLeadsList(chatId, 'new');
        break;
      case '⏳ В работе':
        if (checkAuth(chatId)) sendLeadsList(chatId, 'processing');
        break;
      case '✅ Завершённые':
        if (checkAuth(chatId)) sendLeadsList(chatId, 'done');
        break;
      case '❌ Отклонённые':
        if (checkAuth(chatId)) sendLeadsList(chatId, 'rejected');
        break;
      case '📊 Статистика':
        if (checkAuth(chatId)) sendStats(chatId);
        break;
      case '📇 Контакты':
        if (checkAuth(chatId)) sendContacts(chatId);
        break;
      case '🔕 Отключить уведомления':
        if (isChatAuthorized(chatId)) {
          removeChat(chatId);
          bot.sendMessage(chatId, '🔕 Уведомления отключены.\n\n`/login <пароль>` чтобы включить снова', { parse_mode: 'Markdown', ...removeKeyboard });
        }
        break;
      case '◀️ Назад':
        if (checkAuth(chatId)) bot.sendMessage(chatId, '📱 Главное меню', mainKeyboard);
        break;
    }
  });

  console.log('[TG Bot] Started successfully');
  return bot;
}

// ── Уведомление о новой заявке ──
export function notifyNewLead(lead) {
  if (!bot) return;
  const chatIds = getAuthorizedChats();
  if (!chatIds.length) return;

  const text =
    `🔔 *Новая заявка #${lead.id}!*\n\n` +
    `👤 *Имя:* ${lead.name}\n🏢 *Компания:* ${lead.company || '—'}\n` +
    `📧 *Email:* ${lead.email}\n📦 *Объём:* ${lead.qty || '—'}\n` +
    `💬 *Сообщение:* ${lead.message || '—'}\n\nПодробнее: /lead ${lead.id}`;

  chatIds.forEach(id => {
    bot.sendMessage(id, text, { parse_mode: 'Markdown' }).catch(err => {
      console.error(`[TG Bot] Notify failed ${id}:`, err.message);
    });
  });
}
