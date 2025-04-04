<script lang="ts">
  import { onMount } from "svelte";
  import { MuscleGroups, musclesList } from "$lib/muscles";
  import {
    getMuscleRecoveryStatusForAllMuscles,
    MuscleRecoveryStatus,
    type MuscleRecovery,
  } from "$lib/recovery";

  const recoveryStatusColors = {
    [MuscleRecoveryStatus.RECOVERING]: {
      name: "Recovering",
      bg: "bg-yellow-500",
    },
    [MuscleRecoveryStatus.RECOVERED]: {
      name: "Recovered",
      bg: "bg-green-500",
    },
    [MuscleRecoveryStatus.OVERTRAINED]: {
      name: "Overtrained",
      bg: "bg-red-500",
    },
  };

  // Using Svelte 5 runes syntax
  let muscleRecovery = $state<MuscleRecovery[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);

  // Define muscle groups order
  let muscleGroupsOrder = $state([
    MuscleGroups.UPPER_BODY,
    MuscleGroups.CORE,
    MuscleGroups.LOWER_BODY,
  ]);

  // Group muscles by their muscle group - using record instead of $derived function
  let groupedMuscles = $state<Record<MuscleGroups, MuscleRecovery[]>>({
    [MuscleGroups.UPPER_BODY]: [],
    [MuscleGroups.CORE]: [],
    [MuscleGroups.LOWER_BODY]: [],
  });

  // Update grouped muscles whenever muscleRecovery changes
  $effect(() => {
    const grouped: Record<MuscleGroups, MuscleRecovery[]> = {
      [MuscleGroups.UPPER_BODY]: [],
      [MuscleGroups.CORE]: [],
      [MuscleGroups.LOWER_BODY]: [],
    };

    // Sort muscles into their groups
    muscleRecovery.forEach((muscle) => {
      const muscleGroup = muscle.muscleGroup;
      if (muscleGroup in grouped) {
        grouped[muscleGroup as MuscleGroups].push(muscle);
      }
    });

    groupedMuscles = grouped;
  });

  // Format date to be more readable
  function formatDate(date: Date | null): string {
    if (!date) return "Never";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(date));
  }

  // Load recovery data on component mount
  onMount(async () => {
    const lookBackDays = 14; // Look back 14 days
    try {
      muscleRecovery = await getMuscleRecoveryStatusForAllMuscles(lookBackDays);
      console.log("Muscle Recovery Data:", muscleRecovery);

      isLoading = false;
    } catch (err) {
      error =
        err instanceof Error
          ? err.message
          : "Failed to load muscle recovery data";
      isLoading = false;
    }
  });

  // Determine the CSS classes based on recovery status
  function getStatusClasses(status: MuscleRecoveryStatus): string {
    if (status in recoveryStatusColors) {
      return recoveryStatusColors[status as keyof typeof recoveryStatusColors]
        .bg;
    }
    return "bg-neutral";
  }
</script>

<svelte:head>
  <title>Muscle Recovery Tracker</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="mb-6 text-3xl font-bold">Muscle Recovery Tracker</h1>

  {#if isLoading}
    <div class="my-12 flex justify-center">
      <span class="loading loading-spinner loading-lg" id="loading-indicator"
      ></span>
    </div>
  {:else if error}
    <div class="alert alert-error mb-6 shadow-lg" id="error-message">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>{error}</span>
      </div>
    </div>
  {:else}
    <!-- Recovery Status Legend -->
    <div class="mb-8" id="recovery-legend">
      <h2 class="mb-3 text-xl font-semibold">Recovery Status Legend</h2>
      <div class="flex flex-wrap gap-4">
        {#each Object.entries(recoveryStatusColors) as [status, config]}
          <div class="flex items-center">
            <div class="mr-2 h-4 w-4 rounded {config.bg}"></div>
            <span>{config.name}</span>
          </div>
        {/each}
      </div>
      <div class="mt-4">
        <details
          class="collapse-arrow border-base-300 bg-base-100 rounded-box collapse border"
        >
          <summary class="collapse-title font-medium">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="mr-2 h-6 w-6 shrink-0 stroke-current"
                style="display: inline"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>How recovery status is determined</span>
            </div>
          </summary>
          <div class="collapse-content">
            <div>
              <div>
                <ul class="ml-5">
                  <li>Recovered: When the full recovery period has passed</li>
                  <li>
                    Recovering: When a muscle is trained once during its
                    recovery period
                  </li>
                  <li>
                    Overtrained: When a muscle is trained twice or more during
                    its recovery period
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>

    <!-- Muscle Recovery Table -->
    <div class="overflow-x-auto" id="muscle-recovery-table">
      <table class="table-zebra table w-full">
        <thead>
          <tr>
            <th>Muscle Name</th>
            <th>Last Trained</th>
            <th class="text-center">Recovery time (hours)</th>
            <th>Recovery Status</th>
            <th class="text-center">Exercise Count</th>
            <th>Recovery %</th>
          </tr>
        </thead>
        <tbody>
          {#each muscleGroupsOrder as muscleGroup}
            <!-- Muscle Group Header -->
            <tr class="bg-gray-800">
              <td
                colspan="6"
                class="text-lg font-bold text-blue-400"
                id="muscle-group-{muscleGroup.replace(/\s+/g, '-')}"
              >
                {muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)}
              </td>
            </tr>

            <!-- Muscles in this group -->
            {#each groupedMuscles[muscleGroup] || [] as muscle}
              <tr class="hover" id="muscle-row-{muscle.id}">
                <td>{muscle.name}</td>
                <td>{formatDate(muscle.lastTrainedDate)}</td>
                <td class="text-center">
                  <span class="font-mono">{muscle.recoveryHours}</span>
                </td>
                <td>
                  <div
                    class="badge {getStatusClasses(muscle.status)} p-3 text-xs"
                  >
                    {muscle.status}
                  </div>
                </td>
                <td class="text-center">
                  <span class="text-center font-mono"
                    >{muscle.exerciseCount}</span
                  >
                </td>
                <td>
                  <div class="flex items-center">
                    <progress
                      class="progress mr-2 w-24 {getStatusClasses(
                        muscle.status,
                      )}"
                      value={muscle.recoveryPercentage}
                      max="100"
                    ></progress>
                    <span>{muscle.recoveryPercentage}%</span>
                  </div>
                </td>
              </tr>
            {/each}

            {#if !groupedMuscles[muscleGroup]?.length}
              <tr>
                <td colspan="5" class="text-center text-gray-500"
                  >No muscles in this group</td
                >
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
