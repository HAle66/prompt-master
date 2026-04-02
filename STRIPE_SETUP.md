# 💳 Stripe Payment Setup Guide

Complete guide to integrate Stripe payments into AI Prompt Hub.

## 📋 Prerequisites

- Stripe account (free to create: https://dashboard.stripe.com/register)
- Basic understanding of webhooks

## 🚀 Setup Steps (15 minutes)

### Step 1: Get Your Stripe API Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy **Publishable key** (starts with `pk_test_...`)
3. Copy **Secret key** (starts with `sk_test_...`)
4. Keep these safe - you'll need them soon!

### Step 2: Create a Product & Price

1. Go to https://dashboard.stripe.com/test/products
2. Click **"Add product"**
3. Fill in product details:
   - **Name**: `Premium Prompts Subscription`
   - **Description**: `Monthly access to all premium AI prompts`
   - **Price**: `$9.00`
   - **Billing**: `Subscription` / `Monthly`
4. Click **"Save product"**
5. Copy the **Price ID** (starts with `price_...`)

### Step 3: Configure Environment Variables

Update your `.env.local` file:

```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY

# Stripe Price ID (from Step 2)
NEXT_PUBLIC_STRIPE_PRICE_ID=price_YOUR_ACTUAL_PRICE_ID

# App URL (update to your deployed URL)
NEXT_PUBLIC_APP_URL=https://ai-prompts-hale.vercel.app
```

### Step 4: Setup Webhook (Important!)

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **"Add endpoint"**
3. Enter endpoint URL: `https://ai-prompts-hale.vercel.app/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `invoice.paid`
5. Click **"Add endpoint"**
6. Copy the **Webhook Signing Secret** (starts with `whsec_...`)
7. Add to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

### Step 5: Test Your Payment Flow

1. Start your dev server: `npm run dev`
2. Open http://localhost:3000
3. Click "Get Started Now"
4. Use Stripe test card:
   - **Card number**: `4242 4242 4242 4242`
   - **Expiry**: Any future date (e.g., `12/25`)
   - **CVC**: Any 3 digits (e.g., `123`)
   - **Zip**: Any 5 digits (e.g., `12345`)
5. Complete payment
6. You should be redirected to success page!

### Step 6: Deploy to Production

Once testing is complete:

1. **Add environment variables to Vercel**:
   - Go to: https://vercel.com/hale/ai-prompts/settings/environment-variables
   - Add all variables from `.env.local`
   - **Important**: Use production keys when going live!

2. **Create production webhook**:
   - Repeat Step 4 with production URL
   - Use production webhook secret

3. **Switch to live mode**:
   - Get live API keys from https://dashboard.stripe.com/apikeys
   - Update environment variables
   - Create live product & price

## 🔧 Troubleshooting

### Common Issues

**1. "Stripe is not defined"**
- Make sure you've run: `npm install stripe @stripe/stripe-js`

**2. "Invalid API key"**
- Check your keys match test vs live mode
- Verify keys are correctly set in `.env.local`

**3. "Webhook signature verification failed"**
- Ensure webhook secret is correct
- Check webhook URL matches exactly

**4. Payment succeeds but no access granted**
- Check webhook is receiving events
- Verify database/user logic is working

## 📊 Monitoring

### Test Transactions

- View test payments: https://dashboard.stripe.com/test/payments
- View test subscriptions: https://dashboard.stripe.com/test/subscriptions

### Production Monitoring

- View live payments: https://dashboard.stripe.com/payments
- Set up alerts for failed payments
- Monitor webhook delivery logs

## 💡 Tips

1. **Start in test mode** - Never charge real cards until ready
2. **Use test cards** - Stripe provides many test scenarios
3. **Test failures** - Use card `4000 0000 0000 0002` to test failures
4. **Monitor webhooks** - Ensure all events are delivered
5. **Keep secrets safe** - Never commit `.env.local` to git

## 📚 Resources

- Stripe Docs: https://stripe.com/docs
- Stripe Testing: https://stripe.com/docs/testing
- Next.js + Stripe Guide: https://stripe.com/docs/payments/quickstart
- Webhooks Guide: https://stripe.com/docs/webhooks

## ✅ Checklist

Before going live:

- [ ] Test payment with test card
- [ ] Test success page redirect
- [ ] Test webhook delivery
- [ ] Add production keys to Vercel
- [ ] Create production product & price
- [ ] Setup production webhook
- [ ] Test live payment (small amount)
- [ ] Verify customer receives access
- [ ] Monitor first few transactions

---

Need help? Check Stripe's excellent documentation or contact their support!
