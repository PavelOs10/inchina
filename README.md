# InChina — B2B Knitwear Platform

Сайт-каталог трикотажной продукции с бэкендом, админ-панелью и Telegram-ботом.

## Структура проекта

```
project/
├── frontend/          # Vite + React (каталог, лендинг)
│   └── src/app/
│       ├── App.tsx           # Основной сайт + роутинг
│       ├── api.ts            # API клиент
│       └── admin/            # Админ-панель
│           ├── LoginPage.tsx
│           ├── AdminLayout.tsx
│           ├── Dashboard.tsx
│           ├── LeadsPage.tsx
│           └── ContactsPage.tsx
├── backend/           # Express + SQLite
│   ├── server.js             # API сервер
│   ├── db.js                 # БД + миграции
│   ├── auth.js               # JWT аутентификация
│   ├── telegram.js           # Telegram бот
│   ├── hash-password.js      # Утилита хэширования пароля
│   └── .env.example          # Шаблон конфигурации
└── scripts/
    ├── deploy.sh             # Деплой на VPS
    └── update.sh             # Быстрое обновление
```

---

## Шаг 0: Настройка DNS

В панели управления доменом **in-china.shop** создай A-записи:

| Тип  | Имя | Значение |
|------|-----|----------|
| A    | @   | 132.243.217.228 |
| A    | www | 132.243.217.228 |
| AAAA | @   | 2605:e440:f::2:3ba |
| AAAA | www | 2605:e440:f::2:3ba |

DNS-записи обычно применяются за 5-30 минут, иногда до нескольких часов.

Проверить:
```bash
dig in-china.shop +short
# Должен вернуть 132.243.217.228
```

---

## Шаг 1: Подключиться к серверу

```bash
ssh root@132.243.217.228
```

---

## Шаг 2: Загрузить проект на сервер

С локального компьютера:
```bash
scp InChina-fullstack.zip root@132.243.217.228:~/
```

На сервере — распаковать:
```bash
cd ~
apt install -y unzip
unzip InChina-fullstack.zip -d inchina
cd inchina
```

---

## Шаг 3: Настроить .env

```bash
cd ~/inchina/backend
cp .env.example .env
npm install
node hash-password.js ТвойНадёжныйПароль
```

Скопируй вывод и вставь в .env:
```bash
nano .env
```

```env
PORT=3000
ADMIN_PASSWORD=$2b$12$ВСТАВИТЬ_ХЭШ_СЮДА
JWT_SECRET=любая-случайная-строка-минимум-32-символа
TELEGRAM_BOT_TOKEN=
NOTIFY_CHAT_IDS=
```

---

## Шаг 4: Запуск деплоя

```bash
cd ~/inchina
sudo bash scripts/deploy.sh in-china.shop admin@in-china.shop
```

Скрипт автоматически установит Node.js 20, nginx, certbot, соберёт фронтенд, настроит nginx + reverse proxy, создаст systemd-сервис и получит HTTPS-сертификат.

После деплоя:
- Сайт: https://in-china.shop
- Админка: https://in-china.shop/admin

---

## Шаг 5: Настройка Telegram-бота

1. Напиши @BotFather в Telegram, создай бота, получи токен
2. Вставь токен в /var/www/inchina/backend/.env
3. Напиши своему боту /start
4. Открой https://api.telegram.org/bot<ТОКЕН>/getUpdates — найди chat id
5. Вставь в .env NOTIFY_CHAT_IDS=123456789
6. Перезапусти: `sudo systemctl restart inchina`

### Команды бота

- `/start` — приветствие
- `/login <пароль>` — авторизация
- `/leads` — последние 10 заявок
- `/lead <id>` — подробности заявки
- `/status <id> <new|processing|done|rejected>` — сменить статус
- `/stats` — статистика
- `/contacts` — контактная информация

---

## Полезные команды на сервере

```bash
sudo systemctl status inchina     # статус
sudo journalctl -u inchina -f     # логи
sudo systemctl restart inchina    # перезапуск
sudo certbot renew                # обновить сертификат
cd ~/inchina && sudo bash scripts/update.sh  # обновление кода
```
