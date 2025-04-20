/**
 * Tests for the database models and conversion functions
 */
import { describe, it, expect } from "vitest";
import { toSupabaseFormat, fromSupabaseFormat } from "./models";
import type { CompletedExerciseV2 } from "$lib/exercises";

// Sample test data
const testDate = new Date("2025-04-20T12:00:00Z");

const testCompletedExercise: CompletedExerciseV2 = {
  id: 123,
  exercise_id: "test-exercise",
  completed_at: testDate,
  metrics: {
    sets: 3,
    reps: 10,
    weight: 70,
    time: 60,
    distance: 5,
    resistance: 50,
    speed: 10,
    incline: 5,
    resistanceType: "band",
    calories: 200,
    heartRate: 140,
    rpe: 8,
  },
};

// The expected output from toSupabaseFormat now correctly reflects that IDs are not preserved
// This matches our implementation that prevents duplicate key errors
const testSupabaseExercise = {
  exercise_id: "test-exercise",
  completed_at: "2025-04-20T12:00:00.000Z",
  user_id: "test-user",
  metrics: {
    sets: 3,
    reps: 10,
    weight: 70,
    time: 60,
    distance: 5,
    resistance: 50,
    speed: 10,
    incline: 5,
    resistance_type: "band",
    calories: 200,
    heart_rate: 140,
    rpe: 8,
  },
};

describe("Database Models", () => {
  describe("toSupabaseFormat", () => {
    it("should convert a CompletedExerciseV2 to Supabase format correctly", () => {
      const userId = "test-user";
      const result = toSupabaseFormat(testCompletedExercise, userId);

      // We now expect the ID to be removed to prevent primary key conflicts
      expect(result).toEqual(testSupabaseExercise);
      expect(result.id).toBeUndefined();
      expect(result.user_id).toBe(userId);
      expect(result.completed_at).toBe(testDate.toISOString());
      expect(result.metrics.resistance_type).toBe(
        testCompletedExercise.metrics.resistanceType,
      );
      expect(result.metrics.heart_rate).toBe(
        testCompletedExercise.metrics.heartRate,
      );
    });

    it("should handle null or undefined metric values", () => {
      const partialExercise: CompletedExerciseV2 = {
        id: 456,
        exercise_id: "partial-exercise",
        completed_at: testDate,
        metrics: {
          sets: 3,
          reps: 10,
          // Other metrics are undefined
        },
      };

      const userId = "test-user";
      const result = toSupabaseFormat(partialExercise, userId);

      // ID should be removed as per our implementation
      expect(result.id).toBeUndefined();
      expect(result.exercise_id).toBe("partial-exercise");
      expect(result.metrics.sets).toBe(3);
      expect(result.metrics.reps).toBe(10);
      expect(result.metrics.weight).toBeUndefined();
      expect(result.metrics.time).toBeUndefined();
      expect(result.metrics.resistance_type).toBeUndefined();
    });
  });

  describe("fromSupabaseFormat", () => {
    it("should convert from Supabase format to CompletedExerciseV2 correctly", () => {
      // Add ID back for the Supabase response
      const supabaseResponse = { ...testSupabaseExercise, id: 123 };
      const result = fromSupabaseFormat(supabaseResponse);

      expect(result.id).toBe(123);
      expect(result.exercise_id).toBe(supabaseResponse.exercise_id);
      expect(result.completed_at).toBeInstanceOf(Date);
      expect(result.completed_at.toISOString()).toBe(
        supabaseResponse.completed_at,
      );
      expect(result.metrics.resistanceType).toBe(
        supabaseResponse.metrics.resistance_type,
      );
      expect(result.metrics.heartRate).toBe(
        supabaseResponse.metrics.heart_rate,
      );
    });

    it("should handle null or undefined metric values", () => {
      const partialSupabaseExercise = {
        id: 789,
        exercise_id: "partial-supabase",
        completed_at: "2025-04-20T15:00:00.000Z",
        user_id: "test-user",
        metrics: {
          sets: 3,
          reps: 10,
          // Other metrics are undefined
        },
      };

      const result = fromSupabaseFormat(partialSupabaseExercise);

      expect(result.id).toBe(789);
      expect(result.exercise_id).toBe("partial-supabase");
      expect(result.metrics.sets).toBe(3);
      expect(result.metrics.reps).toBe(10);
      expect(result.metrics.weight).toBeUndefined();
      expect(result.metrics.time).toBeUndefined();
      expect(result.metrics.resistanceType).toBeUndefined();
    });
  });
});
