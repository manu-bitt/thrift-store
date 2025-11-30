# 🔧 CORS Error Fix

## The Problem
Your frontend at `https://thrift-store-alpha.vercel.app` was blocked by CORS when trying to access the backend.

## The Solution
I've updated `server/server.js` to allow requests from your Vercel frontend.

## What I Changed:
- Added `https://thrift-store-alpha.vercel.app` to allowed origins
- Added `https://thrift-store.vercel.app` (for future deployments)
- Added `OPTIONS` method for preflight requests

## Next Steps:

1. **Wait for Render to redeploy** (2-5 minutes)
   - Render will automatically redeploy when it detects the new commit
   - Or manually trigger redeploy in Render dashboard

2. **Test again**:
   - Go to your Vercel site
   - Try signup/login
   - Should work now! ✅

## If you add more Vercel domains:

Just add them to the `allowedOrigins` array in `server/server.js`:

```javascript
const allowedOrigins = [
  "http://localhost:3000",
  "https://thrift-store-alpha.vercel.app",
  "https://your-new-domain.vercel.app", // Add here
  process.env.FRONTEND_URL,
].filter(Boolean);
```

---

**The fix has been pushed to GitHub. Render will auto-redeploy!** 🚀

