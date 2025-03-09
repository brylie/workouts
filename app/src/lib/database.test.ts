import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db, saveCompletedExercise, getCompletedExercisesByExerciseId, getCompletedExercisesByDateRange } from './database';
import type { CompletedExerciseV2 } from './types';

// fake-indexeddb is now loaded via vitest-setup-indexeddb.ts setup file
// No need for manual mocking here

describe('Workout Database', () => {
  // Sample test data with nested metrics
  const testCompletedExercise: CompletedExerciseV2 = {
    exercise_id: 'push-up',
    completed_at: new Date('2023-01-01T12:00:00Z'),
    metrics: {
      sets: 3,
      reps: 10,
      weight: 0
    }
  };

  const testCompletedExercise2: CompletedExerciseV2 = {
    exercise_id: 'squat',
    completed_at: new Date('2023-01-02T12:00:00Z'),
    metrics: {
      sets: 4,
      reps: 12,
      weight: 60
    }
  };

  beforeEach(async () => {
    // Clear the database before each test
    await db.completedExercises.clear();
  });

  afterEach(async () => {
    // Clean up after each test
    await db.completedExercises.clear();
  });

  it('should save a completed exercise', async () => {
    // Add a mock exercise
    const id = await saveCompletedExercise(testCompletedExercise);
    
    // Retrieve it from the database
    const savedExercise = await db.completedExercises.get(id);
    
    // Verify it's been saved correctly
    expect(savedExercise).toMatchObject({
      exercise_id: testCompletedExercise.exercise_id,
      metrics: {
        sets: testCompletedExercise.metrics.sets,
        reps: testCompletedExercise.metrics.reps,
        weight: testCompletedExercise.metrics.weight
      }
    });
    
    // Check that the date is correctly stored
    expect(savedExercise?.completed_at instanceof Date).toBe(true);
    expect(savedExercise?.completed_at.toISOString())
      .toBe(testCompletedExercise.completed_at.toISOString());
  });

  it('should retrieve exercises by exercise ID', async () => {
    // Add two exercises with different exercise IDs
    await saveCompletedExercise(testCompletedExercise);
    await saveCompletedExercise(testCompletedExercise2);
    
    // Retrieve exercises for 'push-up'
    const exercises = await getCompletedExercisesByExerciseId('push-up');
    
    // Verify we got the correct exercise
    expect(exercises.length).toBe(1);
    expect(exercises[0].exercise_id).toBe('push-up');
    expect(exercises[0].metrics.sets).toBe(3);
  });

  it('should retrieve exercises by date range', async () => {
    // Add two exercises with different dates
    await saveCompletedExercise(testCompletedExercise);
    await saveCompletedExercise(testCompletedExercise2);
    
    // Test getting exercises from a specific date range
    const exercises = await getCompletedExercisesByDateRange(
      new Date('2023-01-01T00:00:00Z'),
      new Date('2023-01-01T23:59:59Z')
    );
    
    // Verify we got only the exercise from Jan 1
    expect(exercises.length).toBe(1);
    expect(exercises[0].exercise_id).toBe('push-up');
    
    // Test getting all exercises within a wider range
    const allExercises = await getCompletedExercisesByDateRange(
      new Date('2023-01-01T00:00:00Z'),
      new Date('2023-01-03T00:00:00Z')
    );
    
    // Verify we got both exercises
    expect(allExercises.length).toBe(2);
  });

  it('should handle additional metric fields', async () => {
    const exercise: CompletedExerciseV2 = {
      exercise_id: 'test-exercise',
      completed_at: new Date(),
      metrics: {
        sets: 3,
        reps: 12,
        weight: 50,
        time: '30',
        distance: 1000,
        resistance: 8,
        speed: 10,
        incline: 2,
        resistanceType: 'magnetic',
        calories: 150,
        heartRate: 140,
        rpe: 7
      }
    };

    const id = await saveCompletedExercise(exercise);
    const savedExercise = await db.completedExercises.get(id);
    expect(savedExercise?.metrics).toEqual(exercise.metrics);
  });

  it('should handle optional metric fields', async () => {
    const exercise: CompletedExerciseV2 = {
      exercise_id: 'test-exercise',
      completed_at: new Date(),
      metrics: {
        sets: 3,
        // Omitting other fields to test optional properties
      }
    };

    const id = await saveCompletedExercise(exercise);
    const savedExercise = await db.completedExercises.get(id);
    expect(savedExercise?.metrics.sets).toBe(3);
    expect(savedExercise?.metrics.reps).toBeUndefined();
    expect(savedExercise?.metrics.weight).toBeUndefined();
    expect(savedExercise?.metrics.time).toBeUndefined();
  });
});