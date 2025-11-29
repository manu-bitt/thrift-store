# 🤖 Automated Deployment Guide

I can't directly access your accounts, but here's the easiest way to deploy:

## Option 1: Use the Deployment Script (Easiest)

I've created a script that automates most of the process:

```bash
cd /Users/pankajyadav/Downloads/thrift-store
chmod +x deploy.sh
./deploy.sh
```

This script will:
1. ✅ Install Railway CLI if needed
2. ✅ Login to Railway (opens browser)
3. ✅ Link to your project
4. ✅ Set root directory automatically
5. ✅ Prompt for environment variables
6. ✅ Deploy your app

---

## Option 2: Manual Steps (5 minutes)

### Backend on Railway:

1. **Go to Railway Dashboard**: https://railway.app/project
2. **Click your service**: `thrift-store`
3. **Settings Tab** → **Source**:
   - Set **Root Directory**: `server`
   - Click **Save**
4. **Variables Tab** → Add these:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=any_random_string_here
   NODE_ENV=production
   PORT=10000
   ```
5. **Deployments Tab** → Railway will auto-redeploy
6. **Copy your URL** from the service overview

### Frontend on Vercel:

1. **Go to Vercel**: https://vercel.com/new
2. **Import from GitHub**: `manu-bitt/thrift-store`
3. **Configure**:
   - Root Directory: `client`
   - Framework: Create React App
4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-railway-url.up.railway.app/api
   ```
5. **Deploy** → Done!

---

## Option 3: Railway CLI (If you prefer command line)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Set root directory
railway variables set RAILWAY_ROOT_DIRECTORY=server

# Set environment variables
railway variables set MONGO_URI=your_mongodb_uri
railway variables set JWT_SECRET=your_secret
railway variables set NODE_ENV=production
railway variables set PORT=10000

# Deploy
railway up
```

---

## 🎯 Quickest Path (Recommended)

**Just do this in Railway Dashboard:**

1. Settings → Source → Root Directory = `server` → Save
2. Variables → Add MONGO_URI, JWT_SECRET, NODE_ENV, PORT
3. Wait for auto-deploy
4. Copy URL

**Then Vercel:**
1. Import repo → Root = `client`
2. Add REACT_APP_API_URL
3. Deploy

**Total time: ~5 minutes!** ⚡

---

## Need MongoDB?

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Database Access → Create user
4. Network Access → Add `0.0.0.0/0`
5. Connect → Copy connection string

---

The script I created (`deploy.sh`) will guide you through everything interactively! 🚀

