# 🚀 Complete Deployment Guide: CareerCraft

## Overview
- **Backend**: Render (Node.js/Express)
- **Frontend**: Vercel (Next.js)
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary

---

## 📋 Prerequisites

1. **GitHub Repository** with your code pushed
2. **MongoDB Atlas** account (free tier)
3. **Render** account (free tier)
4. **Vercel** account (free tier)
5. **Cloudinary** account (free tier)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up and create a free account
3. Create a new project (name: `careercraft`)

### 1.2 Create Cluster
1. Click "Build a Database"
2. Select **M0 Sandbox** (free)
3. Choose a cloud provider and region closest to you
4. Cluster name: `careercraft-cluster`
5. Click "Create"

### 1.3 Create Database User
1. Go to "Database Access" → "Add New Database User"
2. Username: `careercraft-user`
3. Password: Generate a strong password (save it!)
4. Privileges: "Read and write to any database"

### 1.4 Configure Network Access
1. Go to "Network Access" → "Add IP Address"
2. Select **"Allow access from anywhere"** (0.0.0.0/0)
3. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" → Click "Connect" on your cluster
2. Select "Drivers"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `myFirstDatabase` with `careercraft`

**Your connection string should look like:**
```
mongodb+srv://careercraft-user:YOUR_PASSWORD@careercraft-cluster.xxxxx.mongodb.net/careercraft
```

---

## 🔧 Step 2: Prepare Backend for Deployment

### 2.1 Update Backend Environment Variables
Edit `backend/.env`:

```bash
# Database
MONGODB_URI=mongodb+srv://careercraft-user:YOUR_PASSWORD@careercraft-cluster.xxxxx.mongodb.net/careercraft
PORT=5000

# Security (CHANGE THESE!)
JWT_SECRET=your_super_secure_jwt_secret_at_least_32_characters_long

# Cloudinary (already configured)
CLOUDINARY_CLOUD_NAME=dtnbfzubi
CLOUDINARY_API_KEY=919328835873436
CLOUDINARY_API_SECRET=3M7ybrPOzuxBNS9wfINByaGzlPc

# OAuth (already configured)
GOOGLE_CLIENT_ID=1044366608871-m67fe9jvlmca60kue4eo2j3uku7di35d.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_ID=Ov23lirmKjEZOjBwgsmj
GITHUB_CLIENT_SECRET=b991bf251e0f4b744dd4c755198ba055dd7e8c48

# Deployment URLs (UPDATE AFTER DEPLOYMENT)
CLIENT_URL=https://your-vercel-app.vercel.app
SERVER_URL=https://your-backend-app.onrender.com
CORS_ALLOW_ORIGINS=https://your-vercel-app.vercel.app

# ML Service (not using for now)
ML_SERVICE_URL=http://localhost:8000
OLLAMA_BASE_URL=http://localhost:11434
```

### 2.2 Push to GitHub
```bash
git add .
git commit -m "Configure for deployment"
git push origin main
```

---

## 🎨 Step 3: Deploy Backend to Render

### 3.1 Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub

### 3.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. **Connect Repository**: Select your GitHub repo
3. **Name**: `careercraft-backend`
4. **Root Directory**: `backend`
5. **Runtime**: **Node**
6. **Build Command**: `npm install`
7. **Start Command**: `npm start`
8. **Instance Type**: **Free**

### 3.3 Add Environment Variables
In Render dashboard → Environment tab:

```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://careercraft-user:YOUR_PASSWORD@careercraft-cluster.xxxxx.mongodb.net/careercraft
JWT_SECRET=your_super_secure_jwt_secret_at_least_32_characters_long
CLIENT_URL=https://your-vercel-app.vercel.app
SERVER_URL=https://your-backend-app.onrender.com
CORS_ALLOW_ORIGINS=https://your-vercel-app.vercel.app
CLOUDINARY_CLOUD_NAME=dtnbfzubi
CLOUDINARY_API_KEY=919328835873436
CLOUDINARY_API_SECRET=3M7ybrPOzuxBNS9wfINByaGzlPc
GOOGLE_CLIENT_ID=1044366608871-m67fe9jvlmca60kue4eo2j3uku7di35d.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_ID=Ov23lirmKjEZOjBwgsmj
GITHUB_CLIENT_SECRET=b991bf251e0f4b744dd4c755198ba055dd7e8c48
```

