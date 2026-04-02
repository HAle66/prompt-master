# 🚀 Deployment Guide - AI Prompt Hub

## Quick Deploy to Vercel (Recommended)

### Method 1: One-Click Deploy (Easiest)

1. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub first
   # Then push your code:
   git remote add origin https://github.com/YOUR_USERNAME/ai-prompts.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Click "Deploy"
   - That's it! 🎉

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

## Environment Variables (Optional)

For Stripe payment integration:

```bash
# In Vercel dashboard, add these environment variables:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Performance Tips

✅ Already optimized:
- Static site generation
- Image optimization
- Automatic caching
- CDN deployment

## Monitoring

- Check Vercel Analytics for visitor stats
- Use Vercel Logs for debugging
- Set up uptime monitoring

## Next Steps

1. Add more prompts to `data/prompts.json`
2. Integrate Stripe for payments
3. Add Google Analytics
4. Set up custom domain
5. Share with your audience!

## Support

If you need help:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Stripe Docs: https://stripe.com/docs
