import { describe, it, expect, vi } from "vitest";
import {
  convertExercisesToWorkoutItems,
  getFilteredWorkoutItemsForRecoveredMuscles,
  updateWorkoutItem,
  getWorkoutItemMetrics,
} from "$lib/workouts";
import { Equipment } from "$lib/equipment";
import { Muscles } from "$lib/muscles";
import type { ExerciseDetails, WorkoutItem } from "$lib/types";
import { getFilteredRandomExercisesForRecoveredMuscles } from "./exercises";

// Mock the exercises module
vi.mock("$lib/exercises", () => ({
  getRandomExercises: vi.fn(),
  getExercisesForRecoveredMuscles: vi.fn(),
  getFilteredRandomExercises: vi.fn(),
  getFilteredRandomExercisesForRecoveredMuscles: vi.fn(),
}));

describe("workouts", () => {
  const mockExercise: ExerciseDetails = {
    id: "test-1",
    title: "Test Exercise",
    muscles: [Muscles.CHEST],
    equipment: [Equipment.DUMBBELLS],
    description: "Test description",
    metrics: {
      hasSets: true,
      hasReps: true,
      hasWeight: true,
      hasTime: false,
    },
  };

  describe("convertExercisesToWorkoutItems", () => {
    it("should convert exercises to workout items", () => {
      const result = convertExercisesToWorkoutItems([mockExercise]);

      expect(result).toEqual([
        {
          exercise: mockExercise,
          completed: false,
        },
      ]);
    });

    it("should handle empty array", () => {
      const result = convertExercisesToWorkoutItems([]);
      expect(result).toEqual([]);
    });
  });

  describe("updateWorkoutItem", () => {
    const mockWorkoutItem: WorkoutItem = {
      exercise: mockExercise,
      completed: false,
    };

    it("should update workout item properties", () => {
      const updates = {
        completed: true,
        sets: 3,
        reps: 12,
      };

      const result = updateWorkoutItem(mockWorkoutItem, updates);

      expect(result).toEqual({
        ...mockWorkoutItem,
        ...updates,
      });
    });

    it("should not modify original workout item", () => {
      const original = { ...mockWorkoutItem };
      const updates = { completed: true };

      updateWorkoutItem(mockWorkoutItem, updates);

      expect(mockWorkoutItem).toEqual(original);
    });
  });

  describe("getWorkoutItemMetrics", () => {
    it("should extract metrics from workout item", () => {
      const mockWorkoutItem: WorkoutItem = {
        exercise: mockExercise,
        completed: true,
        sets: 3,
        reps: 12,
        weight: 20,
        time: 60,
      };

      const result = getWorkoutItemMetrics(mockWorkoutItem);

      expect(result).toEqual({
        sets: 3,
        reps: 12,
        weight: 20,
        time: 60,
      });
    });

    it("should handle missing metrics", () => {
      const mockWorkoutItem: WorkoutItem = {
        exercise: mockExercise,
        completed: true,
      };

      const result = getWorkoutItemMetrics(mockWorkoutItem);

      expect(result).toEqual({
        sets: undefined,
        reps: undefined,
        weight: undefined,
        time: undefined,
      });
    });
  });

  describe("getFilteredWorkoutItemsForRecoveredMuscles", () => {
    it("should call getFilteredRandomExercisesForRecoveredMuscles with the right arguments and return items", async () => {
      const mockCount = 2;
      const mockFilters = {
        muscles: [Muscles.CHEST],
        equipment: [Equipment.DUMBBELLS],
      };
      vi.mocked(
        getFilteredRandomExercisesForRecoveredMuscles,
      ).mockResolvedValue([mockExercise]);

      const result = await getFilteredWorkoutItemsForRecoveredMuscles(
        mockFilters,
        mockCount,
      );

      expect(
        getFilteredRandomExercisesForRecoveredMuscles,
      ).toHaveBeenCalledWith(mockFilters, mockCount);
      expect(result).toEqual([
        {
          exercise: mockExercise,
          completed: false,
        },
      ]);
    });
  });
});
