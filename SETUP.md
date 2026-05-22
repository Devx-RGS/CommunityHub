# Community Hub - Setup Guide

Welcome to Community Hub! This guide will help you set up the modernized community management platform.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 20-22) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - Local MongoDB installation - [Download here](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud) - [Sign up here](https://www.mongodb.com/cloud/atlas)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory (you're already here!)
cd D:\Community-Hub

# Install dependencies
npm install
```

### 2. Environment Configuration

Create your environment file:

```bash
# Copy the sample environment file
copy .env.sample .env

# Open .env in your preferred editor
notepad .env
```

### 3. Configure Environment Variables

Edit your `.env` file with your specific configuration:

#### MongoDB Configuration
Choose one option:

**Option A: Local MongoDB**
```env
MONGO_URI=mongodb://localhost:27017/community-hub
```

**Option B: MongoDB Atlas (Cloud)**
```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/community-hub
```

#### Stripe Configuration (for payments)
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to Dashboard → API keys
3. Copy your keys:

```env
SECRET_KEY=sk_test_your_actual_stripe_secret_key
PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key
```

#### Session Security
Generate a secure random string:

```bash
# Run this command to generate a secure session secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then add it to your `.env`:
```env
SESSION_SECRET=your_generated_random_string_here
```

### 4. Complete .env Example

Your final `.env` file should look like:

```env
MONGO_URI=mongodb://localhost:27017/community-hub
SECRET_KEY=sk_test_51abc123def456...
PUBLISHABLE_KEY=pk_test_51xyz789uvw012...
SESSION_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
NODE_ENV=development
PORT=3000
```

### 5. Start the Application

```bash
# Start the development server
npm run dev
```

If the above doesn't work on Windows, try:
```bash
# Alternative start command
node server.js
```

### 6. Access the Application

Open your browser and navigate to:
- **Local:** http://localhost:3000
- The modernized landing page should load with the new design!

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
- Ensure MongoDB is running (if using local installation)
- Verify your connection string in `.env`
- Check your MongoDB Atlas credentials and IP whitelist

**2. Missing Environment Variables**
- Double-check your `.env` file exists and has all required variables
- Ensure no typos in variable names

**3. Port Already in Use**
- Change the PORT in your `.env` file to a different number (e.g., 3001)

**4. Stripe Errors**
- Verify your Stripe keys are correct
- Ensure you're using test keys for development

### Getting Help

If you encounter issues:
1. Check the console output for specific error messages
2. Verify all environment variables are properly set
3. Ensure MongoDB is accessible
4. Make sure all dependencies are installed (`npm install`)

## Features

The modernized Community Hub includes:
- ✨ Modern, responsive design with Bootstrap 5
- 🎨 Professional gradient backgrounds and animations
- 📱 Mobile-first responsive layout
- 🔄 Interactive animations and hover effects
- 💳 Integrated payment system with Stripe
- 🏠 Community management features
- 📊 Statistics dashboard
- 💬 Contact forms with modern styling

## Project Structure

```
Community-Hub/
├── views/           # EJS templates
│   ├── index.ejs   # Modernized landing page
│   └── ...         # Other pages
├── public/         # Static assets
│   ├── styles.css  # Modern CSS framework
│   └── ...         # Images, JS files
├── models/         # Database models
├── config/         # Database configuration
├── .env.sample     # Environment template
└── server.js       # Main application server
```

## Next Steps

1. **Customize Branding:** Update colors and fonts in `public/styles.css`
2. **Add Content:** Modify the landing page content in `views/index.ejs`
3. **Configure MongoDB:** Set up your database collections
4. **Deploy:** Consider platforms like Heroku, Vercel, or Render for deployment

Enjoy your modernized Community Hub! 🚀
