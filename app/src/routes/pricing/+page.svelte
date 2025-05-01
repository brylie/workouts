<script lang="ts">
  import PricingModule from "./PricingModule.svelte";
</script>

<svelte:head>
  <title>Subscription Plans - Workouts</title>
  <meta
    name="description"
    content="Choose the perfect workout subscription plan for your fitness journey"
  />
</svelte:head>

<div class="min-h-screen py-12" data-testid="pricing-page">
  <div class="mb-12 text-center">
    <h1 class="mb-2 text-4xl font-bold">Choose Your Plan</h1>
    <p class="mx-auto max-w-2xl text-xl">
      Select the plan that fits your workout goals. Upgrade anytime as your
      fitness journey progresses.
    </p>
  </div>

  <PricingModule />

  <div class="mx-auto mt-16 max-w-2xl text-center">
    <h2 class="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>

    <div class="join join-vertical w-full">
      <div class="collapse-arrow join-item border-base-300 collapse border">
        <input
          type="radio"
          name="my-accordion-4"
          aria-label="Can I cancel anytime?"
        />
        <div class="collapse-title text-xl font-medium">
          Can I cancel anytime?
        </div>
        <div class="collapse-content text-left">
          <p>
            Yes, you can cancel your subscription at any time. Your premium
            access will continue until the end of your billing period.
          </p>
        </div>
      </div>

      <div class="collapse-arrow join-item border-base-300 collapse border">
        <input
          type="radio"
          name="my-accordion-4"
          aria-label="What payment methods do you accept?"
        />
        <div class="collapse-title text-xl font-medium">
          What payment methods do you accept?
        </div>
        <div class="collapse-content text-left">
          <p>
            We accept all major credit cards, including Visa, Mastercard, and
            American Express through our secure payment processor, Stripe.
          </p>
        </div>
      </div>

      <div class="collapse-arrow join-item border-base-300 collapse border">
        <input
          type="radio"
          name="my-accordion-4"
          aria-label="Are there any refunds?"
        />
        <div class="collapse-title text-xl font-medium">
          Are there any refunds?
        </div>
        <div class="collapse-content text-left">
          <p>
            We offer a 7-day satisfaction guarantee. If you're not happy with
            your subscription within the first week, contact our support team
            for a full refund.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
