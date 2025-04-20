/**
 * Shared data models between Dexie and Supabase
 */
import type { CompletedExerciseV2 } from "$lib/exercises";

/**
 * Supabase table interface for completed exercises
 * This matches the schema we'll define in Supabase
 */
export interface SupabaseCompletedExercise {
  id?: number;
  exercise_id: string;
  completed_at: string; // ISO date string format for Supabase
  user_id: string;
  metrics: {
    sets?: number;
    reps?: number;
    weight?: number;
    time?: number;
    distance?: number;
    resistance?: number;
    speed?: number;
    incline?: number;
    resistance_type?: string;
    calories?: number;
    heart_rate?: number;
    rpe?: number;
  };
}

/**
 * Convert a CompletedExerciseV2 to Supabase format
 */
export function toSupabaseFormat(
  exercise: CompletedExerciseV2,
  userId: string,
): SupabaseCompletedExercise {
  return {
    id: exercise.id,
    exercise_id: exercise.exercise_id,
    completed_at: exercise.completed_at.toISOString(),
    user_id: userId,
    metrics: {
      sets: exercise.metrics.sets,
      reps: exercise.metrics.reps,
      weight: exercise.metrics.weight,
      time: exercise.metrics.time,
      distance: exercise.metrics.distance,
      resistance: exercise.metrics.resistance,
      speed: exercise.metrics.speed,
      incline: exercise.metrics.incline,
      resistance_type: exercise.metrics.resistanceType,
      calories: exercise.metrics.calories,
      heart_rate: exercise.metrics.heartRate,
      rpe: exercise.metrics.rpe,
    },
  };
}

/**
 * Convert from Supabase format to CompletedExerciseV2
 */
export function fromSupabaseFormat(
  exercise: SupabaseCompletedExercise,
): CompletedExerciseV2 {
  return {
    id: exercise.id,
    exercise_id: exercise.exercise_id,
    completed_at: new Date(exercise.completed_at),
    metrics: {
      sets: exercise.metrics.sets,
      reps: exercise.metrics.reps,
      weight: exercise.metrics.weight,
      time: exercise.metrics.time,
      distance: exercise.metrics.distance,
      resistance: exercise.metrics.resistance,
      speed: exercise.metrics.speed,
      incline: exercise.metrics.incline,
      resistanceType: exercise.metrics.resistance_type,
      calories: exercise.metrics.calories,
      heartRate: exercise.metrics.heart_rate,
      rpe: exercise.metrics.rpe,
    },
  };
}
