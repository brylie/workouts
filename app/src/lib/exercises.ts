import type { ExerciseDetails, WorkoutItem, ExerciseFilters } from "./types";
import { calisthenicsExercises } from "./exercise_data/calisthenics";
import { dumbbellExercises } from "./exercise_data/dumbbells";
import { machineExercises } from "./exercise_data/machines";
import { kettlebellExercises } from "./exercise_data/kettlebell";
import { bodyweightExercises } from "./exercise_data/bodyweight";
import { pilatesExercises } from "./exercise_data/pilates";
import { yogaPoses } from "./exercise_data/yoga";
import type { Muscles } from "./muscles";
import type { Equipment } from "./equipment";

// Combine machine, calisthenics, dumbbell, and kettlebell exercises
export const allExercises: ExerciseDetails[] = [
  ...machineExercises,
  ...calisthenicsExercises,
  ...dumbbellExercises,
  ...kettlebellExercises,
  ...bodyweightExercises,
  ...pilatesExercises,
  ...yogaPoses,
];

/**
 * Get a random selection of exercises for workout generation
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected exercises
 */
export function getRandomExercises(count: number = 5): ExerciseDetails[] {
  const shuffled = [...allExercises].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get a list of random workout items for workout generation
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected WorkoutItems
 */
export function getRandomWorkoutItems(count: number = 5): WorkoutItem[] {
  const exercises = getRandomExercises(count);
  return exercises.map((exercise) => ({
    exercise,
    completed: false,
  }));
}

/**
 * Get exercises that target a specific muscle group
 * @param muscle The muscle group to target
 * @returns An array of exercises that target the specified muscle
 */
export function getExercisesByMuscle(muscle: Muscles): ExerciseDetails[] {
  return allExercises.filter((exercise) => exercise.muscles.includes(muscle));
}

/**
 * Get exercises that use specific equipment
 * @param equipmentType The type of equipment to filter by
 * @returns An array of exercises that use the specified equipment
 */
export function getExercisesByEquipment(
  equipmentType: Equipment,
): ExerciseDetails[] {
  return allExercises.filter((exercise) =>
    exercise.equipment?.includes(equipmentType),
  );
}

/**
 * Filter exercises by multiple criteria
 * @param filters Filter criteria
 * @returns Filtered array of exercises
 */
export function filterExercises(filters: ExerciseFilters): ExerciseDetails[] {
  return allExercises.filter((exercise) => {
    // Check muscle filter if provided
    if (filters.muscles?.length) {
      if (
        !filters.muscles.some((muscle) => exercise.muscles.includes(muscle))
      ) {
        return false;
      }
    }

    // Check equipment filter if provided
    if (filters.equipment?.length) {
      if (!exercise.equipment?.some((eq) => filters.equipment!.includes(eq))) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Get a random selection of filtered exercises for workout generation
 * @param filters Filter criteria
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected exercises
 */
export function getFilteredRandomExercises(
  filters: ExerciseFilters,
  count: number = 5,
): ExerciseDetails[] {
  const filteredExercises = filterExercises(filters);
  const shuffled = [...filteredExercises].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
