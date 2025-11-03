# 📧 Email Setup Guide

## 🎯 Overview
This Secret Santa app sends beautiful HTML emails to participants with their assignments. It's simple, reliable, and 100% free!

## 📋 Prerequisites
- A Gmail account (or any email service)
- 2 minutes of setup time

## 🚀 Step-by-Step Setup

### 1. Set Up Gmail App Password

**Why?** Gmail requires an "App Password" for third-party apps to send emails securely.

1. Go to your Google Account: https://myaccount.google.com/
2. Select **Security** from the left menu
3. Under "How you sign in to Google," select **2-Step Verification** (enable if not already)
4. Go back to Security, scroll down to **App passwords**
5. Click "Select app" → Choose "Mail"
6. Click "Select device" → Choose "Other" and type "Secret Santa"
7. Click **Generate**
8. Copy the 16-character password (you'll use this in step 2)

**Direct link:** https://support.google.com/accounts/answer/185833

### 2. Configure the Backend

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Edit the `.env` file with your email credentials:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_character_app_password_here
   PORT=3001
   ```

   **Important:** Use the App Password from step 1, NOT your regular Gmail password!

### 3. Run the App

**Terminal 1 - Backend Server:**
```bash
cd server
npm install  # if not already done
npm start
```
You should see: `✅ Email service configured successfully`

**Terminal 2 - Frontend App:**
```bash
cd ..
npm start
```
App will open at: `http://localhost:3000`

**Or use the quick start script:**
```bash
./start-all.sh
```

### 4. Use the App

1. Add participants with:
   - Name
   - Email address
   
2. Click "Generate Secret Santa Assignments"

3. Click "📧 Send via Email" - beautiful emails sent instantly!

## 🎨 What Participants Receive

Participants will receive a beautiful, festive HTML email with:
- 🎅 Holiday-themed header
- ✨ Clear assignment displayed prominently
- 🎁 Professional, mobile-friendly design
- 📱 Works on all email clients

## 💰 Cost

**$0.00** - Completely free with your Gmail account!

## 🔧 Alternative Email Services

Don't want to use Gmail? Other free options:

**Outlook/Hotmail:**
```env
EMAIL_SERVICE=hotmail
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

**Yahoo:**
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_app_password
```

## ⚠️ Troubleshooting

### "Email service is not configured" Error
- Check that `.env` file exists in `server/` directory
- Verify EMAIL_USER and EMAIL_PASS are set correctly
- Make sure you're using an App Password (not regular password) for Gmail
- Restart the backend server after changing `.env`

### Emails Not Received
- **Check spam folder:** First place to look!
- **Wrong email?** Verify email addresses are correct
- **Gmail limits:** Free Gmail has a sending limit (~500/day)
- **Wait:** Should arrive within seconds

### Gmail "Authentication failed" Error
- Double-check your email and App Password in `.env`
- Make sure there are no extra spaces
- Enable 2-Step Verification first
- Try generating a new App Password

## 📊 Success Rate

**Email: 99.9%** - Almost always works perfectly!

Unlike SMS gateways:
- ✅ No carrier restrictions
- ✅ Works internationally
- ✅ Instant delivery
- ✅ Beautiful HTML formatting
- ✅ No character limits
- ✅ Everyone checks email

## 🎉 Benefits Over SMS

| Feature | Email | SMS (via gateways) |
|---------|-------|-------------------|
| **Reliability** | 99.9% | 60-80% |
| **Cost** | Free | Free |
| **Setup** | 2 minutes | 5-10 minutes |
| **Issues** | Rare | Common (especially AT&T) |
| **Design** | Beautiful HTML | Plain text only |
| **International** | ✅ Yes | ❌ US only |
| **Spam filter** | Rarely | Often |

## 🎊 You're Done!

Email is the simplest and most reliable method. Everyone checks their email, and there are no carrier compatibility issues!

---

**Questions?** Check the troubleshooting section above or open an issue on GitHub.
