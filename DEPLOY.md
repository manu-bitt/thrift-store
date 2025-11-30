# 🚀 Simple Manual Deployment Guide

## Backend on Render (Recommended - Easier Setup)

1. Go to https://render.com
2. **New +** → **Web Service** (NOT Project - that's premium)
3. Connect GitHub → Select: `manu-bitt/thrift-store`
4. **Settings**:
   - **Name**: `thrift-store-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. **Environment Variables** → Add:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=any_random_string
   NODE_ENV=production
   PORT=10000
   ```
6. Click **Create Web Service**
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://thrift-store-api.onrender.com`)

**Note**: Render free tier spins down after 15 min inactivity (takes ~30 sec to wake up)

---

## Backend on Railway (Alternative)

1. Go to https://railway.app
2. New Project → Deploy from GitHub repo
3. Select: `manu-bitt/thrift-store`
4. **Settings** → **Source**:
   - **Root Directory**: `server` (MUST SET THIS!)
5. **Variables** → Add:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=any_random_string
   NODE_ENV=production
   PORT=10000
   ```
6. Copy your backend URL

## Frontend on Vercel

1. Go to https://vercel.com
2. New Project → Import from GitHub
3. Select: `manu-bitt/thrift-store`
4. **Settings**:
   - Root Directory: `client`
   - Framework: Create React App
5. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual Render or Railway backend URL)
6. Deploy

Done! ✅

