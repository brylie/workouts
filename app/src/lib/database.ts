import Dexie from 'dexie';
import type { CompletedExercise } from './types';

/**
 * Dexie database class for workout data.
 * This extends the Dexie class to provide typed schema definitions.
 */
class WorkoutDatabase extends Dexie {
  // Declare TypeScript typed table
  completedExercises!: Dexie.Table<CompletedExercise, number>;

  constructor() {
    super('WorkoutApp');
    
    // Define the database schema
    this.version(1).stores({
      // Store completed exercise data with indexes on exercise_id and completed_at
      // ++id = auto-incrementing primary key
      // & = unique index
      // * = multi-entry index
      completedExercises: '++id, exercise_id, completed_at'
    });
  }
}

// Export a single instance of the database
export const db = new WorkoutDatabase();

/**
 * Save a completed exercise to the database
 * @param exercise - The completed exercise to save
 * @returns Promise resolving to the ID of the newly created record
 */
export async function saveCompletedExercise(exercise: CompletedExercise): Promise<number> {
  return await db.completedExercises.add(exercise);
}

/**
 * Get all completed exercises for a specific exercise type
 * @param exerciseId - The ID of the exercise to filter by
 * @returns Promise resolving to an array of CompletedExercise instances
 */
export async function getCompletedExercisesByExerciseId(exerciseId: string): Promise<CompletedExercise[]> {
  return await db.completedExercises
    .where('exercise_id')
    .equals(exerciseId)
    .sortBy('completed_at');
}

/**
 * Get all completed exercises within a date range
 * @param startDate - The start date to filter from (inclusive)
 * @param endDate - The end date to filter to (inclusive)
 * @returns Promise resolving to an array of CompletedExercise instances
 */
export async function getCompletedExercisesByDateRange(
  startDate: Date, 
  endDate: Date
): Promise<CompletedExercise[]> {
  return await db.completedExercises
    .where('completed_at')
    .between(startDate, endDate)
    .sortBy('completed_at');
}

/**
 * Delete a completed exercise record
 * @param id - The ID of the record to delete
 * @returns Promise that resolves when deletion is complete
 */
export async function deleteCompletedExercise(id: number): Promise<void> {
  await db.completedExercises.delete(id);
}