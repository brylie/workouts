<script lang="ts">
  import {
    getWorkoutItemsForRecoveredMuscles,
    updateWorkoutItem as updateWorkoutItemService,
    getWorkoutItemMetrics,
  } from "$lib/workouts";
  import type {
    WorkoutItem,
    CompletedExerciseV2,
    ExerciseFilters,
  } from "$lib/types";
  import { saveCompletedExercise } from "$lib/database";
  import { browser } from "$app/environment";
  import WorkoutItemComponent from "$lib/components/WorkoutItem.svelte";
  import ExerciseFilter from "$lib/components/ExerciseFilter.svelte";

  let numberOfExercises = $state(5);
  let generatedWorkout = $state<WorkoutItem[]>([]);
  let hasRecoveredMuscles = $state(false);

  // Tracks which exercise is currently being saved to the database
  let savingIndex = $state<number | null>(null);

  // Stores any error that occurs during the save operation
  let saveError = $state<string | null>(null);

  let filters = $state<ExerciseFilters>({
    muscles: [],
    equipment: [],
  });

  async function generateWorkout() {
    const workoutItems =
      await getWorkoutItemsForRecoveredMuscles(numberOfExercises);

    // Update hasRecoveredMuscles based on whether we got any exercises back
    hasRecoveredMuscles = workoutItems.length > 0;

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

        const metrics = getWorkoutItemMetrics(item);
        const completedExercise: CompletedExerciseV2 = {
          exercise_id: item.exercise.id,
          completed_at: new Date(),
          metrics,
        };

        await saveCompletedExercise(completedExercise);
        saveError = null;
      } catch (error) {
        console.error("Failed to save completed exercise:", error);
        saveError = "Failed to save exercise record";

        // Revert the UI state if saving failed
        generatedWorkout[index] = updateWorkoutItemService(updatedItem, {
          completed: false,
        });
      } finally {
        savingIndex = null;
      }
    }
  }
</script>

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

        <button
          type="submit"
          class="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700"
        >
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

    {#if !hasRecoveredMuscles && generatedWorkout.length === 0}
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
      <div class="mb-6 rounded-lg bg-red-800 p-4 text-white">
        <p>{saveError}</p>
      </div>
    {/if}

    {#if generatedWorkout.length > 0}
      <div class="space-y-6">
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
