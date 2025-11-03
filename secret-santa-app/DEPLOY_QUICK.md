# Quick Deployment Guide

## Step 1: Deploy Backend (5 minutes)

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect this GitHub repo
4. Configure:
   - Root Directory: `secret-santa-app/server`
   - Build: `npm install`
   - Start: `npm start`
5. Add Environment Variables:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```
6. Click "Create Web Service"
7. **Copy your API URL** (e.g., `https://secret-santa-api.onrender.com`)

## Step 2: Configure Frontend (1 minute)

Edit `secret-santa-app/.env.production`:
```
REACT_APP_API_URL=https://your-actual-api-url-from-step1.onrender.com
```

## Step 3: Deploy Frontend (1 minute)

```bash
cd secret-santa-app
npm run deploy
```

## Step 4: Enable GitHub Pages (1 minute)

1. Go to your GitHub repo settings
2. Pages → Source: `gh-pages` branch
3. Save

## Done!

Your app is live at:
```
https://quebrau.github.io/Secret-Santa-App
```

Share this URL with anyone. They use your app, you control the email sending!

---

**Full details**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
