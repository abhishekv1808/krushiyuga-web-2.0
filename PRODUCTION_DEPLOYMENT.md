# Krushiyuga Web 2.0 - Production Deployment Guide

## Project Overview
Krushiyuga Web 2.0 is a modern agricultural platform built with Node.js, Express, MongoDB, and TailwindCSS. This guide covers deployment to Hostinger VPS.

## Prerequisites
- Node.js 18.x or higher
- MongoDB database (MongoDB Atlas recommended)
- Email credentials for contact form notifications
- Hostinger VPS with Ubuntu/CentOS

## Environment Setup

### 1. Environment Variables (.env file)
Create a `.env` file in the project root with:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_mongodb_connection_string
EMAIL_PASSWORD=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 2. Required Dependencies
All production dependencies are included in package.json:
- express: Web framework
- mongoose: MongoDB ODM
- ejs: Template engine
- nodemailer: Email functionality
- cloudinary: Image management
- tailwindcss: CSS framework

## Deployment Steps for Hostinger VPS

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx (optional, for reverse proxy)
sudo apt install nginx -y
```

### 2. Upload Project Files
```bash
# Create project directory
mkdir /var/www/krushiyuga
cd /var/www/krushiyuga

# Upload your project files (via FTP, SCP, or Git)
# Ensure all files except node_modules are uploaded
```

### 3. Install Dependencies
```bash
cd /var/www/krushiyuga
npm install --production
```

### 4. Build CSS
```bash
npm run build
```

### 5. Start Application with PM2
```bash
# Start the application
pm2 start app.js --name "krushiyuga"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 6. Configure Nginx (Optional but Recommended)
Create `/etc/nginx/sites-available/krushiyuga`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static files directly
    location /css/ {
        alias /var/www/krushiyuga/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/krushiyuga /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Database Configuration

### MongoDB Atlas (Recommended)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add your server IP to whitelist
4. Create a database user
5. Get connection string and add to .env

### Local MongoDB (Alternative)
```bash
# Install MongoDB
sudo apt install mongodb -y
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Security Configuration

### 1. Firewall Setup
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 2. SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Monitoring and Maintenance

### PM2 Commands
```bash
# Check application status
pm2 status

# View logs
pm2 logs krushiyuga

# Restart application
pm2 restart krushiyuga

# Monitor resources
pm2 monit
```

### Log Management
```bash
# Setup log rotation
pm2 install pm2-logrotate
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   sudo netstat -tulpn | grep :3000
   sudo kill -9 PID
   ```

2. **Permission denied**
   ```bash
   sudo chown -R $USER:$USER /var/www/krushiyuga
   ```

3. **MongoDB connection failed**
   - Check MONGODB_URI in .env
   - Verify network access in MongoDB Atlas
   - Check firewall settings

4. **Email not sending**
   - Verify EMAIL_PASSWORD in .env
   - Check Gmail app password settings
   - Confirm "Less secure app access" or app passwords

## Performance Optimization

### 1. Enable Gzip in Nginx
Add to nginx config:
```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
gzip_comp_level 6;
```

### 2. Static File Caching
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## Backup Strategy

### 1. Database Backup
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$MONGODB_URI" --out="/backups/mongodb_$DATE"
```

### 2. Application Backup
```bash
# Backup application files
tar -czf /backups/krushiyuga_$DATE.tar.gz /var/www/krushiyuga
```

## Deployment Checklist

- [ ] Node.js 18.x installed
- [ ] Project files uploaded
- [ ] .env file configured
- [ ] Dependencies installed
- [ ] CSS built with TailwindCSS
- [ ] PM2 process started
- [ ] Nginx configured (if used)
- [ ] SSL certificate installed
- [ ] Database connected
- [ ] Email functionality tested
- [ ] Domain configured
- [ ] Monitoring setup

## Support

For deployment issues:
1. Check PM2 logs: `pm2 logs krushiyuga`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify environment variables
4. Test database connectivity

## Post-Deployment Testing

1. Visit your domain to ensure the site loads
2. Test contact form submission
3. Verify email notifications
4. Test all page navigation
5. Check mobile responsiveness
6. Verify SSL certificate

Your Krushiyuga Web 2.0 application is now ready for production deployment!
