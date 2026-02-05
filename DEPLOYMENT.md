# Deployment Guide for Project Management Tool

This guide explains how to deploy both the frontend and backend of your project management tool to Vercel.

## Backend Deployment

### Prerequisites
- Your MongoDB connection string (already configured in backend/.env)
- A Vercel account

### Environment Variables (Backend)
Set these variables in your Vercel project settings:

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `JWT_EXPIRES_IN`: Token expiration time (e.g., "1d")
- `COOKIE_EXPIRES_IN`: Cookie expiration time (e.g., "15m")
- `NODE_ENV`: Set to "production" for production deployment
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins (e.g., "https://your-frontend.vercel.app,http://localhost:5173")

### Deployment Steps (Backend)
1. Fork or clone your repository
2. Go to [Vercel](https://vercel.com/) and sign in
3. Click "New Project" and import your repository
4. Select the `backend` directory as the root directory
5. Add the environment variables listed above
6. Make sure the framework preset is set to "Other"
7. Deploy the project

## Frontend Deployment

### Prerequisites
- Deployed backend URL
- A Vercel account

### Environment Variables (Frontend)
Set these variables in your Vercel project settings:

- `VITE_BASE_URL`: Your deployed backend URL (e.g., "https://your-backend-project-name.vercel.app")

### Deployment Steps (Frontend)
1. Fork or clone your repository
2. Go to [Vercel](https://vercel.com/) and sign in
3. Click "New Project" and import your repository
4. Select the `frontend` directory as the root directory
5. Add the environment variables listed above
6. Make sure the framework preset is detected as "Vite"
7. Deploy the project

## Important Notes

1. **CORS Configuration**: The backend is configured to accept requests from `.vercel.app` domains, allowing seamless communication between your deployed frontend and backend.

2. **Environment Variables**: Never commit actual environment variables to version control. The `.env` files are already in your `.gitignore`.

3. **API Communication**: The frontend will automatically use the correct backend URL based on the `VITE_BASE_URL` environment variable.

4. **Authentication**: The application handles authentication tokens in local storage and properly sets authorization headers for protected API routes.

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your `ALLOWED_ORIGINS` environment variable includes your frontend's Vercel URL.

2. **Database Connection**: Verify your `MONGO_URI` is correctly set and accessible from Vercel's servers.

3. **Authentication Failures**: Check that cookies are properly handled across domains (if applicable).

### Testing Your Deployment:

1. Visit your deployed frontend URL
2. Test user registration/login functionality
3. Verify that API calls to the backend are working properly
4. Confirm that protected routes require authentication

## Post-Deployment Checklist

- [ ] Backend deployed and responding to requests
- [ ] Frontend deployed and connecting to backend
- [ ] User authentication working
- [ ] Database connections established
- [ ] API endpoints accessible
- [ ] Protected routes working properly
- [ ] CORS errors resolved