<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { user } from "$lib/supabase/client";
  import { initSubscription } from "$lib/subscription/subscription-service";

  let processing = true;
  let error = "";

  onMount(async () => {
    try {
      // Refresh subscription data
      if ($user) {
        await initSubscription();
      }
      setTimeout(() => {
        processing = false;
      }, 1500);
    } catch (err) {
      console.error("Error initializing subscription:", err);
      error =
        "There was an error loading your subscription details. Please refresh the page.";
      processing = false;
    }
  });

  function goToWorkouts() {
    goto("/workout");
  }
</script>

<svelte:head>
  <title>Subscription Activated | Workouts App</title>
</svelte:head>

<div
  class="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white"
>
  <div class="subscription-success-card card bg-base-100 w-full max-w-md">
    <div class="card-body items-center text-center">
      {#if processing}
        <div class="flex flex-col items-center space-y-4">
          <span class="loading loading-spinner loading-lg text-primary"></span>
          <h2 class="text-xl font-bold">Processing your subscription...</h2>
          <p class="text-gray-400">This will only take a moment.</p>
        </div>
      {:else if error}
        <div class="alert alert-error">
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
      {:else}
        <div class="text-success mb-4 text-5xl">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 class="text-3xl font-bold">Subscription Activated!</h1>
        <p class="py-4 text-gray-400">
          Thank you for your subscription. You now have full access to all
          workout features including full exercise history and cloud sync.
        </p>
        <div class="card-actions">
          <button class="btn btn-primary" on:click={goToWorkouts}>
            Start Working Out
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
