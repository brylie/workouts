import { calisthenicsExercises } from "$lib/exercise_data/calisthenics";
import { dumbbellExercises } from "$lib/exercise_data/dumbbells";
import { machineExercises } from "$lib/exercise_data/machines";
import { kettlebellExercises } from "$lib/exercise_data/kettlebell";
import { bodyweightExercises } from "$lib/exercise_data/bodyweight";
import type { Muscles } from "$lib/muscles";
import type { Equipment } from "$lib/equipment";
import {
  MuscleRecoveryStatus,
  getMuscleRecoveryStatusForAllMuscles,
} from "$lib/recovery";
import type { Joints } from "./joints";

/**
 * Defines what metrics can be tracked for an exercise
 */
export interface ExerciseMetrics {
  hasSets: boolean;
  hasReps: boolean;
  hasWeight: boolean;
  hasTime: boolean;
  hasDistance?: boolean;
  hasResistance?: boolean;
  hasSpeed?: boolean;
  hasIncline?: boolean;
  hasResistanceType?: boolean;
  hasCalories?: boolean;
  hasHeartRate?: boolean;
  hasRPE?: boolean;
}

/**
 * Exercise represents a template exercise in the exercise library.
 * It contains the basic information about an exercise that doesn't change.
 */
export interface ExerciseDetails {
  id?: string;
  title: string;
  muscles: Muscles[];
  joints?: Joints[]; // Joints targeted/mobilized by the exercise
  equipment?: Equipment[];
  description?: string;
  tips?: string[];
  variants?: string[];
  metrics: ExerciseMetrics;
}

/**
 * DEPRECATED: CompletedExercise represents a record of a completed exercise.
 * It stores metadata about the exercise without duplicating exercise data.
 */
export interface CompletedExerciseV1 {
  id?: number; // Database auto-increment ID
  exercise_id: string; // Reference to the exercise
  completed_at: Date; // When the exercise was completed
  sets?: number; // Number of sets performed
  reps?: number; // Number of reps per set
  weight?: number; // Weight lifted in kg
  time?: string; // Time taken to complete the exercise
}

/**
 * CompletedExercise represents a record of a completed exercise.
 * It stores metadata about the exercise without duplicating exercise data.
 */
export interface CompletedExerciseV2 {
  id?: number; // Database auto-increment ID
  exercise_id: string; // Reference to the exercise
  completed_at: Date; // When the exercise was completed
  metrics: CompletedExerciseMetrics;
}

/**
 * Filter criteria for exercises
 */
export interface ExerciseFilters {
  muscles?: Muscles[];
  equipment?: Equipment[];
}

/**
 * Metrics values recorded for a completed exercise
 */
export interface CompletedExerciseMetrics {
  sets?: number;
  reps?: number;
  weight?: number;
  time?: number;
  distance?: number;
  resistance?: number;
  speed?: number;
  incline?: number;
  resistanceType?: string;
  calories?: number;
  heartRate?: number;
  rpe?: number;
}

// Combine machine, calisthenics, dumbbell, and kettlebell exercises
export const allExercises: ExerciseDetails[] = [
  ...machineExercises,
  ...calisthenicsExercises,
  ...dumbbellExercises,
  ...kettlebellExercises,
  ...bodyweightExercises,
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
 * Get a random selection of exercises that only target recovered muscles.
 * Automatically fetches the current muscle recovery status.
 * @param filters Filter criteria
 * @param count The number of exercises to include (defaults to 5)
 * @returns An array of randomly selected exercises for recovered muscles
 */
export async function getFilteredRandomExercisesForRecoveredMuscles(
  filters: ExerciseFilters,
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

  // Filter exercises based on provided filters
  const filteredExercises = filterExercises(filters);

  // Filter exercises to only include those that target recovered muscles
  const availableExercises = filteredExercises.filter((exercise) => {
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
