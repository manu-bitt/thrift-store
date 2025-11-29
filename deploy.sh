#!/bin/bash

# Thrift Store Deployment Script
# This script helps deploy to Railway

echo "🚀 Thrift Store Deployment Helper"
echo "=================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
    echo "✅ Railway CLI installed!"
    echo ""
fi

echo "🔐 Step 1: Login to Railway"
echo "This will open your browser to authenticate..."
railway login

echo ""
echo "📁 Step 2: Link to your project"
echo "Select your existing project or create a new one..."
railway link

echo ""
echo "⚙️  Step 3: Setting Root Directory"
railway variables set RAILWAY_ROOT_DIRECTORY=server

echo ""
echo "🔑 Step 4: Setting Environment Variables"
echo ""
read -p "Enter your MongoDB URI: " MONGO_URI
read -p "Enter your JWT Secret (or press Enter for auto-generated): " JWT_SECRET

if [ -z "$JWT_SECRET" ]; then
    JWT_SECRET=$(openssl rand -hex 32)
    echo "Generated JWT Secret: $JWT_SECRET"
fi

railway variables set MONGO_URI="$MONGO_URI"
railway variables set JWT_SECRET="$JWT_SECRET"
railway variables set NODE_ENV=production
railway variables set PORT=10000

echo ""
echo "🚀 Step 5: Deploying..."
railway up

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Get your deployment URL from Railway dashboard"
echo "2. Update frontend REACT_APP_API_URL with your backend URL"
echo "3. Deploy frontend to Vercel"
echo ""
echo "Your backend URL will be: https://your-app.up.railway.app"

