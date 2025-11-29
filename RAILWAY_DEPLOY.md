# 🚂 Railway Deployment Fix

## The Problem
Railway is analyzing the root directory and can't find the Node.js app (it's in `server/` folder).

## Solution: Configure Root Directory in Railway

### Option 1: Set Root Directory in Railway Dashboard (Easiest)

1. Go to your Railway project: https://railway.app
2. Click on your service: `thrift-store`
3. Go to **Settings** tab
4. Scroll to **Source** section
5. Set **Root Directory** to: `server`
6. Click **Save**
7. Railway will automatically redeploy

### Option 2: Use Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Set root directory
railway variables set RAILWAY_ROOT_DIRECTORY=server

# Deploy
railway up
```

### Option 3: Manual Configuration

In Railway Dashboard:
1. Settings → **Source**
2. **Root Directory**: `server`
3. **Build Command**: `npm install` (or leave empty, Railway auto-detects)
4. **Start Command**: `npm start`

## Environment Variables

Make sure you've set these in Railway:

1. Go to **Variables** tab
2. Add:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   NODE_ENV=production
   PORT=10000
   ```

## After Setting Root Directory

Railway will:
- ✅ Detect Node.js automatically
- ✅ Run `npm install` in the `server/` directory
- ✅ Run `npm start` to start your app
- ✅ Deploy successfully!

---

**Quick Fix**: Just set Root Directory = `server` in Railway Settings! 🎯

