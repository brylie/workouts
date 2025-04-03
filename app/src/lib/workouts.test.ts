import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  convertExercisesToWorkoutItems,
  getRandomWorkoutItems,
  getFilteredWorkoutItemsForRecoveredMuscles,
  getFilteredWorkoutItems,
  updateWorkoutItem,
  getWorkoutItemMetrics,
} from "$lib/workouts";
import * as exercises from "$lib/exercises";
import { Equipment } from "$lib/equipment";
import { Muscles } from "$lib/muscles";
import type { ExerciseDetails, WorkoutItem } from "$lib/types";

// Mock the exercises module
vi.mock("$lib/exercises", () => ({
  getRandomExercises: vi.fn(),
  getExercisesForRecoveredMuscles: vi.fn(),
  getFilteredRandomExercises: vi.fn(),
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

  describe("getRandomWorkoutItems", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should get random workout items with default count", () => {
      vi.mocked(exercises.getRandomExercises).mockReturnValue([mockExercise]);

      const result = getRandomWorkoutItems();

      expect(exercises.getRandomExercises).toHaveBeenCalledWith(5);
      expect(result).toEqual([
        {
          exercise: mockExercise,
          completed: false,
        },
      ]);
    });

    it("should get random workout items with specified count", () => {
      vi.mocked(exercises.getRandomExercises).mockReturnValue([mockExercise]);

      const result = getRandomWorkoutItems(3);

      expect(exercises.getRandomExercises).toHaveBeenCalledWith(3);
      expect(result).toEqual([
        {
          exercise: mockExercise,
          completed: false,
        },
      ]);
    });
  });

  describe("getWorkoutItemsForRecoveredMuscles", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should get workout items for recovered muscles", async () => {
      vi.mocked(
        exercises.getFilteredRandomExercisesForRecoveredMuscles,
      ).mockResolvedValue([mockExercise]);

      const result = await getFilteredWorkoutItemsForRecoveredMuscles();

      expect(
        exercises.getFilteredRandomExercisesForRecoveredMuscles,
      ).toHaveBeenCalledWith(5);
      expect(result).toEqual([
        {
          exercise: mockExercise,
          completed: false,
        },
      ]);
    });

    it("should handle no recovered muscles", async () => {
      vi.mocked(
        exercises.getFilteredRandomExercisesForRecoveredMuscles,
      ).mockResolvedValue([]);

      const result = await getFilteredWorkoutItemsForRecoveredMuscles();

      expect(result).toEqual([]);
    });
  });

  describe("getFilteredWorkoutItems", () => {
    const mockFilters = {
      muscles: [Muscles.CHEST],
      equipment: [Equipment.DUMBBELLS],
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should get filtered workout items", () => {
      vi.mocked(exercises.getFilteredRandomExercises).mockReturnValue([
        mockExercise,
      ]);

      const result = getFilteredWorkoutItems(mockFilters);

      expect(exercises.getFilteredRandomExercises).toHaveBeenCalledWith(
        mockFilters,
        5,
      );
      expect(result).toEqual([
        {
          exercise: mockExercise,
          completed: false,
        },
      ]);
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
});
