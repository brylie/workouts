<script lang="ts">
  // We can add loading of subscription details here in future if needed
</script>

<svelte:head>
  <title>Subscription Successful - Workouts</title>
</svelte:head>

<div
  class="flex min-h-screen items-center justify-center py-12"
  data-testid="subscription-success-page"
>
  <div class="max-w-lg px-6 text-center">
    <div class="mb-8">
      <div class="avatar placeholder mb-4">
        <div class="bg-success text-success-content w-24 rounded-full">
          <span class="text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-12 w-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
        </div>
      </div>

      <h1 class="mb-2 text-3xl font-bold">Subscription Successful!</h1>
      <p class="mb-6 text-xl">
        Thank you for subscribing! Your premium features are now available.
      </p>

      <div class="card bg-base-200 mb-6 shadow-md">
        <div class="card-body">
          <p>
            You can manage your subscription from your account billing page at
            any time.
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <a href="/account/billing" class="btn btn-outline">
          Manage Subscription
        </a>
        <a href="/workout" class="btn btn-primary"> Start Workout </a>
      </div>
    </div>
  </div>
</div>
