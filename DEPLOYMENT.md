# Deployment Guide

## 🚀 Render Deployment (Recommended)

### **Step 1: Prepare Repository**
Ensure your project is pushed to GitHub with all changes:
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### **Step 2: Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### **Step 3: Deploy Web Service**
1. Click **"New +"** → **"Web Service"**
2. Select **"Build and deploy from a Git repository"**
3. Choose `krushiyuga-web-2.0` repository
4. Configure deployment settings:

**Basic Settings:**
- **Name**: `krushiyuga-web-app`
- **Region**: Singapore (closest to India)
- **Branch**: `main`
- **Root Directory**: (leave blank)
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### **Step 4: Environment Variables**
Add these in Render dashboard under "Environment":

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://abhishekv1808:Grow%40%24%402025@aribnb.xvmlcnz.mongodb.net/krushiyuga?retryWrites=true&w=majority&appName=aribnb
```

### **Step 5: Deploy**
Click **"Create Web Service"** - Render will automatically:
- Clone repository
- Install dependencies
- Build CSS assets
- Start the application

---

## 🌐 Alternative Deployment Options

### **Heroku Deployment**
```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create krushiyuga-web-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Railway Deployment**
1. Connect GitHub repository
2. Set environment variables
3. Deploy with one click

---

## 📋 Pre-deployment Checklist

- ✅ Port configured for production (`process.env.PORT`)
- ✅ MongoDB URI as environment variable
- ✅ Build script for CSS compilation
- ✅ Start script using `node app.js`
- ✅ Node.js version specified in package.json
- ✅ All dependencies in production
- ✅ Static files properly served

## 🔧 Production Configuration

### **Environment Variables Required:**
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
```

### **MongoDB Atlas Setup:**
1. Create free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for cloud deployments)
4. Get connection string

### **Domain Configuration:**
- Render provides: `https://krushiyuga-web-app.onrender.com`
- Custom domain can be added in Render settings

## � Performance Optimizations

- **Free Tier**: App sleeps after 15 minutes of inactivity
- **Paid Tier**: Always-on, faster performance
- **CDN**: Static assets served via Render's CDN
- **Compression**: Gzip enabled by default

## � Troubleshooting

### **Common Issues:**
1. **Build fails**: Check Node.js version compatibility
2. **Database connection**: Verify MongoDB URI format
3. **Static files**: Ensure proper express.static configuration
4. **Port binding**: Use `process.env.PORT`

### **Monitoring:**
- Check logs in Render dashboard
- Monitor performance metrics
- Set up health checks

## 📈 Scaling Options

### **Render Plans:**
- **Free**: 750 hours/month, sleeps after inactivity
- **Starter**: ₹580/month, always-on
- **Standard**: ₹2070/month, enhanced performance

### **Database Scaling:**
- **MongoDB Atlas Free**: 512MB storage
- **Shared clusters**: Up to 5GB
- **Dedicated clusters**: Unlimited scaling
