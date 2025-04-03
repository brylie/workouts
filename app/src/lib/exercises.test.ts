import { describe, it, expect } from "vitest";

import {
  getRandomExercises,
  getExercisesByMuscle,
  getExercisesByEquipment,
  getRandomWorkoutItems,
  allExercises,
  filterExercises,
  getFilteredRandomExercises,
  getExerciseById,
  getExercisesForRecoveredMuscles,
  getWorkoutItemsForRecoveredMuscles,
} from "./exercises";
import { Equipment } from "./equipment";
import { Muscles } from "./muscles";
import { MuscleRecoveryStatus } from "./recovery";

// Test getRandomExercises function
describe("getRandomExercises", () => {
  it("should return the specified number of random exercises", () => {
    const exercises = getRandomExercises(3);
    expect(exercises).toHaveLength(3);
  });

  it("should return different exercises on subsequent calls", () => {
    const exercises1 = getRandomExercises(3);
    const exercises2 = getRandomExercises(3);
    expect(exercises1).not.toEqual(exercises2);
  });

  // Additional tests for edge cases and boundary conditions

  // Test getRandomExercises with count 0
  it("should return an empty array when count is 0", () => {
    const exercises = getRandomExercises(0);
    expect(exercises).toHaveLength(0);
  });

  // Test getRandomExercises with count greater than available exercises
  it("should return all available exercises when count is greater than available exercises", () => {
    const exercises = getRandomExercises(100);
    expect(exercises).toHaveLength(exercises.length);
  });
});

// Test getExercisesByMuscle function
describe("getExercisesByMuscle", () => {
  it("should return exercises that target the specified muscle group", () => {
    const exercises = getExercisesByMuscle(Muscles.ABDOMINALS);
    expect(
      exercises.every((exercise) =>
        exercise.muscles.includes(Muscles.ABDOMINALS),
      ),
    ).toBe(true);
  });

  // Test getExercisesByMuscle with invalid muscle group
  it("should return an empty array for an invalid muscle group", () => {
    const exercises = getExercisesByMuscle("invalid" as Muscles);
    expect(exercises).toHaveLength(0);
  });
});

// Test getExercisesByEquipment function
describe("getExercisesByEquipment", () => {
  it("should return exercises that use the specified equipment", () => {
    const exercises = getExercisesByEquipment(Equipment.TREADMILL);
    expect(
      exercises.every((exercise) =>
        exercise.equipment?.includes(Equipment.TREADMILL),
      ),
    ).toBe(true);
  });

  // Test getExercisesByEquipment with invalid equipment type
  it("should return an empty array for an invalid equipment type", () => {
    const exercises = getExercisesByEquipment("invalid" as Equipment);
    expect(exercises).toHaveLength(0);
  });
});

// Test getRandomWorkoutItems function
describe("getRandomWorkoutItems", () => {
  it("should return the specified number of workout items", () => {
    const workoutItems = getRandomWorkoutItems(3);
    expect(workoutItems).toHaveLength(3);
  });

  it("should return workout items with default not completed value", () => {
    const workoutItems = getRandomWorkoutItems(1);
    const item = workoutItems[0];

    expect(item).toHaveProperty("exercise");
    expect(item).toHaveProperty("completed", false);
  });

  it("should return different workout items on subsequent calls", () => {
    const workoutItems1 = getRandomWorkoutItems(3);
    const workoutItems2 = getRandomWorkoutItems(3);

    // Compare the exercise IDs to check if they're different
    const ids1 = workoutItems1.map((item) => item.exercise.id);
    const ids2 = workoutItems2.map((item) => item.exercise.id);
    expect(ids1).not.toEqual(ids2);
  });

  it("should return an empty array when count is 0", () => {
    const workoutItems = getRandomWorkoutItems(0);
    expect(workoutItems).toHaveLength(0);
  });
});

