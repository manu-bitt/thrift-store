# 🚀 Quick Deployment Guide

## Backend (Render) - 5 Steps

1. **Go to**: https://render.com → Sign up/Login
2. **New Web Service** → Connect GitHub → Select `thrift-store`
3. **Settings**:
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `npm start`
4. **Environment Variables**:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=any_long_random_string
   NODE_ENV=production
   PORT=10000
   ```
5. **Deploy** → Copy your backend URL (e.g., `https://thrift-store-api.onrender.com`)

---

## Frontend (Vercel) - 4 Steps

1. **Go to**: https://vercel.com → Sign up/Login
2. **New Project** → Import from GitHub → Select `thrift-store`
3. **Settings**:
   - Root Directory: `client`
   - Framework: Create React App
4. **Environment Variable**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual Render backend URL)

5. **Deploy** → Done! 🎉

---

## MongoDB Atlas Setup (2 minutes)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Database Access → Create user
4. Network Access → Add IP: `0.0.0.0/0`
5. Connect → Copy connection string
6. Replace `<password>` with your user password

---

## That's it! Your app is live! 🎊

