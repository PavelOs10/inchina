#!/bin/bash
set -euo pipefail

# ══════════════════════════════════════════════════════════════════
# InChina — Quick Update Script
# Run from the project root after pulling new code
# Usage: sudo bash scripts/update.sh
# ══════════════════════════════════════════════════════════════════

APP_DIR="/var/www/inchina"
APP_USER="inchina"

echo "Updating InChina..."

# Copy new files
echo "[1/4] Copying files..."
cp -r backend/* "$APP_DIR/backend/"
cp -r frontend/src "$APP_DIR/frontend/src"
cp -r frontend/index.html "$APP_DIR/frontend/" 2>/dev/null || true
cp frontend/vite.config.ts "$APP_DIR/frontend/"
cp frontend/package.json "$APP_DIR/frontend/"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

# Rebuild frontend
echo "[2/4] Rebuilding frontend..."
cd "$APP_DIR/frontend"
sudo -u "$APP_USER" npm install
sudo -u "$APP_USER" npm run build

# Install backend deps if changed
echo "[3/4] Updating backend dependencies..."
cd "$APP_DIR/backend"
sudo -u "$APP_USER" npm install --production

# Restart service
echo "[4/4] Restarting service..."
systemctl restart inchina

echo "✅ Update complete!"
