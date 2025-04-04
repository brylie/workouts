<script lang="ts">
  import {
    getCompletedExercisesByDateRange,
    deleteCompletedExercise,
  } from "$lib/database";
  import type { CompletedExerciseV2 } from "$lib/exercises";

  import { onMount } from "svelte";

  let startDate: string;
  let endDate: string;
  let isLoading = false;
  let error: string | null = null;
  let completedExercises: CompletedExerciseV2[] = [];

  // Format date for display
  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  // Load exercise history for the selected date range
  async function loadHistory() {
    isLoading = true;
    error = "";

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Set end date to end of day for inclusive range
      end.setHours(23, 59, 59, 999);

      completedExercises = await getCompletedExercisesByDateRange(start, end);
    } catch (err) {
      console.error("Failed to load exercise history", err);
      error = "Failed to load exercise history. Please try again later.";
      completedExercises = [];
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    // Set default date range to last 7 days
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);

    endDate = end.toISOString().split("T")[0];
    startDate = start.toISOString().split("T")[0];

    loadHistory();
  });
</script>

<div class="min-h-screen bg-gray-900 text-white">
  <div class="container mx-auto px-4 py-8">
    <h1 class="mb-8 text-4xl font-bold">Exercise History</h1>

    <div class="mx-auto mb-8 max-w-4xl rounded-lg bg-gray-800 p-6">
      <form
        on:submit|preventDefault={loadHistory}
        class="grid grid-cols-1 items-end gap-4 md:grid-cols-3"
      >
        <div>
          <label for="startDate" class="mb-2 block text-sm font-medium"
            >Start Date</label
          >
          <input
            type="date"
            id="startDate"
            bind:value={startDate}
            class="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          />
        </div>
        <div>
          <label for="endDate" class="mb-2 block text-sm font-medium"
            >End Date</label
          >
          <input
            type="date"
            id="endDate"
            bind:value={endDate}
            class="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          />
        </div>
        <button
          type="submit"
          class="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Filter"}
        </button>
      </form>
    </div>

    {#if error}
      <div class="mx-auto mb-6 max-w-4xl rounded-lg bg-red-800 p-4 text-white">
        <p>{error}</p>
      </div>
    {/if}

    {#if isLoading}
      <div class="mx-auto max-w-4xl text-center">
        <p>Loading exercise history...</p>
      </div>
    {:else if completedExercises.length === 0}
      <div class="mx-auto max-w-4xl text-center">
        <p>No exercise history found for the selected date range.</p>
      </div>
    {:else}
      <div class="mx-auto max-w-4xl overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-700">
          <thead class="border-b border-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
              >
                Exercise ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
              >
                Sets
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
              >
                Reps
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
              >
                Weight
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            {#each completedExercises as exercise}
              <tr>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  {formatDate(exercise.completed_at)}
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  {exercise.exercise_id}
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  {exercise.metrics.sets ?? "-"}
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  {exercise.metrics.reps ?? "-"}
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  {exercise.metrics.weight
                    ? `${exercise.metrics.weight}kg`
                    : "-"}
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  {exercise.metrics.time ?? "-"}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>
