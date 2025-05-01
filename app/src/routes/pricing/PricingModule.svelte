<!--
  PricingModule.svelte
  Responsive pricing component that displays subscription options
-->
<script lang="ts">
  import {
    pricingPlans,
    type PricingPlan,
  } from "$lib/subscription/pricing_plans";

  let isYearly = $state(false);

  // Use $props() rune instead of export let
  let { callToAction = "Get Started" } = $props();
</script>

<div class="w-full" id="pricing-module">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mb-8 flex justify-center">
      <div class="join bg-base-200 rounded-lg p-1">
        <button
          class="join-item btn {!isYearly ? 'btn-active' : ''}"
          onclick={() => (isYearly = false)}
          data-testid="monthly-toggle"
        >
          Monthly
        </button>
        <button
          class="join-item btn {isYearly ? 'btn-active' : ''}"
          onclick={() => (isYearly = true)}
          data-testid="yearly-toggle"
        >
          Yearly
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {#each pricingPlans.filter((plan) => plan.interval === (isYearly ? "year" : "month") || plan.price === 0) as plan}
        <div
          class="card {plan.highlight
            ? 'bg-primary text-primary-content border-primary'
            : 'bg-base-100'} border-2 shadow-xl"
          data-testid="pricing-card-{plan.id}"
        >
          <div class="card-body">
            <h2 class="card-title text-2xl">{plan.name}</h2>
            <div class="py-2">
              <span class="text-3xl font-bold">
                {#if plan.price === 0}
                  Free
                {:else}
                  ${plan.price}
                {/if}
              </span>
              {#if plan.price > 0}
                <span>/{plan.interval}</span>
              {/if}
            </div>
            <p>{plan.description}</p>

            <div class="divider"></div>

            <ul class="space-y-2">
              {#each plan.features as feature}
                <li class="flex items-start">
                  <svg
                    class="mr-2 h-5 w-5 flex-shrink-0 {plan.highlight
                      ? 'text-primary-content'
                      : 'text-primary'}"
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
                  <span>{feature}</span>
                </li>
              {/each}
            </ul>

            <div class="card-actions mt-4 justify-end">
              <a
                href={plan.stripe_price_id
                  ? `/account/subscribe/${plan.stripe_price_id}`
                  : "/account"}
                class="btn {plan.highlight
                  ? 'btn-secondary'
                  : 'btn-primary'} w-full"
                data-testid="subscribe-button-{plan.id}"
              >
                {callToAction}
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
