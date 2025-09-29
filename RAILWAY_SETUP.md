# Railway Setup Instructions for DCMS Backend

## Quick Setup Steps

### 1. Create Railway Project

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository
5. Set the **Root Directory** to `bend`
6. Click "Deploy"

### 2. Add PostgreSQL Database

1. In your Railway project dashboard
2. Click "New Service"
3. Select "Database" → "PostgreSQL"
4. Railway will automatically provision a PostgreSQL database

### 3. Configure Environment Variables

Go to your Railway service → Variables tab and add:

```env
APP_NAME=DCMS Backend
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-backend-name.railway.app

# Database (Railway will auto-populate these)
DB_CONNECTION=pgsql
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_DATABASE=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}

# Frontend URL (update after Vercel deployment)
FRONTEND_URL=https://your-frontend-name.vercel.app

# Generate a new app key
APP_KEY=base64:your-32-character-base64-key-here
```

### 4. Generate APP_KEY

Run this command in Railway console or locally:

```bash
php artisan key:generate --show
```

Copy the generated key and paste it as `APP_KEY` in Railway variables.

### 5. Run Database Migrations

In Railway console (or add to deployment script):

```bash
php artisan migrate --force
php artisan db:seed
```

### 6. Test Deployment

Visit your Railway URL: `https://your-backend-name.railway.app/api/public/services`

You should see a JSON response with services data.

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `APP_NAME` | Application name | DCMS Backend |
| `APP_ENV` | Environment | production |
| `APP_KEY` | Laravel encryption key | base64:... |
| `APP_URL` | Backend URL | https://dcms-backend.railway.app |
| `FRONTEND_URL` | Frontend URL for CORS | https://dcms-frontend.vercel.app |
| `DB_*` | Database connection | Auto-filled by Railway |

## Custom Domain (Optional)

1. In Railway project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `APP_URL` and `FRONTEND_URL` accordingly

## Monitoring

- Check deployment logs in Railway dashboard
- Monitor resource usage
- Set up alerts for downtime

## Troubleshooting

**Build fails:**
- Check that Root Directory is set to `bend`
- Verify all dependencies are in `composer.json`

**Database connection fails:**
- Ensure PostgreSQL service is running
- Check database variables are correctly set

**CORS issues:**
- Verify `FRONTEND_URL` matches your Vercel domain exactly
- Check `config/cors.php` includes your domain
