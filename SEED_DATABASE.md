# 🌱 How to Seed Database on Render

After deploying to Render, you need to seed the database with products.

## Option 1: Using Render Shell (Easiest)

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your service: `thrift-store-api`
3. Go to **Shell** tab (or **Logs** → **Shell**)
4. Run:
   ```bash
   cd server
   node seed.js
   ```
5. You should see: "Data Imported Successfully!"

## Option 2: Using Render's Manual Deploy

1. In Render dashboard → Your service
2. Go to **Manual Deploy** tab
3. Select **Deploy latest commit**
4. In **Build Command Override**, temporarily use:
   ```bash
   npm install && node seed.js && npm start
   ```
5. Deploy (this will seed on every deploy - remove after first seed)

## Option 3: Add Seed to Start Script (One-time)

You can modify `server.js` to auto-seed on first start, but this is not recommended for production.

## Option 4: Use Railway CLI or Local

If you have Railway CLI or want to run locally:

```bash
cd server
node seed.js
```

Make sure your `.env` has the correct `MONGO_URI` pointing to your MongoDB Atlas.

---

## Quick Check

After seeding, check your Render logs - you should see:
- "MongoDB Connected"
- "Data Imported Successfully!"

Then test your API:
- `https://your-app.onrender.com/api/products` should return products!

