<script lang="ts">
  import { goto } from "$app/navigation";
  import { user } from "$lib/supabase/client";
  import { hasActiveSubscription } from "$lib/subscription/subscription-service";

  export let showLoginRedirect = true;
  export let redirectURL = "/subscription";

  function handleNavigateToSubscription() {
    goto(redirectURL);
  }

  function handleNavigateToLogin() {
    goto(`/login?redirect=${redirectURL}`);
  }
</script>

{#if $hasActiveSubscription}
  <slot />
{:else}
  <div class="subscription-guard-message card bg-base-100">
    <div class="card-body items-center text-center">
      <h2 class="card-title">Subscription Required</h2>
      <p>
        This feature requires an active subscription to unlock full
        functionality.
      </p>
      {#if $user}
        <div class="card-actions justify-end">
          <button
            class="btn btn-primary"
            on:click={handleNavigateToSubscription}
          >
            View Subscription Plans
          </button>
        </div>
      {:else if showLoginRedirect}
        <div class="card-actions flex-col gap-2 sm:flex-row">
          <button class="btn btn-primary" on:click={handleNavigateToLogin}>
            Login
          </button>
          <button
            class="btn btn-outline"
            on:click={handleNavigateToSubscription}
          >
            View Subscription Plans
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
