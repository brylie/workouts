import { describe, it, expect } from 'vitest';
import { migrateExerciseV1ToV2 } from './database';
import type { CompletedExerciseV1 } from './types';

describe('migrateExerciseV1ToV2', () => {
  it('should convert V1 exercise with all fields to V2 format', () => {
    const exerciseV1: CompletedExerciseV1 = {
      id: 1,
      exercise_id: 'push-ups',
      completed_at: new Date('2024-01-01'),
      sets: 3,
      reps: 10,
      weight: 0,
      time: '00:05:00'
    };

    const result = migrateExerciseV1ToV2(exerciseV1);

    expect(result).toEqual({
      id: 1,
      exercise_id: 'push-ups',
      completed_at: exerciseV1.completed_at,
      metrics: {
        sets: 3,
        reps: 10,
        weight: 0,
        time: '00:05:00'
      }
    });
  });

  it('should handle V1 exercise with partial fields', () => {
    const exerciseV1: CompletedExerciseV1 = {
      id: 2,
      exercise_id: 'plank',
      completed_at: new Date('2024-01-01'),
      time: '00:01:00'
    };

    const result = migrateExerciseV1ToV2(exerciseV1);

    expect(result).toEqual({
      id: 2,
      exercise_id: 'plank',
      completed_at: exerciseV1.completed_at,
      metrics: {
        time: '00:01:00'
      }
    });
  });

  it('should pass through V2 format unchanged', () => {
    const exerciseV2 = {
      id: 3,
      exercise_id: 'squat',
      completed_at: new Date('2024-01-01'),
      metrics: {
        sets: 3,
        reps: 10,
        weight: 100
      }
    };

    const result = migrateExerciseV1ToV2(exerciseV2 as unknown as CompletedExerciseV1);

    expect(result).toEqual(exerciseV2);
  });
});


