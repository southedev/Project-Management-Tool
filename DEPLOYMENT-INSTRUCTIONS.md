# Deploying Project Management Tool to Vercel

## Overview

This guide provides detailed instructions for deploying both the frontend (React/Vite) and backend (Node.js/Express) components of your project management tool to Vercel as separate projects.

## Prerequisites

- A GitHub/GitLab/Bitbucket account with your project repository
- A Vercel account
- Your project pushed to a remote repository
- Access to your MongoDB Atlas cluster (or other database provider)

## Backend Deployment

### 1. Prepare the Backend for Deployment

The backend is already configured for Vercel deployment with:
- `vercel.json` configuration file
- Proper CORS settings supporting `.vercel.app` domains
- Environment variable configuration

### 2. Deploy to Vercel

#### Option A: From Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Select the `backend` directory as your Root Directory
5. Configure the following Build Settings:
   - Framework Preset: None/Other (or leave auto-detected)
   - Build Command: `npm run start` (or auto-detected)
   - Output Directory: Leave empty
   - Install Command: Leave empty (auto-detected)

#### Option B: Using Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Link to your project:
   ```bash
   vercel
   ```
   Follow the prompts to select your organization, project name, and directory settings.

### 3. Configure Environment Variables

In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
COOKIE_EXPIRES_IN=15m
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,http://localhost:5173,http://localhost:3000
```

Replace `https://your-frontend-domain.vercel.app` with your actual frontend deployment URL.

### 4. Redeploy

After adding environment variables, redeploy your project from the Vercel dashboard.

## Frontend Deployment

### 1. Prepare the Frontend for Deployment

The frontend is already configured for Vercel deployment with:
- `vercel.json` configuration file
- Vite build settings
- Environment variable support

### 2. Deploy to Vercel

#### Option A: From Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Select the `frontend` directory as your Root Directory
5. Configure the following Build Settings:
   - Framework Preset: Vite (should be auto-detected)
   - Build Command: `npm run build` (or auto-detected)
   - Output Directory: `dist`
   - Install Command: Leave empty (auto-detected)

#### Option B: Using Vercel CLI

1. Make sure you have Vercel CLI installed:
   ```bash
   npm i -g vercel
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Link to your project:
   ```bash
   vercel
   ```
   Follow the prompts to select your organization, project name, and directory settings.

### 3. Configure Environment Variables

In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
VITE_BASE_URL=https://your-backend-project-name.vercel.app
```

Replace `https://your-backend-project-name.vercel.app` with your actual backend deployment URL from the previous step.

### 4. Redeploy

After adding environment variables, redeploy your project from the Vercel dashboard.

## Connecting Frontend and Backend

Once both projects are deployed:

1. Get your backend deployment URL from the Vercel dashboard
2. Update the frontend's `VITE_BASE_URL` environment variable with this URL
3. Redeploy the frontend

## Verification Steps

1. Visit your deployed frontend URL
2. Check that the application loads without errors
3. Try registering a new user or logging in
4. Verify that API calls to your backend are working (check browser DevTools Network tab)
5. Test various features like creating workspaces, projects, etc.

## Common Issues and Solutions

### CORS Errors
- Ensure your backend's `ALLOWED_ORIGINS` includes your frontend's URL
- Check that `credentials: true` is set in CORS configuration
- Verify both sites use the same protocol (both HTTP or both HTTPS)

### Database Connection Issues
- Confirm your `MONGO_URI` is correct and publicly accessible
- Check that your MongoDB cluster allows connections from Vercel's IP ranges
- Verify your database connection string format

### Environment Variables Not Working
- Make sure variables are prefixed with `VITE_` for frontend (e.g., `VITE_BASE_URL`)
- Check that environment variables are set in the correct project in Vercel dashboard
- Verify you've redeployed after adding/changing environment variables

### Build Failures
- Ensure all dependencies are listed in `package.json`
- Check that your build command matches your framework (e.g., `npm run build`)
- Verify your output directory setting matches your framework's default

## Best Practices

1. **Security**: Never expose sensitive keys in frontend code; keep them in backend environment variables
2. **HTTPS**: Always use HTTPS for production deployments
3. **Custom Domains**: Consider setting up custom domains for a professional appearance
4. **Monitoring**: Enable Vercel Analytics to monitor your application performance
5. **Branch Deploys**: Use branch deploys for testing changes before merging to main

## Updating Deployments

After making changes to your code:

1. Push changes to your Git repository
2. Vercel will automatically deploy changes to the respective environment (development/prod)
3. Monitor the deployment logs in the Vercel dashboard for any issues

## Custom Domain Setup (Optional)

To use custom domains:

1. Purchase a domain (if you don't have one)
2. In your Vercel dashboard, go to your project
3. Navigate to Settings → Domains
4. Add your custom domain and follow DNS configuration instructions
5. Repeat for both frontend and backend projects

Your project management tool is now ready for deployment to Vercel! The separation of frontend and backend allows for independent scaling and updates while maintaining secure communication through properly configured CORS policies.