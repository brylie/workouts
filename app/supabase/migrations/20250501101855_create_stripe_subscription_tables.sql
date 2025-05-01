-- Create stripe customers table to link Supabase users to Stripe customers
CREATE TABLE IF NOT EXISTS stripe_customers (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Create subscriptions table to track user subscription status
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_subscription_id TEXT UNIQUE,
    stripe_price_id TEXT,
    stripe_product_id TEXT,
    status TEXT NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE
);
-- Create pricing plans table for subscription options
CREATE TABLE IF NOT EXISTS pricing_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    features JSONB,
    stripe_price_id TEXT UNIQUE,
    stripe_product_id TEXT,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd',
    interval TEXT NOT NULL,
    -- month, year, etc.
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Set up RLS (Row Level Security) policies
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
-- Allow users to read their own customer and subscription data
CREATE POLICY "Users can read their own Stripe customer data" ON stripe_customers FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can read their own subscription data" ON subscriptions FOR
SELECT USING (auth.uid() = user_id);
-- Allow everyone to read active pricing plans
CREATE POLICY "Anyone can read active pricing plans" ON pricing_plans FOR
SELECT USING (active = true);
-- Allow service role to manage all tables (for webhooks and admin operations)
CREATE POLICY "Service role can manage all Stripe customers" ON stripe_customers USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can manage all subscriptions" ON subscriptions USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can manage all pricing plans" ON pricing_plans USING (auth.jwt()->>'role' = 'service_role');