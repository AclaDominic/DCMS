# DCMS Deployment Guide

This guide covers deploying the DCMS (Dental Clinic Management System) with Laravel 12 backend on Railway and React frontend on Vercel.

## Project Structure

- `bend/` - Laravel 12 Backend API
- `fend/` - React + Vite Frontend

## Prerequisites

1. **Railway Account** - [railway.app](https://railway.app)
2. **Vercel Account** - [vercel.com](https://vercel.com)
3. **PostgreSQL Database** (Railway provides this)
4. **Domain names** for both frontend and backend (optional but recommended)

## Backend Deployment (Railway)

### 1. Prepare the Laravel Backend

The backend is already configured with:
- `railway.json` - Railway deployment configuration
- `Procfile` - Process file for Railway
- Updated CORS configuration for cross-origin requests

### 2. Deploy to Railway

1. **Create a new Railway project:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Navigate to backend directory
   cd bend
   
   # Deploy to Railway
   railway deploy
   ```

2. **Or use Railway Dashboard:**
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Connect your GitHub repository
   - Select the `bend` folder as the root directory

### 3. Configure Environment Variables in Railway

Set these environment variables in Railway dashboard:

```env
APP_NAME="DCMS Backend"
APP_ENV=production
APP_KEY=base64:your-generated-key-here
APP_DEBUG=false
APP_URL=https://your-backend-domain.railway.app

# Database (Railway will provide these)
DB_CONNECTION=pgsql
DB_HOST=your-postgres-host
DB_PORT=5432
DB_DATABASE=railway
DB_USERNAME=postgres
DB_PASSWORD=your-password

# Frontend URL for CORS
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Maya Payment Gateway (if using)
MAYA_PAYMENT_GATEWAY_URL=https://pg-sandbox.paymaya.com
MAYA_PAYMENT_GATEWAY_SECRET_KEY=your-secret-key
MAYA_PAYMENT_GATEWAY_PUBLIC_KEY=your-public-key
MAYA_PAYMENT_GATEWAY_WEBHOOK_SECRET=your-webhook-secret
```

### 4. Generate Application Key

```bash
# In Railway console or locally
php artisan key:generate
```

### 5. Run Database Migrations

```bash
# In Railway console
php artisan migrate --force
php artisan db:seed
```

## Frontend Deployment (Vercel)

### 1. Prepare the React Frontend

The frontend is already configured with:
- `vercel.json` - Vercel deployment configuration
- Updated Vite config for production builds
- Environment variable support for API base URL

### 2. Deploy to Vercel

1. **Using Vercel CLI:**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Navigate to frontend directory
   cd fend
   
   # Deploy to Vercel
   vercel
   ```

2. **Or use Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `fend`
   - Deploy

### 3. Configure Environment Variables in Vercel

Set these environment variables in Vercel dashboard:

```env
VITE_API_BASE_URL=https://your-backend-domain.railway.app/api
VITE_APP_NAME=DCMS
VITE_APP_VERSION=1.0.0
```

## Post-Deployment Configuration

### 1. Update CORS Origins

After deployment, update the `FRONTEND_URL` in Railway to match your actual Vercel domain:

```env
FRONTEND_URL=https://your-actual-frontend-domain.vercel.app
```

### 2. Test API Communication

1. Visit your frontend URL
2. Try logging in or accessing protected routes
3. Check browser network tab for API calls
4. Verify CORS headers in response

### 3. Configure Custom Domains (Optional)

**Railway:**
- Go to your Railway project settings
- Add custom domain
- Update DNS records

**Vercel:**
- Go to your Vercel project settings
- Add custom domain
- Update DNS records

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Verify `FRONTEND_URL` in Railway matches your Vercel domain
   - Check `config/cors.php` includes your domain

2. **API Connection Issues:**
   - Verify `VITE_API_BASE_URL` in Vercel matches your Railway domain
   - Check Railway deployment logs for errors

3. **Database Connection:**
   - Ensure PostgreSQL service is running in Railway
   - Verify database credentials in environment variables

4. **Authentication Issues:**
   - Clear browser cache and cookies
   - Check if `APP_KEY` is set in Railway
   - Verify session configuration

### Logs and Monitoring

**Railway:**
- Check deployment logs in Railway dashboard
- Monitor resource usage
- Set up alerts for errors

**Vercel:**
- Check function logs in Vercel dashboard
- Monitor build logs
- Set up analytics

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use Railway and Vercel environment variable management
   - Rotate API keys regularly

2. **HTTPS:**
   - Both Railway and Vercel provide HTTPS by default
   - Ensure all API calls use HTTPS

3. **CORS:**
   - Only allow necessary origins
   - Regularly review CORS configuration

## Maintenance

1. **Regular Updates:**
   - Keep Laravel and dependencies updated
   - Update React and Node.js dependencies
   - Monitor security advisories

2. **Backups:**
   - Railway provides automatic PostgreSQL backups
   - Consider additional backup strategies

3. **Monitoring:**
   - Set up error tracking (Sentry, etc.)
   - Monitor performance metrics
   - Set up uptime monitoring

## Support

For issues with:
- **Railway:** [Railway Documentation](https://docs.railway.app)
- **Vercel:** [Vercel Documentation](https://vercel.com/docs)
- **Laravel:** [Laravel Documentation](https://laravel.com/docs)
- **React:** [React Documentation](https://react.dev)
