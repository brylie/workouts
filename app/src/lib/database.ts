import Dexie from "dexie";
import type {
  CompletedExerciseMetrics,
  CompletedExerciseV1,
  CompletedExerciseV2,
} from "./exercises";
import { user } from "$lib/supabase/client";
import { getCurrentUserId } from "$lib/supabase/auth";
import {
  saveCompletedExerciseToSupabase,
  getCompletedExercisesByExerciseIdFromSupabase,
  getCompletedExercisesByDateRangeFromSupabase,
  deleteCompletedExerciseFromSupabase,
  syncExercisesToSupabase,
} from "$lib/database/supabase-repository";
import { get } from "svelte/store";

/**
 * Dexie database class for workout data.
 * This extends the Dexie class to provide typed schema definitions.
 */
class WorkoutDatabase extends Dexie {
  // Declare TypeScript typed table
  completedExercises!: Dexie.Table<CompletedExerciseV2, number>;

  constructor() {
    super("WorkoutApp");

    // Define database versions - schema upgrades must use increasing version numbers

    // Version 1 - original schema with flat fields
    this.version(1).stores({
      completedExercises: "++id, exercise_id, completed_at",
    });

    // Version 2 - migrating to nested metrics structure
    this.version(2)
      .stores({
        // Schema stays the same, but we'll transform the data
        completedExercises: "++id, exercise_id, completed_at",
      })
      .upgrade((tx) => {
        // This function runs when upgrading from version 1 to 2
        return tx
          .table("completedExercises")
          .toCollection()
          .modify((exercise) => {
            const exerciseV2 = migrateExerciseV1ToV2(
              exercise as CompletedExerciseV1,
            );

            // Update the existing record with the new format
            Object.assign(exercise, exerciseV2);

            // Delete old flat properties
            delete exercise.sets;
            delete exercise.reps;
            delete exercise.weight;
            delete exercise.time;
          });
      });
  }
}

// Export a single instance of the database
export const db = new WorkoutDatabase();

/**
 * Convert a CompletedExerciseV1 record to CompletedExerciseV2 format
 */
export function migrateExerciseV1ToV2(
  exercise: CompletedExerciseV1,
): CompletedExerciseV2 {
  if (
    exercise.sets !== undefined ||
    exercise.reps !== undefined ||
    exercise.weight !== undefined ||
    exercise.time !== undefined
  ) {
    // Create metrics object from flat fields
    const metrics: CompletedExerciseMetrics = {
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      time: exercise.time ? parseFloat(exercise.time) : undefined,
    };

    // Create new V2 exercise object
    const exerciseV2: CompletedExerciseV2 = {
      id: exercise.id,
      exercise_id: exercise.exercise_id,
      completed_at: exercise.completed_at,
      metrics,
    };

    return exerciseV2;
  }

  // If no old format fields exist, assume it's already in V2 format
  return exercise as unknown as CompletedExerciseV2;
}

/**
 * Check if the user is authenticated and should use Supabase storage
 * @returns Boolean indicating whether to use Supabase
 */
function useSupabase(): boolean {
  return !!getCurrentUserId();
}

/**
 * Save a completed exercise to the appropriate database
 * @param exercise - The completed exercise to save
 * @returns Promise resolving to the ID of the newly created record
 */
export async function saveCompletedExercise(
  exercise: CompletedExerciseV2,
): Promise<number> {
  if (useSupabase()) {
    const userId = getCurrentUserId()!;
    return await saveCompletedExerciseToSupabase(exercise, userId);
  } else {
    return await db.completedExercises.add(exercise);
  }
}

/**
 * Get all completed exercises for a specific exercise type
 * @param exerciseId - The ID of the exercise to filter by
 * @returns Promise resolving to an array of CompletedExercise instances
 */
export async function getCompletedExercisesByExerciseId(
  exerciseId: string,
): Promise<CompletedExerciseV2[]> {
  if (useSupabase()) {
    const userId = getCurrentUserId()!;
    return await getCompletedExercisesByExerciseIdFromSupabase(
      exerciseId,
      userId,
    );
  } else {
    return await db.completedExercises
      .where("exercise_id")
      .equals(exerciseId)
      .sortBy("completed_at");
  }
}

/**
 * Get all completed exercises within a date range
 * @param startDate - The start date to filter from (inclusive)
 * @param endDate - The end date to filter to (inclusive)
 * @returns Promise resolving to an array of CompletedExercise instances
 */
export async function getCompletedExercisesByDateRange(
  startDate: Date,
  endDate: Date,
): Promise<CompletedExerciseV2[]> {
  if (useSupabase()) {
    const userId = getCurrentUserId()!;
    return await getCompletedExercisesByDateRangeFromSupabase(
      startDate,
      endDate,
      userId,
    );
  } else {
    return await db.completedExercises
      .where("completed_at")
      .between(startDate, endDate)
      .sortBy("completed_at");
  }
}

/**
 * Delete a completed exercise record
 * @param id - The ID of the record to delete
 * @returns Promise that resolves when deletion is complete
 */
export async function deleteCompletedExercise(id: number): Promise<void> {
  if (useSupabase()) {
    const userId = getCurrentUserId()!;
    await deleteCompletedExerciseFromSupabase(id, userId);
  } else {
    await db.completedExercises.delete(id);
  }
}

/**
 * Sync all local exercises to Supabase when a user logs in
 * @returns Promise that resolves when sync is complete
 */
export async function syncLocalExercisesToSupabase(): Promise<void> {
  if (!useSupabase()) {
    return; // Don't sync if not authenticated
  }

  const userId = getCurrentUserId()!;
  const localExercises = await db.completedExercises.toArray();

  if (localExercises.length > 0) {
    await syncExercisesToSupabase(localExercises, userId);
  }
}

// Subscribe to auth state changes to trigger syncing
if (typeof window !== "undefined") {
  user.subscribe((currentUser) => {
    if (currentUser) {
      // User just logged in, sync local exercises
      syncLocalExercisesToSupabase().catch((err) => {
        console.error("Error syncing local exercises to Supabase:", err);
      });
    }
  });
}
