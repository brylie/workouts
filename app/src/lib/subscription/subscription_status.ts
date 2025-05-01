// Utility functions for checking subscription status

/**
 * Checks if a user has an active premium subscription
 */
export function hasActivePremiumSubscription(subscription: any): boolean {
  if (!subscription) return false;

  // Check if subscription exists and has valid status
  const validStatuses = ["active", "trialing"];
  return validStatuses.includes(subscription.status);
}

/**
 * Checks if a user is on a free plan or has no subscription
 */
export function isFreeTier(subscription: any): boolean {
  return !hasActivePremiumSubscription(subscription);
}

/**
 * Returns a friendly message about subscription status
 */
export function getSubscriptionStatusMessage(subscription: any): string {
  if (!subscription) {
    return "You are currently on the free plan. Upgrade to access premium features.";
  }

  switch (subscription.status) {
    case "active":
      return "Your premium subscription is active.";
    case "trialing":
      return "You are currently in a trial period.";
    case "past_due":
      return "Your payment is past due. Please update your payment method.";
    case "canceled":
      return "Your subscription has been canceled and will end on your current billing period.";
    case "unpaid":
      return "We had trouble processing your payment. Please update your payment method.";
    default:
      return "Your subscription status is unavailable.";
  }
}

/**
 * Get feature access based on subscription
 * @returns Object with feature flags
 */
export function getFeatureAccess(subscription: any): {
  maxSavedWorkouts: number;
  customExercises: boolean;
  advancedRecovery: boolean;
  prioritySupport: boolean;
} {
  const isPremium = hasActivePremiumSubscription(subscription);

  return {
    maxSavedWorkouts: isPremium ? Infinity : 10,
    customExercises: isPremium,
    advancedRecovery: isPremium,
    prioritySupport: isPremium,
  };
}