// Test for unique exercise IDs
describe("Exercise ID uniqueness", () => {
  it("should have unique IDs for all exercises across all collections", () => {
    const ids = allExercises.map((exercise) => exercise.id);
    const uniqueIds = new Set(ids);

    // Check if any IDs are undefined or null
    expect(
      ids.every((id) => id !== undefined && id !== null),
      "Some exercises are missing IDs",
    ).toBe(true);

    // Find and report duplicates before the assertion
    if (uniqueIds.size !== allExercises.length) {
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      const uniqueDuplicates = [...new Set(duplicates)];
      console.error("Duplicate IDs:", uniqueDuplicates);

      // For each duplicate ID, find the exercises that use it
      uniqueDuplicates.forEach((dupId) => {
        const exercisesWithDupId = allExercises.filter((ex) => ex.id === dupId);
        console.error(
          `Exercises with ID "${dupId}":`,
          exercisesWithDupId.map((ex) => ex.title),
        );
      });
    }

    // Then check if the number of unique IDs matches the total number of exercises
    expect(
      uniqueIds.size,
      `Duplicate IDs found. Total exercises: ${allExercises.length}, Unique IDs: ${uniqueIds.size}`,
    ).toBe(allExercises.length);
  });
});

// Test filterExercises function
describe("filterExercises", () => {
  it("should filter exercises by muscle group", () => {
    const filters = {
      muscles: [Muscles.CHEST],
    };
    const exercises = filterExercises(filters);
    expect(exercises.length).toBeGreaterThan(0);
    expect(
      exercises.every((exercise) => exercise.muscles.includes(Muscles.CHEST)),
    ).toBe(true);
  });

  it("should filter exercises by equipment", () => {
    const filters = {
      equipment: [Equipment.DUMBBELLS],
    };
    const exercises = filterExercises(filters);
    expect(exercises.length).toBeGreaterThan(0);
    expect(
      exercises.every((exercise) =>
        exercise.equipment?.includes(Equipment.DUMBBELLS),
      ),
    ).toBe(true);
  });

  it("should filter exercises by both muscle and equipment", () => {
    const filters = {
      muscles: [Muscles.CHEST],
      equipment: [Equipment.DUMBBELLS],
    };
    const exercises = filterExercises(filters);
    expect(exercises.length).toBeGreaterThan(0);
    expect(
      exercises.every(
        (exercise) =>
          exercise.muscles.includes(Muscles.CHEST) &&
          exercise.equipment?.includes(Equipment.DUMBBELLS),
      ),
    ).toBe(true);
  });

  it("should return all exercises when no filters are provided", () => {
    const filters = {};
    const exercises = filterExercises(filters);
    expect(exercises).toEqual(allExercises);
  });

  it("should return empty array when no exercises match filters", () => {
    const filters = {
      muscles: [Muscles.CHEST],
      equipment: ["invalid" as Equipment],
    };
    const exercises = filterExercises(filters);
    expect(exercises).toHaveLength(0);
  });
});

// Test getFilteredRandomExercises function
describe("getFilteredRandomExercises", () => {
  it("should return the specified number of filtered exercises", () => {
    const filters = {
      muscles: [Muscles.CHEST],
    };
    const exercises = getFilteredRandomExercises(filters, 3);
    expect(exercises).toHaveLength(3);
    expect(
      exercises.every((exercise) => exercise.muscles.includes(Muscles.CHEST)),
    ).toBe(true);
  });

  it("should return different exercises on subsequent calls", () => {
    const filters = {
      muscles: [Muscles.CHEST],
    };
    const exercises1 = getFilteredRandomExercises(filters, 3);
    const exercises2 = getFilteredRandomExercises(filters, 3);

    // Convert to IDs for comparison
    const ids1 = exercises1.map((ex) => ex.id);
    const ids2 = exercises2.map((ex) => ex.id);
    expect(ids1).not.toEqual(ids2);
  });

  it("should return all matching exercises when count exceeds available exercises", () => {
    const filters = {
      muscles: [Muscles.CHEST],
      equipment: [Equipment.DUMBBELLS],
    };
    const exercises = getFilteredRandomExercises(filters, 100);
    const allMatchingExercises = filterExercises(filters);
    expect(exercises).toHaveLength(allMatchingExercises.length);
  });

  it("should return empty array when no exercises match filters", () => {
    const filters = {
      muscles: [Muscles.CHEST],
      equipment: ["invalid" as Equipment],
    };
    const exercises = getFilteredRandomExercises(filters, 3);
    expect(exercises).toHaveLength(0);
  });
});

describe("getExerciseById", () => {
  it("should return an exercise when given a valid ID", () => {
    // Get the first exercise from the list to use as a reference
    const testExercise = allExercises[0];
    if (testExercise.id) {
      const result = getExerciseById(testExercise.id);
      expect(result).not.toBeNull();
      expect(result?.id).toBe(testExercise.id);
      expect(result?.title).toBe(testExercise.title);
    } else {
      throw new Error("testExercise.id is undefined");
    }
  });

  it("should return null when given a non-existent ID", () => {
    const result = getExerciseById("non-existent-exercise-id");
    expect(result).toBeNull();
  });
});

