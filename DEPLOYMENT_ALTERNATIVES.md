# 🚀 Alternative Deployment Options (Free Tier)

Since Render's free tier has limitations, here are better alternatives:

---

## Option 1: Railway (Recommended - Best Free Tier) ⭐

Railway offers a **$5 free credit monthly** which is perfect for small projects!

### Backend on Railway:

1. **Sign up**: https://railway.app (use GitHub to sign in)
2. **New Project** → "Deploy from GitHub repo"
3. **Select**: `manu-bitt/thrift-store`
4. **Add Service** → Select the repository
5. **Settings**:
   - Root Directory: `server`
   - Build Command: (auto-detected)
   - Start Command: `npm start`
6. **Variables Tab** → Add:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   PORT=10000
   ```
7. **Deploy** → Railway auto-deploys!
8. **Copy your URL**: Click on the service → Copy the domain

**Railway gives you a free domain like**: `https://your-app.up.railway.app`

---

## Option 2: Render (Free Tier - Limited)

If you want to use Render's free tier:

1. **Don't use "Project"** - that's premium
2. Use **"Web Service"** instead (free tier available)
3. Follow the same steps but select "Web Service" not "Project"

**Note**: Render free tier spins down after 15 minutes of inactivity (takes ~30 seconds to wake up)

---

## Option 3: Fly.io (Free Tier Available)

### Backend on Fly.io:

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Sign up**: https://fly.io (free tier available)

3. **In your terminal**:
   ```bash
   cd server
   fly launch
   ```

4. **Follow prompts**:
   - App name: `thrift-store-api`
   - Region: Choose closest
   - PostgreSQL: No (we use MongoDB)
   - Redis: No

5. **Set secrets**:
   ```bash
   fly secrets set MONGO_URI=your_mongodb_connection_string
   fly secrets set JWT_SECRET=your_secret_key
   fly secrets set NODE_ENV=production
   ```

6. **Deploy**:
   ```bash
   fly deploy
   ```

---

## Option 4: Cyclic.sh (Free Tier)

1. **Sign up**: https://cyclic.sh
2. **Connect GitHub** → Select repo
3. **Configure**:
   - Root: `server`
   - Build: `npm install`
   - Start: `npm start`
4. **Add Environment Variables** (same as Railway)
5. **Deploy**

---

## Frontend Deployment (All Free)

### Vercel (Recommended) - Always Free
- Unlimited deployments
- Free SSL
- Global CDN
- Follow steps in `DEPLOYMENT.md`

### Netlify (Alternative)
1. Go to: https://netlify.com
2. "Add new site" → "Import from Git"
3. Select GitHub → `thrift-store`
4. Settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `build`
5. Environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url/api
   ```
6. Deploy

---

## 🎯 Recommended Setup (100% Free)

**Backend**: Railway (best free tier)
**Frontend**: Vercel (always free)
**Database**: MongoDB Atlas (free tier)

This combination gives you:
- ✅ No credit card required
- ✅ No time limits
- ✅ Auto-deployments
- ✅ Free SSL certificates
- ✅ Good performance

---

## Quick Comparison

| Platform | Free Tier | Auto-Deploy | Sleep Mode | Best For |
|----------|-----------|-------------|------------|----------|
| **Railway** | $5/month credit | ✅ | ❌ | Best overall |
| **Render** | Limited | ✅ | ✅ (15min) | Simple setup |
| **Fly.io** | 3 VMs free | ✅ | ❌ | More control |
| **Cyclic** | Free | ✅ | ❌ | Node.js focused |
| **Vercel** | Unlimited | ✅ | ❌ | Frontend (best) |
| **Netlify** | 100GB bandwidth | ✅ | ❌ | Frontend alternative |

---

## 🚀 Quick Start with Railway (Recommended)

1. **Backend**: https://railway.app → Deploy from GitHub
2. **Frontend**: https://vercel.com → Deploy from GitHub
3. **Database**: https://mongodb.com/cloud/atlas → Free cluster

**Total time**: ~10 minutes
**Cost**: $0/month

---

Need help? Check the main `DEPLOYMENT.md` for detailed steps!

