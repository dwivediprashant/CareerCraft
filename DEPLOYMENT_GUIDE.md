# Deployment Guide: CareerCraft Frontend & Backend

This guide will help you deploy the CareerCraft application using:
- **Backend**: Render (Node.js/Express)
- **Frontend**: Vercel (Next.js)

## Prerequisites

1. GitHub repository with your code
2. Render account (free tier available)
3. Vercel account (free tier available)
4. MongoDB database (MongoDB Atlas recommended)
5. Cloudinary account (for file uploads)

## Step 1: Backend Deployment on Render

### 1.1 Prepare Backend Code
The backend is already configured with:
- `start` script in `package.json`
- `render.yaml` configuration file

### 1.2 Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string

### 1.3 Deploy to Render
1. Go to [Render](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `backend` folder as root directory
5. Configure settings:
   - **Name**: careercraft-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=https://your-vercel-app.vercel.app
   SERVER_URL=https://your-backend-app.onrender.com
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   GOOGLE_CLIENT_ID=your_google_oauth_client_id (optional)
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret (optional)
   GITHUB_CLIENT_ID=your_github_oauth_client_id (optional)
   GITHUB_CLIENT_SECRET=your_github_oauth_client_secret (optional)
   ```

7. Click "Create Web Service"
8. Wait for deployment and note your backend URL

## Step 2: Frontend Deployment on Vercel

### 2.1 Prepare Frontend Code
The frontend is already configured with:
- `vercel.json` configuration file
- `.env.example` for environment variables

### 2.2 Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the `frontend` folder as root directory
5. Configure settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-app.onrender.com/api
   ```

7. Click "Deploy"
8. Wait for deployment and note your frontend URL

## Step 3: Update Environment Variables

### 3.1 Update Backend CLIENT_URL
Go back to your Render dashboard:
1. Navigate to your backend service
2. Go to "Environment" tab
3. Update `CLIENT_URL` to your Vercel frontend URL
4. Redeploy the service

### 3.2 Update Frontend (if needed)
If you need to update the frontend API URL:
1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to "Settings" → "Environment Variables"
4. Update `NEXT_PUBLIC_API_URL`
5. Redeploy the project

## Step 4: Verify Deployment

1. **Backend**: Visit `https://your-backend-app.onrender.com/api` - should return a response
2. **Frontend**: Visit `https://your-vercel-app.vercel.app` - should load the application
3. **Test**: Try creating an account or using the application features

## Important Notes

### Free Tier Limitations
- **Render**: Free tier spins down after 15 minutes of inactivity (cold start ~30 seconds)
- **Vercel**: Generous free tier with unlimited deployments
- **MongoDB Atlas**: 512MB free tier sufficient for development

### Environment Variables Security
- Never commit `.env` files to Git
- Use strong, unique secrets for `JWT_SECRET`
- Keep OAuth credentials secure

### Troubleshooting

#### Backend Issues
- Check Render logs for deployment errors
- Verify MongoDB connection string format
- Ensure all required environment variables are set

#### Frontend Issues
- Check Vercel deployment logs
- Verify API URL is correct (include `/api` suffix)
- Ensure CORS is properly configured in backend

#### Common Issues
1. **CORS Errors**: Make sure `CLIENT_URL` in backend matches your Vercel URL
2. **Database Connection**: Verify MongoDB Atlas network access (allow all IPs for development)
3. **Build Failures**: Check that all dependencies are properly installed

## Next Steps

After successful deployment:
1. Set up custom domains if needed
2. Configure monitoring and error tracking
3. Set up automated backups for MongoDB
4. Consider upgrading to paid plans for production use

## Support

If you encounter issues:
1. Check Render and Vercel documentation
2. Review deployment logs
3. Verify environment variables
4. Test locally with the same environment variables
