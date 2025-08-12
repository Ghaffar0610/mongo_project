# 🚀 Backend Deployment Guide

## Deploy to Render (Free Tier)

### 1. **Sign up for Render**
- Go to [render.com](https://render.com)
- Sign up with your GitHub account

### 2. **Create New Web Service**
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select the `mongo_project` repository

### 3. **Configure Service**
- **Name**: `taskmaster-backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### 4. **Environment Variables**
Add these in Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/taskmaster?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### 5. **Deploy**
- Click "Create Web Service"
- Wait for build to complete
- Your backend will be available at: `https://your-service-name.onrender.com`

## 🔧 Alternative: Deploy to Railway

### 1. **Sign up for Railway**
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

### 2. **Deploy**
- Click "New Project" → "Deploy from GitHub repo"
- Select your repository
- Railway will auto-detect it's a Node.js app

### 3. **Environment Variables**
Add the same environment variables as above.

## 🌐 Update Frontend

Once deployed, update your frontend environment variable:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

## ✅ Test Your Deployment

Test these endpoints:
- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /test` - Test endpoint
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
