# Vercel Setup Instructions for DCMS Frontend

## Quick Setup Steps

### 1. Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Set the **Root Directory** to `fend`
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"

### 2. Configure Environment Variables

Go to your Vercel project → Settings → Environment Variables and add:

```env
VITE_API_BASE_URL=https://your-backend-name.railway.app/api
VITE_APP_NAME=DCMS
VITE_APP_VERSION=1.0.0
```

**Important:** Replace `your-backend-name` with your actual Railway backend URL.

### 3. Redeploy

After adding environment variables:
1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger automatic deployment

### 4. Update Backend CORS

After getting your Vercel domain, update the backend:

1. Go to Railway dashboard
2. Update the `FRONTEND_URL` variable:
   ```env
   FRONTEND_URL=https://your-frontend-name.vercel.app
   ```
3. Redeploy the backend service

### 5. Test Deployment

Visit your Vercel URL and test:
1. Login functionality
2. API calls (check browser Network tab)
3. Protected routes

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | https://dcms-backend.railway.app/api |
| `VITE_APP_NAME` | Application name | DCMS |
| `VITE_APP_VERSION` | App version | 1.0.0 |

## Build Configuration

The project is configured with:

- **Framework:** Vite + React
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## Custom Domain (Optional)

1. In Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `VITE_API_BASE_URL` and backend `FRONTEND_URL` accordingly

## Deployment URLs

After deployment, you'll get:
- **Preview URL:** `https://dcms-frontend-git-main-yourusername.vercel.app`
- **Production URL:** `https://dcms-frontend.vercel.app` (if custom domain not set)

## Troubleshooting

**Build fails:**
- Check that Root Directory is set to `fend`
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

**API calls fail:**
- Verify `VITE_API_BASE_URL` is correct
- Check backend CORS configuration
- Ensure backend is deployed and running

**CORS errors:**
- Verify backend `FRONTEND_URL` matches your Vercel domain exactly
- Check browser console for specific CORS errors

**Authentication issues:**
- Clear browser cache and cookies
- Verify API base URL is correct
- Check backend authentication endpoints

## Performance Optimization

Vercel automatically provides:
- Global CDN
- Automatic HTTPS
- Edge functions
- Analytics (if enabled)

## Monitoring

- Check deployment logs in Vercel dashboard
- Monitor build performance
- Set up analytics for user tracking
- Use Vercel Speed Insights for performance monitoring

## Development Workflow

1. Make changes to your code
2. Push to GitHub
3. Vercel automatically deploys
4. Test on preview URL
5. Merge to main branch for production deployment

## Environment-specific Builds

Vercel supports different environment variables for:
- **Development:** Local development
- **Preview:** Pull request deployments
- **Production:** Main branch deployments

Configure these in Settings → Environment Variables.
