<script lang="ts">
  import PricingModule from "../../pricing/PricingModule.svelte";
</script>

<svelte:head>
  <title>Select a Plan - Workouts</title>
</svelte:head>

<div
  class="mt-4 flex min-h-[100vh] place-content-center items-center pb-12 text-center"
  data-testid="select-plan-page"
>
  <div class="flex w-full flex-col px-6">
    <div>
      <h1 class="mb-2 text-2xl font-bold">Select a Plan</h1>
      <div class="mb-6">
        Choose the plan that fits your fitness goals. You can change your plan
        anytime.
      </div>
      <PricingModule callToAction="Select Plan" />
    </div>
  </div>
</div>
