# 🎨 Frontend Deployment on Vercel

Your backend is done! Now deploy the frontend.

## Quick Steps:

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** (use GitHub)
3. **New Project** → **Import from GitHub**
4. **Select**: `manu-bitt/thrift-store`
5. **Configure Project**:
   - **Root Directory**: `client` (IMPORTANT!)
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
6. **Environment Variables** → Add:
   ```
   REACT_APP_API_URL=https://thrift-store-gprl.onrender.com/api
   ```
   ✅ Your Render backend URL is already set above!
7. **Deploy** → Wait 2-5 minutes
8. **Done!** Your site will be live at: `https://your-project.vercel.app`

## After Deployment:

1. Test your site:
   - Visit your Vercel URL
   - Check if products load
   - Test login/signup
   - Test cart functionality

2. If products don't load:
   - Check `REACT_APP_API_URL` is correct
   - Make sure it ends with `/api`
   - Check browser console for errors

3. If CORS errors:
   - Go to Render dashboard
   - Update CORS in `server/server.js` to include your Vercel URL
   - Redeploy backend

## Your URLs:

- **Backend**: `https://your-app.onrender.com`
- **Frontend**: `https://your-project.vercel.app`
- **API Endpoint**: `https://your-app.onrender.com/api/products`

---

**That's it! Your full-stack app is now live! 🎉**

