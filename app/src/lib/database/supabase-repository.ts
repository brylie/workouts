import { supabase } from "$lib/supabase/client";
import type { CompletedExerciseV2 } from "$lib/exercises";
import { fromSupabaseFormat, toSupabaseFormat } from "./models";
import { isSubscriptionActive } from "$lib/subscription/subscription-service";

// Table name for completed exercises in Supabase
const COMPLETED_EXERCISES_TABLE = "completed_exercises";

/**
 * Check if the user has permission to use Supabase storage
 * This will check if the user has an active subscription
 */
async function canUseSupabase(): Promise<boolean> {
  return await isSubscriptionActive();
}

/**
 * Save a completed exercise to Supabase
 * @param exercise - The completed exercise to save
 * @param userId - The ID of the user who completed the exercise
 * @returns Promise resolving to the ID of the newly created record
 */
export async function saveCompletedExerciseToSupabase(
  exercise: CompletedExerciseV2,
  userId: string,
): Promise<number> {
  // Check subscription status
  if (!(await canUseSupabase())) {
    throw new Error("Subscription required to save exercises to the cloud");
  }

  const supabaseExercise = toSupabaseFormat(exercise, userId);

  try {
    const { data, error } = await supabase
      .from(COMPLETED_EXERCISES_TABLE)
      .insert(supabaseExercise)
      .select("id")
      .single();

    if (error) {
      console.error("Error saving exercise to Supabase:", error);
      throw new Error(`Failed to save exercise to Supabase: ${error.message}`);
    }

    return data.id;
  } catch (err) {
    console.error("Exception when saving exercise to Supabase:", err);
    throw new Error(
      `Failed to save exercise to Supabase: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

/**
 * Get all completed exercises for a specific exercise type from Supabase
 * @param exerciseId - The ID of the exercise to filter by
 * @param userId - The ID of the user who completed the exercise
 * @returns Promise resolving to an array of CompletedExercise instances
 */
export async function getCompletedExercisesByExerciseIdFromSupabase(
  exerciseId: string,
  userId: string,
): Promise<CompletedExerciseV2[]> {
  // Check subscription status
  if (!(await canUseSupabase())) {
    throw new Error("Subscription required to fetch exercises from the cloud");
  }

  const { data, error } = await supabase
    .from(COMPLETED_EXERCISES_TABLE)
    .select("*")
    .eq("exercise_id", exerciseId)
    .eq("user_id", userId)
    .order("completed_at");

  if (error) {
    console.error("Error fetching exercises from Supabase:", error);
    throw new Error(
      `Failed to fetch exercises from Supabase: ${error.message}`,
    );
  }

  return data.map(fromSupabaseFormat);
}

/**
 * Get all completed exercises within a date range from Supabase
 * @param startDate - The start date to filter from (inclusive)
 * @param endDate - The end date to filter to (inclusive)
 * @param userId - The ID of the user who completed the exercise
 * @returns Promise resolving to an array of CompletedExercise instances
 */
export async function getCompletedExercisesByDateRangeFromSupabase(
  startDate: Date,
  endDate: Date,
  userId: string,
): Promise<CompletedExerciseV2[]> {
  // Check subscription status
  if (!(await canUseSupabase())) {
    throw new Error("Subscription required to fetch exercises from the cloud");
  }

  const { data, error } = await supabase
    .from(COMPLETED_EXERCISES_TABLE)
    .select("*")
    .eq("user_id", userId)
    .gte("completed_at", startDate.toISOString())
    .lte("completed_at", endDate.toISOString())
    .order("completed_at");

  if (error) {
    console.error("Error fetching exercises from Supabase:", error);
    throw new Error(
      `Failed to fetch exercises from Supabase: ${error.message}`,
    );
  }

  return data.map(fromSupabaseFormat);
}

/**
 * Delete a completed exercise record from Supabase
 * @param id - The ID of the record to delete
 * @param userId - The ID of the user who completed the exercise
 * @returns Promise that resolves when deletion is complete
 */
export async function deleteCompletedExerciseFromSupabase(
  id: number,
  userId: string,
): Promise<void> {
  // Check subscription status
  if (!(await canUseSupabase())) {
    throw new Error("Subscription required to delete exercises from the cloud");
  }

  const { error } = await supabase
    .from(COMPLETED_EXERCISES_TABLE)
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting exercise from Supabase:", error);
    throw new Error(
      `Failed to delete exercise from Supabase: ${error.message}`,
    );
  }
}

/**
 * Sync local exercises to Supabase
 * @param exercises - Array of completed exercises to sync
 * @param userId - The ID of the user to associate with these exercises
 * @returns Promise that resolves when sync is complete
 */
export async function syncExercisesToSupabase(
  exercises: CompletedExerciseV2[],
  userId: string,
): Promise<void> {
  // Check subscription status
  if (!(await canUseSupabase())) {
    throw new Error("Subscription required to sync exercises to the cloud");
  }

  const supabaseExercises = exercises.map((ex) => toSupabaseFormat(ex, userId));

  const { error } = await supabase
    .from(COMPLETED_EXERCISES_TABLE)
    .upsert(supabaseExercises, {
      onConflict: "id",
      ignoreDuplicates: false,
    });

  if (error) {
    console.error("Error syncing exercises to Supabase:", error);
    throw new Error(`Failed to sync exercises to Supabase: ${error.message}`);
  }
}
