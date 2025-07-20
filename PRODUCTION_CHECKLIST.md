# 🚀 Production Deployment Checklist

## ✅ Pre-Deployment Requirements

### 1. Stripe Configuration
- [ ] **Live Stripe Account** - Switch from test to live mode
- [ ] **API Keys** - Replace test keys with live keys in environment variables
- [ ] **Products Created** - Create all subscription plans and credit packs in live mode
- [ ] **Price IDs** - Update all STRIPE_PRICE_* environment variables with live price IDs
- [ ] **Webhook Endpoint** - Create webhook endpoint pointing to your live domain
- [ ] **Tax Settings** - Configure tax settings in Stripe Dashboard (optional)
- [ ] **Business Information** - Complete business profile in Stripe Dashboard

### 2. Domain & Environment
- [ ] **Domain Configured** - Set NEXT_PUBLIC_DOMAIN to your actual domain
- [ ] **SSL Certificate** - Ensure HTTPS is working
- [ ] **Environment Variables** - All required variables set in production
- [ ] **Build Process** - Test production build locally first

### 3. Security & Compliance
- [ ] **Webhook Security** - Webhook endpoint secured with signing secret
- [ ] **CORS Configuration** - Proper CORS settings for your domain
- [ ] **Rate Limiting** - Consider adding rate limiting to API routes
- [ ] **Error Handling** - All error cases handled gracefully

## 🔧 Stripe Dashboard Setup

### Products to Create (Live Mode):
1. **Indie Plan** - $19.99/month recurring subscription
2. **Pro Plan** - $24.99/month recurring subscription  
3. **Silver Pack** - $4.99 one-time payment (5 credits)
4. **Gold Pack** - $19.99 one-time payment (25 credits)
5. **Platinum Pack** - $34.99 one-time payment (50 credits)

### Webhook Configuration:
- **Endpoint URL**: `https://yourdomain.com/api/webhooks/stripe`
- **Events to Listen For**:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`

## 🚨 Critical Environment Variables

\`\`\`bash
# These MUST be set for production:
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_DOMAIN=https://yourdomain.com

# All price IDs must be from live mode:
STRIPE_PRICE_INDIE=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_SILVER=price_...
STRIPE_PRICE_GOLD=price_...
STRIPE_PRICE_PLATINUM=price_...
\`\`\`

## 🧪 Testing Checklist

### Before Going Live:
- [ ] **Test Checkout Flow** - Complete purchase with test cards
- [ ] **Test Success Page** - Verify success page loads correctly
- [ ] **Test Cancel Flow** - Verify cancel page works
- [ ] **Test Webhooks** - Use Stripe CLI to test webhook delivery
- [ ] **Test All Plans** - Test both subscriptions and one-time purchases
- [ ] **Mobile Testing** - Test on mobile devices
- [ ] **Error Scenarios** - Test failed payments, network errors, etc.

### Live Testing (Small Scale):
- [ ] **Real Payment Test** - Make a small real purchase to verify everything works
- [ ] **Refund Test** - Process a refund to ensure the flow works
- [ ] **Subscription Test** - Test subscription creation and management

## 📊 Monitoring & Analytics

### Post-Launch Monitoring:
- [ ] **Stripe Dashboard** - Monitor payments and subscriptions
- [ ] **Server Logs** - Monitor application logs for errors
- [ ] **Webhook Logs** - Ensure webhooks are being received and processed
- [ ] **User Feedback** - Monitor for user-reported issues

## 🔄 Deployment Steps

1. **Set Environment Variables** in your hosting platform
2. **Deploy Application** to production
3. **Test Webhook Endpoint** using Stripe CLI or dashboard
4. **Verify SSL Certificate** is working
5. **Test Complete Purchase Flow** with real payment
6. **Monitor Initial Transactions** closely

## 🆘 Emergency Contacts

- **Stripe Support**: https://support.stripe.com/
- **Your Hosting Provider Support**
- **Domain Registrar Support**

---

**⚠️ Important**: Always test thoroughly in Stripe's test mode before switching to live mode!
\`\`\`

Let me also update the create-checkout-session route to be more production-ready:
