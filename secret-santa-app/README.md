# 🎅 Secret Santa App

A modern web application to organize Secret Santa gift exchanges with **100% FREE automatic SMS** notifications!

## Features

- Add participants with names and email addresses
- Generate random Secret Santa assignments (ensures no one gets themselves)
- Send assignments via email - beautiful HTML emails automatically sent to all participants
- Copy assignments to clipboard for manual sending
- Beautiful, responsive UI
- Participant management (add/remove)
- 100% free - just needs a Gmail account

## Live Demo

Want to use this app without installing anything? Deploy it online in minutes!

**See**: [DEPLOY_QUICK.md](./DEPLOY_QUICK.md) for step-by-step deployment guide.

Your app will be live at: `https://yourusername.github.io/Secret-Santa-App`
- 💰 **Zero cost** - no credit card or paid API required!

## 🚀 Quick Start

### Frontend Only (Manual SMS)

In the project directory, you can run:

```bash
npm install
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Full Setup with Email Delivery

**� Want automatic email sending?** See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for complete instructions!

**Quick version:**

1. **Set up backend:**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your Gmail credentials (see FREE_SMS_SETUP.md)
   npm install
   npm start
   ```

2. **Run frontend (separate terminal):**
   ```bash
   npm start
   ```

3. The backend runs on `http://localhost:3001` and frontend on `http://localhost:3000`

**🚀 Quick Start Script:**
```bash
./start-all.sh
```
This convenience script starts both servers at once!

## � Email Integration

This app sends beautiful HTML emails to participants with their Secret Santa assignments!

**How it works:**
- Uses your Gmail (or any email service) to send emails
- Beautiful, festive HTML email template
- Instant delivery
- **Cost: $0.00** - Completely free!

**Setup Requirements:**
- Gmail account with App Password (free, takes 2 minutes)
- Participants' email addresses
- That's it!

**📖 Full setup guide:** [EMAIL_SETUP.md](./EMAIL_SETUP.md)

**How it works:**
```
User clicks "Send via SMS"
        ↓
React App (localhost:3000)
        ↓
Backend API (localhost:3001)
        ↓
Twilio API
        ↓
📱 SMS to all participants
```

**Setup Requirements:**
- Twilio account (free trial available with $15 credit)
- Twilio phone number (~$1/month)
- Account SID and Auth Token (free)

See [TWILIO_SETUP.md](./TWILIO_SETUP.md) for detailed setup instructions.

## 📂 Project Structure

```
secret-santa-app/
├── src/                  # React frontend
│   ├── App.js           # Main Secret Santa component
│   ├── App.css          # Styling
│   └── ...
├── server/              # Backend API for Twilio
│   ├── index.js         # Express server with Twilio integration
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment variables template
├── public/              # Static assets
└── package.json         # Frontend dependencies
```

## 🛠️ Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
