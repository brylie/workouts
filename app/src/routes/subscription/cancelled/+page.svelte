<script lang="ts">
  import { goto } from "$app/navigation";

  function goToSubscriptions() {
    goto("/subscription");
  }

  function goToWorkouts() {
    goto("/workout");
  }
</script>

<svelte:head>
  <title>Subscription Cancelled | Workouts App</title>
</svelte:head>

<div
  class="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white"
>
  <div class="subscription-cancelled-card card bg-base-100 w-full max-w-md">
    <div class="card-body items-center text-center">
      <div class="text-warning mb-4 text-5xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-24 w-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h1 class="text-3xl font-bold">Subscription Cancelled</h1>
      <p class="py-4 text-gray-400">
        Your subscription checkout was cancelled. No worries - you can try again
        whenever you're ready.
      </p>
      <div class="card-actions flex-col gap-2 sm:flex-row">
        <button class="btn btn-primary" on:click={goToSubscriptions}>
          View Plans Again
        </button>
        <button class="btn btn-outline" on:click={goToWorkouts}>
          Continue with Free Plan
        </button>
      </div>
    </div>
  </div>
</div>
