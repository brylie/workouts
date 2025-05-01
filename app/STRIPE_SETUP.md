# Stripe Subscription Setup Guide

This guide explains how to set up Stripe subscriptions for the Workouts application.

## Prerequisites

1. A Stripe account (can be a test account for development)
2. A Supabase project with the database migrations applied

## Environment Variables

Add the following environment variables to your `.env` file in the app directory:

```bash
# Stripe API keys
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Supabase Service Role Key (for webhook operations)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_URL=your_supabase_url
```

> Note: For backward compatibility, the application also supports the legacy `VITE_` prefixed versions of these variables, but the non-prefixed versions are recommended.

## Stripe Product and Price Setup

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com/
2. Go to Product Catalogue > Create Product
3. Create the following products and prices:

### Monthly Subscription
- Name: "Workouts Pro - Monthly"
- Description: "Full access to all workout features with cloud sync"
- Price:
  - Currency: USD
  - Amount: $8.99
  - Recurring: Monthly
  - Save the price ID (starts with "price_") and update in `pricing-plans.ts`

### Annual Subscription
- Name: "Workouts Pro - Annual"
- Description: "Full access with 2 months free"
- Price:
  - Currency: USD
  - Amount: $89.99
  - Recurring: Annual
  - Save the price ID (starts with "price_") and update in `pricing-plans.ts`

## Webhook Setup

1. In the Stripe Dashboard, go to Developers > Webhooks
2. Add an endpoint with your application's URL:
   - Local development: Use Stripe CLI or a tunneling service like ngrok
   - Production: https://your-domain.com/api/subscriptions/webhook
3. Add these events to listen for:
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - checkout.session.completed
4. Copy the Webhook Secret and add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`

## Update Price IDs in the Application

Open `/src/lib/subscription/pricing-plans.ts` and update the Stripe product and price IDs with your actual values from Stripe:

```typescript
export const pricingPlans: PricingPlan[] = [
  // ... free plan ...
  {
    id: 'monthly',
    // ... other properties ...
    stripe_product_id: 'prod_your_monthly_product_id',
    stripe_price_id: 'price_your_monthly_price_id',
  },
  {
    id: 'yearly',
    // ... other properties ...
    stripe_product_id: 'prod_your_yearly_product_id',
    stripe_price_id: 'price_your_yearly_price_id',
  }
];
```

## Testing Subscriptions

1. Use Stripe's test credit card numbers for testing:
   - Successful payment: 4242 4242 4242 4242
   - Failed payment: 4000 0000 0000 0002
2. Set an expiration date in the future, any CVC, and any billing address

### Listening to Webhook Events

- Ensure your server is running and can receive webhook events
- Use the Stripe CLI to forward events to your local server:
  ```bash
  stripe listen --forward-to localhost:5173/api/subscriptions/webhook
  ```
- Copy the webhook signing secret from the CLI output and add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`
- Test the webhook by triggering events from the Stripe Dashboard or using the CLI:
  ```bash
  stripe trigger customer.subscription.created
  ```
- Check your server logs to confirm that the webhook was received and processed correctly
- Verify that the subscription status is updated in your Supabase database
- Check the Stripe Dashboard for the event logs to see if the webhook was successful
- Ensure that the subscription status is updated in your Supabase database


## Going Live

Before going live:

1. Switch your Stripe keys from test to production
2. Update your webhook endpoint to your production URL
3. Test the full subscription flow in your production environment

## Troubleshooting

### Webhook Issues
- Check webhook logs in Stripe Dashboard
- Ensure your webhook secret is correctly configured
- Verify that your server can receive POST requests at the webhook endpoint

### Subscription Issues
- Validate that the product and price IDs are correct
- Check the Stripe dashboard for subscription status
- Look for error logs in your application server