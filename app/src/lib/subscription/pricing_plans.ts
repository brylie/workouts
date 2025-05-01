/**
 * Pricing plans configuration
 * Define all subscription tiers and their details here
 */

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  currency: string;
  features: string[];
  stripe_price_id: string | null;
  stripe_product_id: string;
  highlight?: boolean;
};

// These values should match those in your Supabase pricing_plans table
export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic workout features for casual users",
    price: 0,
    interval: "month",
    currency: "usd",
    features: [
      "Generate basic workouts",
      "10 saved workouts",
      "Access to common exercises",
    ],
    stripe_price_id: null, // Free plan doesn't have a price ID
    stripe_product_id: "prod_free", // You should create this in Stripe dashboard
    highlight: false,
  },
  {
    id: "premium_monthly",
    name: "Premium",
    description: "Advanced features for fitness enthusiasts",
    price: 9.99,
    interval: "month",
    currency: "usd",
    features: [
      "All free features",
      "Unlimited saved workouts",
      "Custom exercise library",
      "Advanced recovery tracking",
      "Priority support",
    ],
    stripe_price_id: "price_premium_monthly", // Replace with your actual Stripe price ID
    stripe_product_id: "prod_premium", // Replace with your actual Stripe product ID
    highlight: true,
  },
  {
    id: "premium_yearly",
    name: "Premium Yearly",
    description: "Save 20% with annual billing",
    price: 96,
    interval: "year",
    currency: "usd",
    features: [
      "All free features",
      "Unlimited saved workouts",
      "Custom exercise library",
      "Advanced recovery tracking",
      "Priority support",
      "2 months free compared to monthly plan",
    ],
    stripe_price_id: "price_premium_yearly", // Replace with your actual Stripe price ID
    stripe_product_id: "prod_premium", // Replace with your actual Stripe product ID
    highlight: false,
  },
];
