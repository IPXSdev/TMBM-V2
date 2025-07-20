# Vercel Deployment Guide for TMBM V2

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Stripe Account**: Set up at [stripe.com](https://stripe.com)
3. **Domain**: Purchase a domain or use Vercel's provided domain

## Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `https://github.com/IPXSdev/TMBM-V2.git`
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (leave default)

## Step 2: Configure Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

### Domain Configuration
\`\`\`
NEXT_PUBLIC_DOMAIN = https://your-domain.com
\`\`\`

### Stripe Configuration
\`\`\`
STRIPE_SECRET_KEY = sk_live_your_live_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_your_live_publishable_key
STRIPE_WEBHOOK_SECRET = whsec_your_webhook_secret
\`\`\`

### Stripe Price IDs
\`\`\`
STRIPE_PRICE_INDIE = price_your_indie_plan_id
STRIPE_PRICE_PRO = price_your_pro_plan_id
STRIPE_PRICE_SILVER = price_your_silver_pack_id
STRIPE_PRICE_GOLD = price_your_gold_pack_id
STRIPE_PRICE_PLATINUM = price_your_platinum_pack_id

NEXT_PUBLIC_STRIPE_PRICE_INDIE = price_your_indie_plan_id
NEXT_PUBLIC_STRIPE_PRICE_PRO = price_your_pro_plan_id
NEXT_PUBLIC_STRIPE_PRICE_SILVER = price_your_silver_pack_id
NEXT_PUBLIC_STRIPE_PRICE_GOLD = price_your_gold_pack_id
NEXT_PUBLIC_STRIPE_PRICE_PLATINUM = price_your_platinum_pack_id
\`\`\`

## Step 3: Set Up Custom Domain

### Option A: Use Vercel Domain
- Your app will be available at: `https://tmbm-v2.vercel.app`
- Update `NEXT_PUBLIC_DOMAIN` to: `https://tmbm-v2.vercel.app`

### Option B: Use Custom Domain
1. Go to **Settings > Domains** in your Vercel project
2. Add your custom domain (e.g., `tmbm.com`)
3. Configure DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_DOMAIN` to: `https://tmbm.com`

## Step 4: Configure Stripe Webhooks

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set endpoint URL: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Step 5: Create Stripe Products and Prices

### Subscription Plans
1. Go to [Stripe Dashboard > Products](https://dashboard.stripe.com/products)
2. Create products:

**Indie Plan**
- Name: "Indie Plan"
- Pricing: $19.99/month recurring
- Copy price ID to `STRIPE_PRICE_INDIE`

**Pro Plan**
- Name: "Pro Plan"
- Pricing: $24.99/month recurring
- Copy price ID to `STRIPE_PRICE_PRO`

### Credit Packs
**Silver Pack**
- Name: "Silver Pack"
- Pricing: $4.99 one-time
- Copy price ID to `STRIPE_PRICE_SILVER`

**Gold Pack**
- Name: "Gold Pack"
- Pricing: $19.99 one-time
- Copy price ID to `STRIPE_PRICE_GOLD`

**Platinum Pack**
- Name: "Platinum Pack"
- Pricing: $34.99 one-time
- Copy price ID to `STRIPE_PRICE_PLATINUM`

## Step 6: Deploy

1. Push your code to GitHub
2. Vercel will automatically deploy
3. Check deployment logs for any errors
4. Test the application at your domain

## Step 7: Test Stripe Integration

1. Visit `/pricing` page
2. Test subscription signup flow
3. Test credit pack purchases
4. Verify webhook events in Stripe Dashboard
5. Check success page functionality

## Troubleshooting

### Common Issues

**URL Scheme Errors**
- Ensure `NEXT_PUBLIC_DOMAIN` includes `https://`
- Check that domain is properly configured in Vercel

**Stripe Errors**
- Verify all price IDs are correct
- Ensure webhook endpoint is accessible
- Check that environment variables are set in production

**Build Errors**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript types are correct

### Environment Variables Checklist
- [ ] `NEXT_PUBLIC_DOMAIN` set with https://
- [ ] `STRIPE_SECRET_KEY` set (starts with sk_)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` set (starts with pk_)
- [ ] `STRIPE_WEBHOOK_SECRET` set (starts with whsec_)
- [ ] All 5 `STRIPE_PRICE_*` variables set
- [ ] All 5 `NEXT_PUBLIC_STRIPE_PRICE_*` variables set

## Security Notes

- Never commit `.env.local` to version control
- Use Stripe test keys for development
- Use Stripe live keys for production
- Regularly rotate webhook secrets
- Monitor Stripe Dashboard for suspicious activity

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Stripe webhook logs
3. Review browser console for client-side errors
4. Contact support with specific error messages
