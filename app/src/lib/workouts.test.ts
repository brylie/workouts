import { describe, it, expect, vi } from "vitest";
import {
  convertExercisesToWorkoutItems,
  getFilteredWorkoutItemsForRecoveredMuscles,
  updateWorkoutItem,
  getWorkoutItemMetrics,
  type WorkoutItem,
  type Workout,
} from "$lib/workouts";
import { Equipment } from "$lib/equipment";
import { Muscles } from "$lib/muscles";
import {
  getFilteredRandomExercisesForRecoveredMuscles,
  type ExerciseDetails,
} from "./exercises";

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

  it("should define WorkoutItem interface", () => {
    const workoutItem: WorkoutItem = {
      exercise: {
        id: "push-up",
        title: "Push-Up",
        muscles: [Muscles.CHEST, Muscles.TRICEPS],
        equipment: [],
        description:
          "A bodyweight exercise that targets the chest and triceps.",
        metrics: {
          hasSets: true,
          hasReps: true,
          hasWeight: false,
          hasTime: true,
          hasDistance: false,
          hasResistance: false,
        },
      },
      sets: 3,
      reps: 10,
      weight: 0,
      time: 30,
    };
    expect(workoutItem).toBeDefined();
    expect(workoutItem.exercise.id).toBe("push-up");
    expect(workoutItem.sets).toBe(3);
    expect(workoutItem.reps).toBe(10);
    expect(workoutItem.weight).toBe(0);
    expect(workoutItem.time).toBe(30);
  });

  it("should define Workout interface", () => {
    const workout: Workout = {
      title: "Morning Workout",
      date: new Date("2023-01-01"),
      items: [
        {
          exercise: {
            id: "push-up",
            title: "Push-Up",
            muscles: [Muscles.CHEST, Muscles.TRICEPS],
            equipment: [],
            description:
              "A bodyweight exercise that targets the chest and triceps.",
            metrics: {
              hasSets: true,
              hasReps: true,
              hasWeight: false,
              hasTime: true,
              hasDistance: false,
              hasResistance: false,
            },
          },
          sets: 3,
          reps: 10,
          weight: 0,
          time: 30,
        },
      ],
      notes: "Great workout!",
    };
    expect(workout).toBeDefined();
    expect(workout.title).toBe("Morning Workout");
    expect(workout.date).toEqual(new Date("2023-01-01"));
    expect(workout.items).toHaveLength(1);
    expect(workout.items[0].exercise.id).toBe("push-up");
    expect(workout.notes).toBe("Great workout!");
  });

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