### 3.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (2-5 minutes)
3. **Note your backend URL**: `https://careercraft-backend.onrender.com`

### 3.5 Test Backend
Visit: `https://careercraft-backend.onrender.com/api/health`
Should return: `{"success": true, "message": "Backend is running"}`

---

## 🎯 Step 4: Prepare Frontend for Deployment

### 4.1 Update Frontend Environment Variables
Edit `frontend/.env`:

```bash
# Backend API URL (UPDATE WITH YOUR RENDER URL)
NEXT_PUBLIC_API_URL=https://careercraft-backend.onrender.com/api

# ML Service (not using for now)
# NEXT_PUBLIC_ML_SERVICE_URL=http://localhost:8000
```

### 4.2 Push Updates
```bash
git add frontend/.env
git commit -m "Update frontend API URL for deployment"
git push origin main
```

---

## 🚀 Step 5: Deploy Frontend to Vercel

### 5.1 Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

### 5.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. **Import Git Repository**: Select your repo
3. **Root Directory**: `frontend`
4. **Framework Preset**: **Next.js**
5. **Build Command**: `npm run build`
6. **Output Directory**: `.next`

### 5.3 Add Environment Variables
In Vercel dashboard → Environment Variables:

```bash
NEXT_PUBLIC_API_URL=https://careercraft-backend.onrender.com/api
```

### 5.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment (1-3 minutes)
3. **Note your frontend URL**: `https://your-project-name.vercel.app`

---

## 🔄 Step 6: Update URLs and Final Configuration

### 6.1 Update Backend CLIENT_URL
1. Go back to Render dashboard
2. Navigate to your backend service
3. Go to **"Environment"** tab
4. Update `CLIENT_URL` to your actual Vercel URL
5. Update `CORS_ALLOW_ORIGINS` to your actual Vercel URL
6. Click **"Save Changes"** → **"Manual Deploy"** → **"Deploy Latest Commit"**

### 6.2 Update OAuth Redirect URLs
**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services → Credentials
3. Find your OAuth 2.0 Client ID
4. Add to "Authorized redirect URIs":
   - `https://careercraft-backend.onrender.com/api/auth/oauth/google/callback`

**GitHub OAuth:**
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Find your app
3. Update "Authorization callback URL":
   - `https://careercraft-backend.onrender.com/api/auth/oauth/github/callback`

---

## ✅ Step 7: Test Everything

### 7.1 Test Backend
```bash
curl https://careercraft-backend.onrender.com/api/health
```

### 7.2 Test Frontend
1. Visit your Vercel URL
2. Try signing up
3. Try signing in
4. Test OAuth (Google/GitHub)
5. Test file upload

### 7.3 Check CORS
Open browser dev tools → Network tab and verify no CORS errors.

---

## 🛠️ Troubleshooting

### Common Issues:

**1. CORS Errors**
- Verify `CLIENT_URL` in backend matches your Vercel URL
- Check `CORS_ALLOW_ORIGINS` environment variable

**2. Database Connection Failed**
- Verify MongoDB Atlas connection string
- Check network access allows all IPs (0.0.0.0/0)
- Ensure database user has correct permissions

**3. OAuth Callback Errors**
- Verify redirect URLs in Google/GitHub consoles
- Check `SERVER_URL` environment variable

**4. Build Failures**
- Check deployment logs
- Ensure all dependencies are in package.json
- Verify environment variables are correctly set

**5. Free Tier Limitations**
- Render free tier spins down after 15 minutes (cold starts)
- First request may take 30+ seconds

---

## 🎉 Deployment Complete!

Your CareerCraft application is now live:
- **Frontend**: `https://your-project-name.vercel.app`
- **Backend**: `https://careercraft-backend.onrender.com`
- **Database**: MongoDB Atlas
- **Files**: Cloudinary

### Next Steps:
1. Set up custom domains (optional)
2. Configure monitoring
3. Set up automated backups
4. Consider upgrading plans for production

---

## 📞 Support

If you encounter issues:
1. Check Render and Vercel logs
2. Verify environment variables
3. Test API endpoints individually
4. Check this guide for common solutions

**Happy Deploying! 🚀**
