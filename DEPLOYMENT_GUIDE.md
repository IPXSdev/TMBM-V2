# 🚀 Production Deployment Guide

## Step 1: Stripe Live Mode Setup

### 1.1 Switch to Live Mode
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Toggle from "Test mode" to "Live mode" (top right)
3. Complete business verification if required

### 1.2 Get Live API Keys
1. Go to **Developers > API Keys**
2. Copy your **Publishable key** (starts with `pk_live_`)
3. Reveal and copy your **Secret key** (starts with `sk_live_`)

### 1.3 Create Products & Prices
Create these exact products in **Live Mode**:

**Subscription Plans:**
- **Indie Plan**: $19.99/month recurring
- **Pro Plan**: $24.99/month recurring

**Credit Packs:**
- **Silver Pack**: $4.99 one-time (5 credits)
- **Gold Pack**: $19.99 one-time (25 credits)  
- **Platinum Pack**: $34.99 one-time (50 credits)

### 1.4 Setup Webhook
1. Go to **Developers > Webhooks**
2. Click **Add endpoint**
3. **Endpoint URL**: `https://yourdomain.com/api/webhooks/stripe`
4. **Events to send**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

## Step 2: Environment Variables

Set these in your hosting platform:

\`\`\`bash
# Stripe Live Keys
STRIPE_SECRET_KEY=sk_live_your_actual_live_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

# Your actual domain (CRITICAL!)
NEXT_PUBLIC_DOMAIN=https://yourdomain.com

# Live Price IDs (get from Stripe Dashboard)
STRIPE_PRICE_INDIE=price_your_live_indie_price_id
STRIPE_PRICE_PRO=price_your_live_pro_price_id
STRIPE_PRICE_SILVER=price_your_live_silver_price_id
STRIPE_PRICE_GOLD=price_your_live_gold_price_id
STRIPE_PRICE_PLATINUM=price_your_live_platinum_price_id
\`\`\`

## Step 3: Pre-Launch Testing

### 3.1 Test with Live Cards (Small Amounts)
Use a real card with small amounts to test:
- Make a $0.50 test purchase
- Verify success page loads
- Check Stripe dashboard shows the payment
- Process a refund to test that flow

### 3.2 Webhook Testing
1. Use [Stripe CLI](https://stripe.com/docs/stripe-cli) to test webhooks:
\`\`\`bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
\`\`\`
2. Make a test purchase and verify webhook is received

## Step 4: Go Live!

1. **Deploy to production** with live environment variables
2. **Test immediately** with a small real purchase
3. **Monitor Stripe Dashboard** for the first few transactions
4. **Check server logs** for any errors

## 🆘 Troubleshooting

### Common Issues:
- **"Invalid URL" error**: Check NEXT_PUBLIC_DOMAIN is set correctly
- **"Price not found" error**: Verify all STRIPE_PRICE_* variables are set with live price IDs
- **Webhook not working**: Ensure webhook URL is accessible and signing secret is correct
- **Success page not loading**: Domain configuration issue

### Emergency Actions:
- **Disable payments**: Remove Stripe buttons from frontend temporarily
- **Check Stripe Dashboard**: Monitor for failed payments or disputes
- **Server logs**: Check application logs for errors

---

**🎉 You're ready for production!** 

Remember to monitor closely for the first few days and have a plan to quickly address any issues.