describe("getExercisesForRecoveredMuscles", () => {
  it("should return exercises that only target recovered muscles", () => {
    const mockRecoveryStatus = [
      {
        id: Muscles.CHEST,
        status: MuscleRecoveryStatus.RECOVERED,
        last_trained: null,
        recovery_percentage: 100,
        exercise_count: 0,
      },
      {
        id: Muscles.BICEPS,
        status: MuscleRecoveryStatus.RECOVERING,
        last_trained: new Date(),
        recovery_percentage: 50,
        exercise_count: 1,
      },
    ];

    const exercises = getExercisesForRecoveredMuscles(mockRecoveryStatus, 3);

    // Verify we got some exercises
    expect(exercises.length).toBeGreaterThan(0);

    // Verify each exercise only targets recovered muscles
    exercises.forEach((exercise) => {
      const hasUnrecoveredMuscle = exercise.muscles.some(
        (muscle) => muscle === Muscles.BICEPS,
      );
      expect(hasUnrecoveredMuscle).toBe(false);
    });
  });

  it("should return the specified number of exercises", () => {
    const mockRecoveryStatus = [
      {
        id: Muscles.CHEST,
        status: MuscleRecoveryStatus.RECOVERED,
        last_trained: null,
        recovery_percentage: 100,
        exercise_count: 0,
      },
    ];

    const exercises = getExercisesForRecoveredMuscles(mockRecoveryStatus, 3);
    expect(exercises.length).toBeLessThanOrEqual(3);
  });

  it("should return different exercises on subsequent calls", () => {
    const mockRecoveryStatus = [
      {
        id: Muscles.CHEST,
        status: MuscleRecoveryStatus.RECOVERED,
        last_trained: null,
        recovery_percentage: 100,
        exercise_count: 0,
      },
    ];

    const exercises1 = getExercisesForRecoveredMuscles(mockRecoveryStatus, 3);
    const exercises2 = getExercisesForRecoveredMuscles(mockRecoveryStatus, 3);

    // Convert to IDs for comparison
    const ids1 = exercises1.map((ex) => ex.id);
    const ids2 = exercises2.map((ex) => ex.id);
    expect(ids1).not.toEqual(ids2);
  });

  it("should return empty array when no muscles are recovered", () => {
    const mockRecoveryStatus = [
      {
        id: Muscles.CHEST,
        status: MuscleRecoveryStatus.RECOVERING,
        last_trained: new Date(),
        recovery_percentage: 50,
        exercise_count: 1,
      },
    ];

    const exercises = getExercisesForRecoveredMuscles(mockRecoveryStatus, 3);
    expect(exercises).toHaveLength(0);
  });
});

describe("getWorkoutItemsForRecoveredMuscles", () => {
  it("should return workout items for recovered muscles", () => {
    const mockRecoveryStatus = [
      {
        id: Muscles.CHEST,
        status: MuscleRecoveryStatus.RECOVERED,
        last_trained: null,
        recovery_percentage: 100,
        exercise_count: 0,
      },
    ];

    const workoutItems = getWorkoutItemsForRecoveredMuscles(
      mockRecoveryStatus,
      3,
    );

    // Check length
    expect(workoutItems.length).toBeLessThanOrEqual(3);

    // Check structure and completed status
    workoutItems.forEach((item) => {
      expect(item).toHaveProperty("exercise");
      expect(item).toHaveProperty("completed", false);

      // Verify only recovered muscles are targeted
      const hasUnrecoveredMuscle = item.exercise.muscles.some(
        (muscle) =>
          !mockRecoveryStatus.find(
            (status) =>
              status.id === muscle &&
              status.status === MuscleRecoveryStatus.RECOVERED,
          ),
      );
      expect(hasUnrecoveredMuscle).toBe(false);
    });
  });

  it("should return empty array when no muscles are recovered", () => {
    const mockRecoveryStatus = [
      {
        id: Muscles.CHEST,
        status: MuscleRecoveryStatus.RECOVERING,
        last_trained: new Date(),
        recovery_percentage: 50,
        exercise_count: 1,
      },
    ];

    const workoutItems = getWorkoutItemsForRecoveredMuscles(
      mockRecoveryStatus,
      3,
    );
    expect(workoutItems).toHaveLength(0);
  });
});
