import type { ExerciseDetails, ExerciseFilters } from "$lib/types";
import { calisthenicsExercises } from "$lib/exercise_data/calisthenics";
import { dumbbellExercises } from "$lib/exercise_data/dumbbells";
import { machineExercises } from "$lib/exercise_data/machines";
import { kettlebellExercises } from "$lib/exercise_data/kettlebell";
import { bodyweightExercises } from "$lib/exercise_data/bodyweight";
import { pilatesExercises } from "$lib/exercise_data/pilates";
import { yogaPoses } from "$lib/exercise_data/yoga";
import type { Muscles } from "$lib/muscles";
import type { Equipment } from "$lib/equipment";
import {
  MuscleRecoveryStatus,
  getMuscleRecoveryStatusForAllMuscles,
} from "$lib/recovery";

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
 * Helper function to shuffle an array of exercises using Fisher-Yates algorithm
 * @param exercises Array of exercises to shuffle
 * @returns A new array with the exercises in random order
 */
function shuffleExercises(exercises: ExerciseDetails[]): ExerciseDetails[] {
  const shuffled = [...exercises];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Find an exercise by its ID
 * @param id The ID of the exercise to find
 * @returns The exercise details or null if not found
 */
export function getExerciseById(id: string): ExerciseDetails | null {
  return allExercises.find((exercise) => exercise.id === id) || null;
}

/**
 * Get a random selection of exercises for workout generation
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected exercises
 */
export function getRandomExercises(count: number = 5): ExerciseDetails[] {
  const shuffled = shuffleExercises(allExercises);
  return shuffled.slice(0, count);
}

/**
 * Get a random selection of exercises that only target recovered muscles.
 * Automatically fetches the current muscle recovery status.
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected exercises for recovered muscles
 */
export async function getExercisesForRecoveredMuscles(
  count: number = 5,
): Promise<ExerciseDetails[]> {
  const muscleRecoveryStatus = await getMuscleRecoveryStatusForAllMuscles();

  // Create a set of recovered muscle IDs for efficient lookup
  const recoveredMuscleIds = new Set<string>(
    muscleRecoveryStatus
      .filter((status) => status.status === MuscleRecoveryStatus.RECOVERED)
      .map((status) => status.id),
  );

  // If no muscles are recovered, return empty array
  if (recoveredMuscleIds.size === 0) {
    return [];
  }

  // Filter exercises to only include those that target recovered muscles
  const availableExercises = allExercises.filter((exercise) => {
    // Only include exercises where ALL targeted muscles are recovered
    return exercise.muscles.every((muscle) => recoveredMuscleIds.has(muscle));
  });

  // If no exercises match the recovery criteria, return an empty array
  if (availableExercises.length === 0) {
    return [];
  }

  const shuffled = shuffleExercises(availableExercises);
  return shuffled.slice(0, Math.min(count, shuffled.length));
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
  const shuffled = shuffleExercises(filteredExercises);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
