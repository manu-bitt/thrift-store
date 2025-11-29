# 🚀 Deployment Guide - Thrift Store

This guide will help you deploy both the frontend and backend of the Thrift Store application.

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free tier works)
- Render account (for backend) - [Sign up here](https://render.com)
- Vercel account (for frontend) - [Sign up here](https://vercel.com)

---

## 🔧 Backend Deployment (Render)

### Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (allows all IPs)
5. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### Step 2: Deploy to Render

1. **Sign up/Login to Render**: https://render.com
2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `manu-bitt/thrift-store`
   - Select the repository

3. **Configure Service**:
   - **Name**: `thrift-store-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if preferred)

4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key_here_make_it_long_and_random
   PORT=10000
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your service URL (e.g., `https://thrift-store-api.onrender.com`)

### Step 3: Seed the Database

After deployment, you can seed the database by running:
```bash
cd server
node seed.js
```

Or use Render's shell feature to run the seed script.

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. **Sign up/Login to Vercel**: https://vercel.com
2. **Import Project**:
   - Click "Add New" → "Project"
   - Import from GitHub: `manu-bitt/thrift-store`
   - Select the repository

3. **Configure Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Set Environment Variables**:
   - Click "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Replace `your-backend-url` with your actual Render backend URL

5. **Deploy**:
   - Click "Deploy"
   - Wait for build (2-5 minutes)
   - Your site will be live at: `https://your-project.vercel.app`

---

## 🔄 Alternative: Deploy Both on Render

If you prefer to use Render for both:

### Frontend on Render (Static Site)

1. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Connect GitHub repository
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

2. **Set Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

---

## ✅ Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is deployed and accessible
- [ ] Environment variables are set correctly
- [ ] Database is seeded with products
- [ ] CORS is configured to allow frontend domain
- [ ] Test user registration/login
- [ ] Test product browsing
- [ ] Test cart functionality

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Render logs for errors

**Problem**: CORS errors
- Update CORS in `server/server.js` to include your frontend URL:
  ```javascript
  app.use(cors({
    origin: ["https://your-frontend.vercel.app", "http://localhost:3000"],
    credentials: true
  }));
  ```

### Frontend Issues

**Problem**: API calls failing
- Verify `REACT_APP_API_URL` is set correctly
- Check browser console for errors
- Ensure backend URL includes `/api` at the end

**Problem**: Build fails
- Check Node version compatibility
- Review build logs in Vercel dashboard

---

## 📝 Environment Variables Reference

### Backend (.env)
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key
PORT=10000
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## 🔗 Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## 📞 Support

If you encounter issues:
1. Check the deployment logs
2. Verify all environment variables
3. Ensure MongoDB Atlas IP whitelist includes Render's IPs
4. Check CORS configuration

---

**Happy Deploying! 🎉**

