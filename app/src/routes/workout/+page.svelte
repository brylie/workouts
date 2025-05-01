<script lang="ts">
  import {
    getFilteredWorkoutItemsForRecoveredMuscles,
    updateWorkoutItem as updateWorkoutItemService,
    getWorkoutItemMetrics,
  } from "$lib/workouts";
  import type { WorkoutItem } from "$lib/workouts";
  import { saveCompletedExercise } from "$lib/database";
  import { browser } from "$app/environment";
  import WorkoutItemComponent from "$lib/components/WorkoutItem.svelte";
  import ExerciseFilter from "$lib/components/ExerciseFilter.svelte";
  import SubscriptionGuard from "$lib/components/SubscriptionGuard.svelte";
  import { user } from "$lib/supabase/client";
  import { hasActiveSubscription } from "$lib/subscription/subscription-service";
  import type { ExerciseFilters, CompletedExerciseV2 } from "$lib/exercises";

  let numberOfExercises = $state(5);
  let generatedWorkout = $state<WorkoutItem[]>([]);
  let showRecoveryWarning = $state(false);

  // Tracks which exercise is currently being saved to the database
  let savingIndex = $state<number | null>(null);

  // Stores any error that occurs during the save operation
  let saveError = $state<string | null>(null);

  // Show subscription upsell if exercise was saved locally due to missing subscription
  let showSubscriptionUpsell = $state(false);

  let filters = $state<ExerciseFilters>({
    muscles: [],
    equipment: [],
  });

  async function generateWorkout() {
    const workoutItems = await getFilteredWorkoutItemsForRecoveredMuscles(
      filters,
      numberOfExercises,
    );

    // if the workout is empty, show a warning
    if (workoutItems.length === 0) {
      showRecoveryWarning = true;
    } else {
      showRecoveryWarning = false;
    }

    generatedWorkout = workoutItems;
  }

  function handleFilterChange(newFilters: ExerciseFilters) {
    filters = {
      muscles: newFilters.muscles,
      equipment: newFilters.equipment,
    };
  }

  function updateWorkoutItem(index: number, updates: Partial<WorkoutItem>) {
    const currentItem = generatedWorkout[index];
    generatedWorkout[index] = updateWorkoutItemService(currentItem, updates);
  }

  async function markAsComplete(index: number) {
    const item = generatedWorkout[index];

    // Toggle the completed state
    const updatedItem = updateWorkoutItemService(item, {
      completed: !item.completed,
    });
    generatedWorkout[index] = updatedItem;

    if (browser && item && item.exercise.id && updatedItem.completed) {
      try {
        savingIndex = index;
        showSubscriptionUpsell = false;

        const metrics = getWorkoutItemMetrics(item);
        const completedExercise: CompletedExerciseV2 = {
          exercise_id: item.exercise.id,
          completed_at: new Date(),
          metrics,
        };

        await saveCompletedExercise(completedExercise);
        saveError = null;

        // If user is authenticated but doesn't have a subscription, show upsell
        // This means the exercise was saved locally rather than to the cloud
        if ($user && !$hasActiveSubscription) {
          showSubscriptionUpsell = true;
        }
      } catch (error) {
        console.error("Failed to save completed exercise:", error);

        if (
          error instanceof Error &&
          error.message.includes("Subscription required")
        ) {
          saveError =
            "Subscription required to save workouts to the cloud. Your data was saved locally only.";
          showSubscriptionUpsell = true;
        } else {
          saveError = "Failed to save exercise record";
        }

        // Revert the UI state if saving fully failed
        if (
          error instanceof Error &&
          !error.message.includes("Subscription required")
        ) {
          generatedWorkout[index] = updateWorkoutItemService(updatedItem, {
            completed: false,
          });
        }
      } finally {
        savingIndex = null;
      }
    }
  }
</script>

<svelte:head>
  <title>Workout Generator | Workouts App</title>
</svelte:head>

<div class="min-h-screen bg-gray-900 text-white">
  <div class="container mx-auto px-4 py-8">
    <h1 class="mb-8 text-4xl font-bold">Workout Generator</h1>

    <div class="mb-8 rounded-lg bg-gray-800">
      <ExerciseFilter {filters} onFilterChange={handleFilterChange} />
    </div>

    <div class="mb-8 rounded-lg bg-gray-800 p-6">
      <form
        onsubmit={(e) => {
          e.preventDefault();
          generateWorkout();
        }}
        class="space-y-4"
      >
        <div>
          <label for="exerciseCount" class="mb-2 block text-sm font-medium">
            Number of Exercises
          </label>
          <input
            type="number"
            id="exerciseCount"
            bind:value={numberOfExercises}
            min="1"
            max="15"
            class="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          />
        </div>

        <button type="submit" class="btn btn-primary w-full">
          Generate Workout
        </button>
      </form>

      <div class="mt-4 rounded bg-gray-700 p-3 text-sm">
        <p class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-5 w-5 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span
            ><strong>Training Tip:</strong> For optimal strength and mobility, aim
            to exercise each muscle group twice per week.</span
          >
        </p>
      </div>
    </div>

    {#if showSubscriptionUpsell}
      <div class="subscription-upsell alert alert-info mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 flex-shrink-0 stroke-current"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path></svg
        >
        <div>
          <h3 class="font-bold">Upgrade to sync your workouts to the cloud!</h3>
          <div class="text-sm">
            Subscribe for cloud backup and access your workout history from any
            device.
          </div>
        </div>
        <div>
          <button
            class="btn btn-sm btn-primary"
            on:click={() => (window.location.href = "/subscription")}
            >View Plans</button
          >
        </div>
      </div>
    {/if}

    {#if showRecoveryWarning}
      <div class="mb-6 rounded-lg bg-amber-800 p-6 text-white">
        <h3 class="mb-2 text-xl font-semibold">Time for Recovery!</h3>
        <p class="mb-4">
          Your muscles need time to recover and grow stronger. Proper recovery
          helps:
        </p>
        <ul class="list-inside list-disc space-y-2">
          <li>Prevent injury and overtraining</li>
          <li>Build muscle more effectively</li>
          <li>Improve overall performance</li>
        </ul>
        <p class="mt-4">
          Consider trying some light stretching or mobility work today instead.
        </p>
      </div>
    {/if}

    {#if saveError}
      <div class="error-message alert alert-error mb-6">
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
        <span>{saveError}</span>
      </div>
    {/if}

    {#if generatedWorkout.length > 0}
      <div class="workout-results space-y-6">
        <h2 class="mb-4 text-2xl font-bold">Your Workout</h2>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {#each generatedWorkout as item, index}
            <WorkoutItemComponent
              {item}
              {index}
              {savingIndex}
              onUpdate={updateWorkoutItem}
              onMarkComplete={markAsComplete}
            />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
