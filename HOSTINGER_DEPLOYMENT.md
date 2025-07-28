# Deploying Krushiyuga Web 2.0 on Hostinger VPS

## Prerequisites
- SSH access to your Hostinger VPS
- Node.js 16+ installed on VPS
- MongoDB connection string
- Domain configured in Hostinger DNS

## Step 1: Remove Existing Application and Initial Setup
1. Login to your VPS via SSH:
```bash
ssh root@your_server_ip
```

2. Check running processes on port 3000:
```bash
sudo lsof -i :3000
# or
sudo netstat -tulpn | grep :3000
```

3. Check if PM2 is running any processes:
```bash
pm2 list
```

4. Stop and remove existing application:
```bash
# If using PM2, stop all processes
pm2 stop all
pm2 delete all
pm2 save

# Kill any other process using port 3000 (replace PID with process ID from step 2)
sudo kill -9 PID
```

5. Update system packages:
```bash
apt update && apt upgrade -y
```

3. Install Node.js and npm (if not already installed):
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt install -y nodejs
```

4. Install PM2 (Process Manager):
```bash
npm install -y pm2 -g
```

## Step 2: Clone and Setup Application
1. Install Git:
```bash
apt install git -y
```

2. Create application directory:
```bash
mkdir -p /var/www/krushiyuga
cd /var/www/krushiyuga
```

3. Clone your repository:
```bash
git clone https://github.com/abhishekv1808/krushiyuga-web-2.0.git .
```

4. Install dependencies:
```bash
npm install --production
```

5. Create .env file:
```bash
nano .env
```
Add these environment variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

## Step 3: Configure PM2
1. Start the application with PM2:
```bash
pm2 start app.js --name "krushiyuga"
```

2. Enable PM2 startup script:
```bash
pm2 startup systemd
pm2 save
```

## Step 4: Setup Nginx as Reverse Proxy
1. Install Nginx:
```bash
apt install nginx -y
```

2. Create Nginx configuration:
```bash
nano /etc/nginx/sites-available/krushiyuga
```

Add this configuration:
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable the site:
```bash
ln -s /etc/nginx/sites-available/krushiyuga /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## Step 5: SSL Configuration
1. Install Certbot:
```bash
apt install certbot python3-certbot-nginx -y
```

2. Obtain SSL certificate:
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Maintenance Commands

### Update Application
```bash
cd /var/www/krushiyuga
git pull origin main
npm install --production
pm2 restart krushiyuga
```

### View Logs
```bash
pm2 logs krushiyuga
```

### Monitor Application
```bash
pm2 monit
```

## Common Issues and Solutions

1. If the application crashes:
```bash
pm2 logs krushiyuga
```

2. If Nginx shows 502 Bad Gateway:
```bash
systemctl status nginx
journalctl -u nginx
```

3. To restart everything:
```bash
pm2 restart all
systemctl restart nginx
```

## Security Recommendations

1. Setup UFW Firewall:
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

2. Enable automatic security updates:
```bash
apt install unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```
