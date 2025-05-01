<script lang="ts">
  let { data } = $props();

  let subscription = $state(data.subscription);
  let hasEverHadSubscription = $state(data.hasEverHadSubscription);
  let isLoading = $state(false);

  function formatPlanName(plan: any) {
    if (!plan) return "Free";
    return `${plan.name} (${plan.interval === "month" ? "Monthly" : "Yearly"})`;
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  function formatStatus(status: string) {
    // Added type annotation for status
    switch (status) {
      case "active":
        return "Active";
      case "trialing":
        return "Trial";
      case "canceled":
        return "Canceled";
      case "incomplete":
        return "Incomplete";
      case "incomplete_expired":
        return "Expired";
      case "past_due":
        return "Past Due";
      case "unpaid":
        return "Unpaid";
      default:
        return "Unknown";
    }
  }

  async function handleManageSubscription() {
    isLoading = true;
    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error creating portal session:", error);
      alert("Failed to open billing portal. Please try again later.");
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Billing & Subscription - Workouts</title>
</svelte:head>

<div class="min-h-screen px-4 py-12" id="billing-page">
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-6 text-3xl font-bold">Billing & Subscription</h1>

    {#if subscription}
      <div class="card bg-base-100 mb-8 shadow-xl" id="subscription-details">
        <div class="card-body">
          <h2 class="card-title text-2xl">Current Subscription</h2>

          <div class="divider"></div>

          <dl class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <dt class="text-sm font-medium opacity-70">Plan</dt>
              <dd class="font-semibold">{formatPlanName(subscription.plan)}</dd>
            </div>

            <div>
              <dt class="text-sm font-medium opacity-70">Status</dt>
              <dd class="font-semibold">
                <span
                  class="badge badge-{subscription.status === 'active'
                    ? 'success'
                    : 'warning'}"
                >
                  {formatStatus(subscription.status)}
                </span>
              </dd>
            </div>

            <div>
              <dt class="text-sm font-medium opacity-70">
                Current Period Ends
              </dt>
              <dd class="font-semibold">
                {subscription.currentPeriodEnd
                  ? formatDate(new Date(subscription.currentPeriodEnd))
                  : "N/A"}
              </dd>
            </div>

            <div>
              <dt class="text-sm font-medium opacity-70">
                Renews Automatically
              </dt>
              <dd class="font-semibold">
                {subscription.cancelAtPeriodEnd ? "No" : "Yes"}
              </dd>
            </div>
          </dl>

          <div class="card-actions mt-4 justify-end">
            <button
              class="btn btn-primary"
              on:click={handleManageSubscription}
              disabled={isLoading}
              id="manage-subscription-btn"
            >
              {isLoading
                ? '<span class="loading loading-spinner"></span> Loading...'
                : "Manage Subscription"}
            </button>
          </div>
        </div>
      </div>
    {:else}
      <div class="card bg-base-200 mb-8 shadow-xl" id="no-subscription">
        <div class="card-body">
          <h2 class="card-title text-xl">
            {hasEverHadSubscription
              ? "No Active Subscription"
              : "No Subscription"}
          </h2>
          <p>
            {hasEverHadSubscription
              ? "You don't have an active subscription. Subscribe to access premium features!"
              : "You haven't subscribed yet. Subscribe to unlock premium features!"}
          </p>

          <div class="card-actions mt-4 justify-end">
            <a
              href="/account/select-plan"
              class="btn btn-primary"
              id="subscribe-now-btn"
            >
              Subscribe Now
            </a>
          </div>
        </div>
      </div>
    {/if}

    <div class="card bg-base-100 shadow-xl" id="billing-help">
      <div class="card-body">
        <h2 class="card-title text-xl">Need Help?</h2>
        <p>
          If you have any questions about your subscription or billing, please
          contact our support team.
        </p>

        <div class="card-actions mt-4">
          <a href="/support" class="link link-primary">Contact Support</a>
        </div>
      </div>
    </div>
  </div>
</div>
