import type {
  WorkoutItem,
  ExerciseFilters,
  CompletedExerciseMetrics,
  ExerciseDetails,
} from "$lib/types";
import {
  getRandomExercises,
  getFilteredRandomExercisesForRecoveredMuscles,
  getFilteredRandomExercises,
} from "$lib/exercises";

/**
 * Convert exercises into workout items
 * @param exercises Array of exercises to convert
 * @returns Array of workout items
 */
export function convertExercisesToWorkoutItems(
  exercises: ExerciseDetails[],
): WorkoutItem[] {
  return exercises.map((exercise) => ({
    exercise,
    completed: false,
  }));
}

/**
 * Get a list of random workout items for workout generation
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected WorkoutItems
 */
export function getRandomWorkoutItems(count: number = 5): WorkoutItem[] {
  const exercises = getRandomExercises(count);
  return convertExercisesToWorkoutItems(exercises);
}

/**
 * Get workout items using only exercises for recovered muscles.
 * Automatically fetches the current muscle recovery status.
 * @param filters Filter criteria
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of workout items with exercises for recovered muscles
 */
export async function getFilteredWorkoutItemsForRecoveredMuscles(
  filters: ExerciseFilters,
  count: number = 5,
): Promise<WorkoutItem[]> {
  const exercises = await getFilteredRandomExercisesForRecoveredMuscles(
    filters,
    count,
  );
  return convertExercisesToWorkoutItems(exercises);
}

/**
 * Get workout items using filtered exercises
 * @param filters Filter criteria
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of workout items with filtered exercises
 */
export function getFilteredWorkoutItems(
  filters: ExerciseFilters,
  count: number = 5,
): WorkoutItem[] {
  const exercises = getFilteredRandomExercises(filters, count);
  return convertExercisesToWorkoutItems(exercises);
}

/**
 * Update a workout item with partial data
 * @param workoutItem The original workout item
 * @param updates Partial updates to apply
 * @returns Updated workout item
 */
export function updateWorkoutItem(
  workoutItem: WorkoutItem,
  updates: Partial<WorkoutItem>,
): WorkoutItem {
  return { ...workoutItem, ...updates };
}

/**
 * Convert workout item metrics to CompletedExerciseMetrics format
 * @param workoutItem The workout item containing metrics
 * @returns Formatted exercise metrics
 */
export function getWorkoutItemMetrics(
  workoutItem: WorkoutItem,
): CompletedExerciseMetrics {
  return {
    sets: workoutItem.sets,
    reps: workoutItem.reps,
    weight: workoutItem.weight,
    time: workoutItem.time,
  };
}
