# Deployment Guide

This guide shows you how to host this Secret Santa app online so others can use it with your email service.

## Architecture

- **Frontend**: Hosted on GitHub Pages (free, static site)
- **Backend**: Hosted on Render.com or Railway.app (free tier)
- **Your email**: Configured securely on the backend only

## Step 1: Deploy Backend API

### Option A: Deploy to Render.com (Recommended - Easier)

1. **Create Render account**: Go to [render.com](https://render.com) and sign up (free)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `Secret-Santa-App` repository

3. **Configure Service**:
   - **Name**: `secret-santa-api` (or your choice)
   - **Root Directory**: `secret-santa-app/server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**:
   Click "Environment" tab and add:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password_here
   PORT=3001
   ```

5. **Deploy**: Click "Create Web Service"

6. **Get your API URL**: After deployment, copy the URL (e.g., `https://secret-santa-api.onrender.com`)

### Option B: Deploy to Railway.app

1. **Create Railway account**: Go to [railway.app](https://railway.app) and sign up

2. **New Project**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `Secret-Santa-App`

3. **Configure**:
   - Set root directory: `secret-santa-app/server`
   - Add environment variables (same as Render above)

4. **Deploy** and copy your API URL

## Step 2: Deploy Frontend to GitHub Pages

1. **Update environment variable**:
   
   Create `secret-santa-app/.env.production`:
   ```
   REACT_APP_API_URL=https://your-api-url-here.onrender.com
   ```
   Replace with your actual backend URL from Step 1.

2. **Deploy to GitHub Pages**:
   ```bash
   cd secret-santa-app
   npm run deploy
   ```

3. **Enable GitHub Pages**:
   - Go to your GitHub repository
   - Settings → Pages
   - Source: Deploy from `gh-pages` branch
   - Save

4. **Access your app**:
   Your app will be available at:
   ```
   https://quebrau.github.io/Secret-Santa-App
   ```

## Step 3: Share with Others

Share this URL with anyone:
```
https://quebrau.github.io/Secret-Santa-App
```

They can:
- Add their participants
- Generate assignments
- Send emails using YOUR email service
- All email credentials stay secure on your backend server

## Security Notes

**Important**:
- Your email credentials are ONLY stored on the backend (Render/Railway)
- Users never see or have access to your email credentials
- The frontend only sends assignment data to your backend API
- The backend handles all email sending

## Updating the App

### Update Frontend:
```bash
cd secret-santa-app
# Make your changes
npm run deploy
```

### Update Backend:
- Push changes to GitHub
- Render/Railway will auto-deploy from your repository

## CORS Configuration

The backend is already configured to accept requests from any origin. If you want to restrict it to only your GitHub Pages domain:

Edit `server/index.js`:
```javascript
app.use(cors({
  origin: 'https://quebrau.github.io'
}));
```

## Cost

- **GitHub Pages**: Free
- **Render.com Free Tier**: 
  - 750 hours/month
  - Sleeps after 15 minutes of inactivity
  - First request after sleep takes ~30 seconds
- **Railway.app Free Tier**: 
  - $5 credit/month
  - ~500 hours of runtime

For a Secret Santa app used seasonally, free tier is more than enough!

## Troubleshooting

### "Failed to connect to server"
- Check that backend is deployed and running
- Verify `REACT_APP_API_URL` in `.env.production` matches your backend URL
- Check Render/Railway logs for errors

### Emails not sending
- Check environment variables on Render/Railway
- Verify Gmail App Password is correct
- Check Render/Railway logs for specific errors

### Backend sleeping (Render free tier)
- First request after 15 minutes of inactivity takes ~30 seconds
- This is normal for free tier
- Consider pinging the health endpoint periodically if needed

## Alternative: Self-Host Backend

If you have a VPS or server:

1. Clone repository on your server
2. Set up environment variables
3. Use PM2 or similar to keep it running
4. Point `REACT_APP_API_URL` to your server
5. Deploy frontend to GitHub Pages as normal

---

Your Secret Santa app is now online and shareable!
