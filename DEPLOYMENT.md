# Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- Vercel Account (free)
- MongoDB Atlas Account (free tier available)
- GitHub Account

### Step 1: Backend Deployment

1. **Deploy Backend to Vercel:**
   ```bash
   cd backend
   vercel --prod
   ```

2. **Set Environment Variables in Vercel:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (use: `openssl rand -base64 32`)
   - `NODE_ENV`: `production`

### Step 2: Frontend Deployment

1. **Update Frontend Environment:**
   ```bash
   cd frontend
   # Edit .env file with your Vercel backend URL
   echo "REACT_APP_API_URL=https://your-backend-url.vercel.app/api" > .env
   ```

2. **Deploy Frontend to Vercel:**
   ```bash
   vercel --prod
   ```

### Step 3: MongoDB Atlas Setup

1. **Create MongoDB Atlas Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user
   - Get your connection string

2. **Whitelist IP Addresses:**
   - Add `0.0.0.0/0` for Vercel access
   - Add your local IP for development

### Alternative: Single Repository Deployment

For a monorepo setup, use the root `vercel.json` configuration:

```bash
# From project root
vercel --prod
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-app
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user configured
- [ ] IP addresses whitelisted
- [ ] Environment variables set in Vercel
- [ ] Backend deployed and tested
- [ ] Frontend API URL updated
- [ ] Frontend deployed and tested
- [ ] User registration flow tested
- [ ] Todo CRUD operations tested

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure frontend URL is in CORS whitelist
   - Check environment variables

2. **Database Connection:**
   - Verify MongoDB URI format
   - Check IP whitelist in Atlas
   - Ensure database user has correct permissions

3. **Build Failures:**
   - Check all dependencies are installed
   - Verify TypeScript compilation
   - Check Vercel build logs

### Local Development

To test production setup locally:

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npx serve -s build -l 3000
```

## Custom Domain

After deployment, you can add a custom domain:

1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Update DNS records as instructed

## Monitoring

- Check Vercel Analytics for performance
- Monitor MongoDB Atlas for database usage
- Set up alerts for errors in Vercel
