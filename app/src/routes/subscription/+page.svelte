<script lang="ts">
  import {
    pricingPlans,
    type PricingPlan,
  } from "$lib/subscription/pricing-plans";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { user } from "$lib/supabase/client";
  import {
    isSubscriptionActive,
    createCheckoutSession,
    isLoading,
    subscriptionError,
  } from "$lib/subscription/subscription-service";

  let activeSubscription = false;
  let loading = false;
  let error = "";

  // Check if user already has an active subscription
  onMount(async () => {
    if ($user) {
      activeSubscription = await isSubscriptionActive();
    }
  });

  async function handleSubscribe(plan: PricingPlan) {
    if (!$user) {
      goto("/login?redirect=/subscription");
      return;
    }

    if (plan.id === "free") {
      // Free plan doesn't require checkout
      return;
    }

    try {
      loading = true;
      error = "";

      // Create checkout session using the improved API
      const { url, error: checkoutError } = await createCheckoutSession(
        plan.stripe_price_id,
      );

      if (checkoutError) {
        throw new Error(checkoutError);
      }

      if (!url) {
        throw new Error("Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error("Subscription error:", err);
      error =
        err instanceof Error ? err.message : "Failed to start subscription";
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Subscription Plans | Workouts App</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-gray-900 text-white">
  <div class="container mx-auto px-4 py-8">
    <h1 class="mb-8 text-center text-4xl font-bold">Choose Your Plan</h1>

    {#if activeSubscription}
      <div class="alert alert-success mb-8" id="active-subscription-alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span
          >You already have an active subscription! You can manage your
          subscription in your account settings.</span
        >
      </div>
    {/if}

    {#if error}
      <div class="alert alert-error mb-8" id="subscription-error-alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>{error}</span>
      </div>
    {/if}

    <div class="grid gap-8 md:grid-cols-3">
      {#each pricingPlans as plan}
        <div
          class="subscription-plan card bg-base-200 transition-all hover:shadow-lg"
          data-plan-id={plan.id}
        >
          <div class="card-body">
            <h2 class="card-title text-2xl">{plan.name}</h2>
            <p class="text-accent text-lg font-bold">
              {#if plan.price === 0}
                Free
              {:else}
                ${(plan.price / 100).toFixed(2)}/{plan.interval}
              {/if}
            </p>
            <p class="mb-4 text-gray-400">{plan.description}</p>

            <ul class="space-y-2">
              {#each plan.features as feature}
                <li class="plan-feature flex items-center">
                  <svg
                    class="text-accent mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {feature}
                </li>
              {/each}
            </ul>

            <div class="card-actions mt-4 justify-end">
              <button
                class="subscribe-btn btn btn-primary {plan.id === 'free'
                  ? 'btn-outline'
                  : ''}"
                disabled={loading || (activeSubscription && plan.id !== "free")}
                on:click={() => handleSubscribe(plan)}
              >
                {#if loading}
                  <span class="loading loading-spinner"></span>
                  Processing...
                {:else}
                  {plan.id === "free" ? "Start with Free" : "Subscribe"}
                {/if}
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-8 text-center">
      <p class="text-gray-400">
        All subscriptions auto-renew at the end of the period. You can cancel
        anytime. See our <a href="/terms" class="link">Terms of Service</a> for more
        details.
      </p>
    </div>
  </div>
</div>
