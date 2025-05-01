<script lang="ts">
  import {
    getSubscriptionStatusMessage,
    getFeatureAccess,
  } from "$lib/subscription/subscription_status";

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  let { data } = $props();

  let profile = $state(data.profile);
  let subscription = $state(data.subscription);

  // Get feature access based on subscription
  $effect(() => {
    features = getFeatureAccess(subscription);
  });

  let features = $state({
    maxSavedWorkouts: 10,
    customExercises: false,
    advancedRecovery: false,
    prioritySupport: false,
  });

  function getPlanName() {
    if (!subscription || !subscription.plan) return "Free Plan";
    return subscription.plan.name;
  }

  function getBadgeColor(status: string) {
    switch (status) {
      case "active":
        return "badge-success";
      case "trialing":
        return "badge-info";
      case "past_due":
      case "unpaid":
        return "badge-warning";
      case "canceled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  }
</script>

<svelte:head>
  <title>My Account - Workouts</title>
</svelte:head>

<div class="px-4 py-12" id="account-page">
  <div class="mx-auto max-w-4xl">
    <h1 class="mb-8 text-3xl font-bold">My Account</h1>

    <!-- Subscription Status Summary -->
    <section class="card bg-base-100 mb-8 shadow-xl" id="subscription-summary">
      <div class="card-body">
        <h2 class="card-title text-2xl">Subscription</h2>

        <div class="mb-2 flex flex-wrap items-center gap-2">
          <span class="text-lg font-medium">{getPlanName()}</span>

          {#if subscription}
            <span class="badge {getBadgeColor(subscription.status)}">
              {subscription.status.charAt(0).toUpperCase() +
                subscription.status.slice(1)}
            </span>
          {/if}
        </div>

        <p class="mb-4">{getSubscriptionStatusMessage(subscription)}</p>

        {#if subscription && subscription.currentPeriodEnd}
          <p class="text-sm opacity-70">
            {subscription.cancelAtPeriodEnd
              ? "Access until"
              : "Next billing date"}:
            {formatDate(new Date(subscription.currentPeriodEnd))}
          </p>
        {/if}

        <div class="card-actions mt-4 justify-end">
          <a
            href="/account/billing"
            class="btn btn-outline"
            id="manage-billing-btn"
          >
            Manage Billing
          </a>

          {#if !subscription}
            <a
              href="/account/select-plan"
              class="btn btn-primary"
              id="upgrade-plan-btn"
            >
              Upgrade Plan
            </a>
          {/if}
        </div>
      </div>
    </section>

    <!-- Feature Access Summary -->
    <section class="card bg-base-100 mb-8 shadow-xl" id="feature-access">
      <div class="card-body">
        <h2 class="card-title text-xl">Your Features</h2>

        <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="flex items-start">
            <svg
              class="text-primary mr-2 h-5 w-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span
              >Up to {features.maxSavedWorkouts === Infinity
                ? "unlimited"
                : features.maxSavedWorkouts} saved workouts</span
            >
          </div>

          <div class="flex items-start">
            <svg
              class="mr-2 h-5 w-5 flex-shrink-0 {features.customExercises
                ? 'text-primary'
                : 'text-base-300'}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {#if features.customExercises}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              {:else}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              {/if}
            </svg>
            <span class={!features.customExercises ? "opacity-50" : ""}
              >Custom exercise library</span
            >
          </div>

          <div class="flex items-start">
            <svg
              class="mr-2 h-5 w-5 flex-shrink-0 {features.advancedRecovery
                ? 'text-primary'
                : 'text-base-300'}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {#if features.advancedRecovery}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              {:else}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              {/if}
            </svg>
            <span class={!features.advancedRecovery ? "opacity-50" : ""}
              >Advanced recovery tracking</span
            >
          </div>

          <div class="flex items-start">
            <svg
              class="mr-2 h-5 w-5 flex-shrink-0 {features.prioritySupport
                ? 'text-primary'
                : 'text-base-300'}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {#if features.prioritySupport}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              {:else}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              {/if}
            </svg>
            <span class={!features.prioritySupport ? "opacity-50" : ""}
              >Priority support</span
            >
          </div>
        </div>

        {#if !subscription}
          <div class="card-actions mt-4 justify-end">
            <a href="/pricing" class="btn btn-primary" id="view-pricing-btn">
              View Plan Options
            </a>
          </div>
        {/if}
      </div>
    </section>

    <!-- Account Settings -->
    <section class="card bg-base-100 shadow-xl" id="account-settings">
      <div class="card-body">
        <h2 class="card-title text-xl">Account Settings</h2>

        <div class="form-control mb-4 w-full max-w-md">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            class="input input-bordered w-full"
            value={profile?.email || ""}
            disabled
            readonly
          />
        </div>

        <div class="card-actions justify-end">
          <a
            href="/account/settings"
            class="btn btn-outline"
            id="edit-settings-btn"
          >
            Edit Settings
          </a>
        </div>
      </div>
    </section>
  </div>
</div>
