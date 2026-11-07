#!/bin/bash
set -e

echo "=========================================================="
echo "  Deploying BlueStone Estates on 187.127.188.22"
echo "=========================================================="

# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20, Git, and Nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx ufw

# 3. Install PM2 globally
sudo npm install -g pm2

# 4. Clone or pull repo
APP_DIR="/var/www/bluestone-estates"
if [ -d "$APP_DIR" ]; then
    echo "Directory exists. Pulling latest code..."
    cd $APP_DIR
    git pull origin main
else
    echo "Cloning repository..."
    sudo mkdir -p /var/www
    sudo git clone https://github.com/naitik185700/blue-stone-estates.git $APP_DIR
    sudo chown -R $USER:$USER $APP_DIR
    cd $APP_DIR
fi

# 5. Install dependencies and build
npm ci || npm install
npm run build

# 6. Start or restart with PM2
pm2 delete bluestone-estates 2>/dev/null || true
pm2 start npm --name "bluestone-estates" -- start
pm2 startup | tail -n 1 | sudo bash || true
pm2 save

# 7. Configure Nginx Reverse Proxy for 187.127.188.22
sudo bash -c 'cat > /etc/nginx/sites-available/bluestone << "EOF"
server {
    listen 80;
    server_name 187.127.188.22;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF'

sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/bluestone /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 8. Firewall configuration
sudo ufw allow 22/tcp || true
sudo ufw allow 80/tcp || true
sudo ufw allow 443/tcp || true
sudo ufw --force enable || true

echo "=========================================================="
echo "  SUCCESS! BlueStone Estates is live on:"
echo "  http://187.127.188.22"
echo "=========================================================="
