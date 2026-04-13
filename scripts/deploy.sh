#!/bin/bash
set -euo pipefail

# ══════════════════════════════════════════════════════════════════
# InChina — VPS Deploy Script
# Usage: sudo bash deploy.sh <domain> [email]
# Example: sudo bash deploy.sh in-china.shop admin@in-china.shop
# ══════════════════════════════════════════════════════════════════

DOMAIN="${1:-}"
EMAIL="${2:-admin@${DOMAIN}}"
APP_DIR="/var/www/inchina"
APP_USER="inchina"
NODE_VERSION="20"

if [ -z "$DOMAIN" ]; then
  echo "Usage: sudo bash deploy.sh <domain> [email_for_certbot]"
  echo "Example: sudo bash deploy.sh in-china.shop admin@in-china.shop"
  exit 1
fi

if [ "$EUID" -ne 0 ]; then
  echo "Error: Run as root (sudo)"
  exit 1
fi

echo "══════════════════════════════════════════"
echo "  InChina Deploy → ${DOMAIN}"
echo "══════════════════════════════════════════"

# ── 1. System dependencies ──
echo "[1/8] Installing system packages..."
apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx curl build-essential

# ── 2. Node.js ──
if ! command -v node &>/dev/null || ! node -v | grep -q "v${NODE_VERSION}"; then
  echo "[2/8] Installing Node.js ${NODE_VERSION}..."
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y -qq nodejs
else
  echo "[2/8] Node.js already installed: $(node -v)"
fi

# ── 3. App user ──
echo "[3/8] Setting up app user and directory..."
if ! id "$APP_USER" &>/dev/null; then
  useradd -r -m -s /bin/bash "$APP_USER"
fi
mkdir -p "$APP_DIR"
cp -r . "$APP_DIR/"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

# ── 4. Backend dependencies ──
echo "[4/8] Installing backend dependencies..."
cd "$APP_DIR/backend"
sudo -u "$APP_USER" npm install --production

# ── 5. Frontend build ──
echo "[5/8] Building frontend..."
cd "$APP_DIR/frontend"
sudo -u "$APP_USER" npm install
sudo -u "$APP_USER" npm run build

# ── 6. .env check ──
if [ ! -f "$APP_DIR/backend/.env" ]; then
  echo ""
  echo "⚠️  No .env file found!"
  echo "   Copy the example and configure it:"
  echo "   cp $APP_DIR/backend/.env.example $APP_DIR/backend/.env"
  echo "   nano $APP_DIR/backend/.env"
  echo ""
  echo "   Generate password hash:"
  echo "   cd $APP_DIR/backend && node hash-password.js YourPassword"
  echo ""
  cp "$APP_DIR/backend/.env.example" "$APP_DIR/backend/.env"
  chown "$APP_USER:$APP_USER" "$APP_DIR/backend/.env"
  chmod 600 "$APP_DIR/backend/.env"
fi

# ── 7. Systemd service ──
echo "[6/8] Creating systemd service..."
cat > /etc/systemd/system/inchina.service << EOF
[Unit]
Description=InChina Backend
After=network.target

[Service]
Type=simple
User=${APP_USER}
WorkingDirectory=${APP_DIR}/backend
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal
SyslogIdentifier=inchina
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable inchina
systemctl restart inchina

# ── 8. Nginx ──
echo "[7/8] Configuring nginx..."
cat > /etc/nginx/sites-available/inchina << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Frontend static files
    root ${APP_DIR}/frontend/dist;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 256;

    # Static asset caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        try_files \$uri =404;
    }

    # API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # Rate limit for lead submissions
        limit_req zone=leads burst=5 nodelay;
    }

    # SPA fallback
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Rate limiting zone
if ! grep -q "limit_req_zone.*leads" /etc/nginx/nginx.conf; then
  sed -i '/http {/a\    limit_req_zone $binary_remote_addr zone=leads:10m rate=5r/m;' /etc/nginx/nginx.conf
fi

ln -sf /etc/nginx/sites-available/inchina /etc/nginx/sites-enabled/inchina
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl reload nginx

# ── 9. SSL Certificate ──
echo "[8/8] Obtaining SSL certificate..."
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect || {
  echo ""
  echo "⚠️  Certbot failed. Make sure DNS A records point to this server."
  echo "   Run manually later:"
  echo "   certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
}

# ── Done ──
echo ""
echo "══════════════════════════════════════════"
echo "  ✅ Deployment complete!"
echo "══════════════════════════════════════════"
echo ""
echo "  Site:   https://${DOMAIN}"
echo "  Admin:  https://${DOMAIN}/admin"
echo "  API:    https://${DOMAIN}/api/contacts"
echo ""
echo "  Service: systemctl status inchina"
echo "  Logs:    journalctl -u inchina -f"
echo ""
echo "  ⚠️  Don't forget to configure .env:"
echo "  nano ${APP_DIR}/backend/.env"
echo ""
echo "  After editing .env, restart:"
echo "  systemctl restart inchina"
echo ""
