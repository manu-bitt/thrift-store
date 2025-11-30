# 🚀 Simple Manual Deployment Guide

## Backend on Railway

1. Go to https://railway.app
2. New Project → Deploy from GitHub repo
3. Select: `manu-bitt/thrift-store`
4. **IMPORTANT - Settings** → **Source**:
   - **Root Directory**: `server` (MUST SET THIS!)
   - If you don't see this option, go to Settings → Source → Root Directory
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
   REACT_APP_API_URL=https://your-railway-url.up.railway.app/api
   ```
6. Deploy

Done! ✅

