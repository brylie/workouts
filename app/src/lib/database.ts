import Dexie from 'dexie';
import type { CompletedExercise, CompletedExerciseMetrics } from './types';

/**
 * Dexie database class for workout data.
 * This extends the Dexie class to provide typed schema definitions.
 */
class WorkoutDatabase extends Dexie {
  // Declare TypeScript typed table
  completedExercises!: Dexie.Table<CompletedExercise, number>;

  constructor() {
    super('WorkoutApp');
    
    // Define database versions - schema upgrades must use increasing version numbers
    
    // Version 1 - original schema with flat fields
    this.version(1).stores({
      completedExercises: '++id, exercise_id, completed_at'
    });
    
    // Version 2 - migrating to nested metrics structure
    this.version(2).stores({
      // Schema stays the same, but we'll transform the data
      completedExercises: '++id, exercise_id, completed_at'
    }).upgrade(tx => {
      // This function runs when upgrading from version 1 to 2
      return tx.table('completedExercises').toCollection().modify(exercise => {
        // If this is an old record with flat fields, migrate to the new format
        if (exercise.sets !== undefined || 
            exercise.reps !== undefined || 
            exercise.weight !== undefined || 
            exercise.time !== undefined) {
          
          // Create metrics object from flat fields
          const metrics: CompletedExerciseMetrics = {
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            time: exercise.time
          };
          
          // Add the metrics object
          exercise.metrics = metrics;
          
          // Delete old flat properties
          delete exercise.sets;
          delete exercise.reps;
          delete exercise.weight;
          delete exercise.time;
        }
      });
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