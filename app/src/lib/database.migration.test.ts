import { describe, it, expect, beforeEach, vi } from 'vitest';
import Dexie from 'dexie';
import type { CompletedExercise } from './types';

describe('Database Migration', () => {
  // Create a test database with the old schema
  class OldWorkoutDatabase extends Dexie {
    completedExercises: Dexie.Table<any, number>;

    constructor() {
      super('WorkoutAppTest');
      // Define old schema (version 1) with flat fields
      this.version(1).stores({
        completedExercises: '++id, exercise_id, completed_at'
      });
    }
  }

  // Create a new database class that will perform the migration
  class NewWorkoutDatabase extends Dexie {
    completedExercises: Dexie.Table<CompletedExercise, number>;

    constructor() {
      super('WorkoutAppTest');
      
      // Define old schema first
      this.version(1).stores({
        completedExercises: '++id, exercise_id, completed_at'
      });
      
      // Define new schema with migration
      this.version(2).stores({
        completedExercises: '++id, exercise_id, completed_at'
      }).upgrade(tx => {
        return tx.table('completedExercises').toCollection().modify(exercise => {
          if (exercise.sets !== undefined || 
              exercise.reps !== undefined || 
              exercise.weight !== undefined || 
              exercise.time !== undefined) {
            
            exercise.metrics = {
              sets: exercise.sets,
              reps: exercise.reps,
              weight: exercise.weight,
              time: exercise.time
            };
            
            delete exercise.sets;
            delete exercise.reps;
            delete exercise.weight;
            delete exercise.time;
          }
        });
      });
    }
  }

  let oldDb: OldWorkoutDatabase;
  let newDb: NewWorkoutDatabase;

  // Test data representing records in the old format
  const oldFormatExercises = [
    {
      exercise_id: 'bench-press',
      completed_at: new Date('2023-01-15'),
      sets: 3,
      reps: 10,
      weight: 60
    },
    {
      exercise_id: 'treadmill',
      completed_at: new Date('2023-01-16'),
      time: '20',
    }
  ];

  beforeEach(async () => {
    // Delete the test database if it exists
    await Dexie.delete('WorkoutAppTest');
    
    // Create and use old database format
    oldDb = new OldWorkoutDatabase();
    await oldDb.open();
    
    // Add exercises in old format
    await oldDb.completedExercises.bulkAdd(oldFormatExercises);
    
    // Close the old database
    await oldDb.close();
    
    // Create and open the new database (this triggers migration)
    newDb = new NewWorkoutDatabase();
  });

  it('should migrate old flat fields to nested metrics structure', async () => {
    // Open the new database with the upgraded schema
    await newDb.open();
    
    // Get all exercises
    const migratedExercises = await newDb.completedExercises.toArray();
    
    // Check that we have the correct number of exercises
    expect(migratedExercises).toHaveLength(2);
    
    // Check the first exercise (with sets, reps, weight)
    const benchPress = migratedExercises.find(ex => ex.exercise_id === 'bench-press');
    expect(benchPress).toBeDefined();
    expect(benchPress?.metrics).toBeDefined();
    expect(benchPress?.metrics.sets).toBe(3);
    expect(benchPress?.metrics.reps).toBe(10);
    expect(benchPress?.metrics.weight).toBe(60);
    
    // Make sure old flat fields are removed
    expect(benchPress).not.toHaveProperty('sets');
    expect(benchPress).not.toHaveProperty('reps');
    expect(benchPress).not.toHaveProperty('weight');
    
    // Check the second exercise (with time only)
    const treadmill = migratedExercises.find(ex => ex.exercise_id === 'treadmill');
    expect(treadmill).toBeDefined();
    expect(treadmill?.metrics).toBeDefined();
    expect(treadmill?.metrics.time).toBe('20');
    expect(treadmill?.metrics.sets).toBeUndefined();
    
    // Make sure old flat fields are removed
    expect(treadmill).not.toHaveProperty('time');

    // Clean up
    await newDb.delete();
  });
});