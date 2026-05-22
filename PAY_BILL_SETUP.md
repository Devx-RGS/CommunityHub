# Pay Bill Setup & Troubleshooting Guide

## 🔧 Setting Up Stripe Payment Integration

The Pay Bill functionality in Community Hub uses Stripe for secure payment processing. Here's how to set it up:

### 1. Create a Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete the account verification process
3. Navigate to the Dashboard

### 2. Get Your Stripe API Keys
1. In your Stripe Dashboard, go to **Developers** → **API keys**
2. Copy your **Publishable key** (starts with `pk_test_` for test mode)
3. Copy your **Secret key** (starts with `sk_test_` for test mode)

### 3. Configure Environment Variables
Edit your `.env` file and add your Stripe keys:

```env
# Stripe Payment Gateway Configuration
SECRET_KEY=sk_test_your_actual_stripe_secret_key_here
PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key_here
```

### 4. Test the Payment Flow
1. Start your server: `node server.js`
2. Login to your account
3. Go to the Bill page
4. Click "Pay Bill"
5. You'll be redirected to Stripe Checkout (test mode)

## 🐛 Troubleshooting Pay Bill Issues

### Issue 1: "Payment system not configured" Error
**Cause:** Missing or incorrect Stripe API keys

**Solution:**
1. Check your `.env` file has both `SECRET_KEY` and `PUBLISHABLE_KEY`
2. Ensure the keys are valid and from the same Stripe account
3. Make sure there are no extra spaces or quotes around the keys
4. Restart your server after updating `.env`

### Issue 2: "Payment failed" Error
**Possible Causes & Solutions:**

#### A. Invalid Stripe Keys
- Verify your keys are correct in the Stripe Dashboard
- Make sure you're using test keys for development
- Ensure the secret key matches the publishable key

#### B. Network/Server Issues
- Check your internet connection
- Verify your server is running properly
- Check server console for detailed error messages

#### C. Missing User Data
- Ensure the user is logged in
- Check that the user has a `makePayment` amount set
- Verify the user's society information is complete

### Issue 3: Button Shows "Processing..." Indefinitely
**Cause:** JavaScript error or network timeout

**Solution:**
1. Open browser developer tools (F12)
2. Check the Console tab for errors
3. Check the Network tab for failed requests
4. If `/checkout-session` request fails, check server logs

### Issue 4: Amount Shows as ₹0 or "Paid"
**Cause:** No dues calculated or already paid

**This is normal behavior when:**
- All bills are paid up to date
- Credit balance covers current charges
- User joined recently and no charges yet

## 🔍 Testing Payment Integration

### Test Mode Setup
1. Use test API keys (start with `pk_test_` and `sk_test_`)
2. Use Stripe's test card numbers:
   - **Successful payment:** `4242 4242 4242 4242`
   - **Declined payment:** `4000 0000 0000 0002`
   - **Insufficient funds:** `4000 0000 0000 9995`

### Test Card Details
- **Card Number:** Use test numbers above
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any 5 digits (e.g., 12345)

## 📋 Common Configuration Issues

### 1. Environment Variables Not Loading
```bash
# Check if .env file exists in project root
ls -la .env

# Verify environment variables are loaded
node -e "require('dotenv').config(); console.log(process.env.SECRET_KEY ? 'Stripe configured' : 'Missing Stripe keys');"
```

### 2. Server Console Debugging
Look for these messages in your server console:
- ✅ `Checkout session request received`
- ✅ `User: exists`  
- ✅ `Payment amount: [some number]`
- ❌ `Error: User or payment amount not found`
- ❌ `Checkout session error`

### 3. Browser Console Debugging
Open browser dev tools and look for:
- ✅ Stripe object loaded successfully
- ✅ Successful fetch to `/checkout-session`
- ❌ `Stripe is not defined` error
- ❌ Network errors or 500 responses

## 🎯 Quick Checklist

Before reporting Pay Bill issues, verify:

- [ ] `.env` file exists with valid Stripe keys
- [ ] Server restarted after updating `.env`
- [ ] User is logged in and authenticated
- [ ] User has dues to pay (amount > 0)
- [ ] Internet connection is stable
- [ ] Browser allows pop-ups (for Stripe redirect)
- [ ] No ad-blockers interfering with Stripe
- [ ] Server console shows no errors

## 🚀 Production Deployment

When ready for production:

1. **Switch to Live Mode:**
   ```env
   SECRET_KEY=sk_live_your_live_secret_key
   PUBLISHABLE_KEY=pk_live_your_live_publishable_key
   NODE_ENV=production
   ```

2. **Activate Stripe Account:**
   - Complete business verification in Stripe Dashboard
   - Activate your account for live payments

3. **Test Thoroughly:**
   - Test with real card numbers in small amounts
   - Verify webhooks work (if implemented)
   - Check payment confirmations and receipts

## 📞 Support

If you continue experiencing issues:
1. Check server logs for detailed error messages
2. Verify all environment variables are correctly set
3. Test with Stripe's test cards first
4. Ensure MongoDB is connected (for user data)

The Pay Bill system is now modernized with better error handling, user feedback, and professional styling! 🎉
