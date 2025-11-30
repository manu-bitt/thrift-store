# 🚀 Vercel Frontend Deployment - Ready to Go!

Your backend is live at: **https://thrift-store-gprl.onrender.com**

## Step-by-Step Vercel Deployment:

### 1. Go to Vercel
- Visit: https://vercel.com
- Sign up/Login with GitHub

### 2. Import Project
- Click **"Add New"** → **"Project"**
- Click **"Import Git Repository"**
- Select: `manu-bitt/thrift-store`
- Click **"Import"**

### 3. Configure Project
- **Framework Preset**: Create React App (auto-detected)
- **Root Directory**: `client` ⚠️ **IMPORTANT - Change this!**
- **Build Command**: `npm run build` (auto)
- **Output Directory**: `build` (auto)
- **Install Command**: `npm install` (auto)

### 4. Set Environment Variable
- Scroll down to **"Environment Variables"**
- Click **"Add"**
- **Name**: `REACT_APP_API_URL`
- **Value**: `https://thrift-store-gprl.onrender.com/api`
- Select all environments: ✅ Production, ✅ Preview, ✅ Development
- Click **"Add"**

### 5. Deploy!
- Click **"Deploy"** button
- Wait 2-5 minutes for build
- Your site will be live! 🎉

## After Deployment:

1. **Test your API**:
   - Visit: `https://thrift-store-gprl.onrender.com/api/products`
   - Should show all products

2. **Test your frontend**:
   - Visit your Vercel URL (e.g., `https://thrift-store.vercel.app`)
   - Products should load
   - Login/Signup should work

## Your URLs:

- **Backend API**: https://thrift-store-gprl.onrender.com
- **API Products**: https://thrift-store-gprl.onrender.com/api/products
- **Frontend**: Will be shown after Vercel deployment

---

**That's it! Just follow these steps and your app will be live! ✅**

