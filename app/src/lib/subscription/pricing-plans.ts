/**
 * Workout app subscription pricing plans
 */

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  stripe_product_id: string;
  stripe_price_id: string;
  active: boolean;
}

/**
 * Pricing plans for the workout app
 * These will be synchronized to the database
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free Plan",
    description: "Basic features with limited data storage",
    price: 0,
    currency: "usd",
    interval: "month",
    features: [
      "Access to workout generator",
      "Limited exercise history",
      "Local storage only",
    ],
    stripe_product_id: "", // Free plan doesn't need a Stripe product
    stripe_price_id: "",
    active: true,
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    description: "Full access to all features with cloud sync",
    price: 500, // €5.00
    currency: "eur",
    interval: "month",
    features: [
      "All workout exercises",
      "Unlimited workout history",
      "Cloud data sync",
      "Progress analytics",
      "Priority support",
    ],
    stripe_product_id: "prod_S7yURRJSZJHP9d",
    stripe_price_id: "price_1RDiXiIMUCSg0j0skDWw4IBg",
    active: true,
  },
  {
    id: "yearly",
    name: "Annual Plan",
    description: "Full access with 2 months free",
    price: 3000, // €30.00
    currency: "eur",
    interval: "year",
    features: [
      "All workout exercises",
      "Unlimited workout history",
      "Cloud data sync",
      "Progress analytics",
      "Priority support",
      "Save 50% compared to monthly",
    ],
    stripe_product_id: "prod_S7yURRJSZJHP9d",
    stripe_price_id: "price_1RDiabIMUCSg0j0sJ8ciAdWC",
    active: true,
  },
];
