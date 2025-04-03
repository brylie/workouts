import { describe, it, expect, vi } from "vitest";
import {
  allExercises,
  getExerciseById,
  getRandomExercises,
  getExercisesByMuscle,
  getExercisesByEquipment,
  filterExercises,
  getFilteredRandomExercises,
  getExercisesForRecoveredMuscles,
} from "$lib/exercises";
import { Equipment } from "$lib/equipment";
import { Muscles } from "$lib/muscles";
import type { MuscleRecovery } from "$lib/recovery";
import * as recovery from "$lib/recovery";

vi.mock("$lib/recovery", () => ({
  getMuscleRecoveryStatusForAllMuscles: vi.fn(),
  MuscleRecoveryStatus: {
    RECOVERED: "RECOVERED",
    RECOVERING: "RECOVERING",
  },
}));

describe("exercises", () => {
  describe("getRandomExercises", () => {
    it("should return the specified number of random exercises", () => {
      const exercises = getRandomExercises(3);
      expect(exercises).toHaveLength(3);
    });

    it("should return different exercises on subsequent calls", () => {
      const exercises1 = getRandomExercises(3);
      const exercises2 = getRandomExercises(3);

      // Convert exercises to IDs for easier comparison
      const ids1 = exercises1.map((e) => e.id);
      const ids2 = exercises2.map((e) => e.id);

      // Check if the arrays are different (not necessarily completely different)
      expect(JSON.stringify(ids1)).not.toBe(JSON.stringify(ids2));
    });

    it("should return an empty array when count is 0", () => {
      const exercises = getRandomExercises(0);
      expect(exercises).toHaveLength(0);
    });

    it("should return all available exercises when count is greater than available exercises", () => {
      const exercises = getRandomExercises(1000);
      expect(exercises).toHaveLength(allExercises.length);
    });
  });

  describe("getExercisesByMuscle", () => {
    it("should return exercises that target the specified muscle group", () => {
      const exercises = getExercisesByMuscle(Muscles.CHEST);
      expect(exercises.length).toBeGreaterThan(0);
      exercises.forEach((exercise) => {
        expect(exercise.muscles).toContain(Muscles.CHEST);
      });
    });

    it("should return an empty array for an invalid muscle group", () => {
      const exercises = getExercisesByMuscle("invalid_muscle" as Muscles);
      expect(exercises).toHaveLength(0);
    });
  });

  describe("getExercisesByEquipment", () => {
    it("should return exercises that use the specified equipment", () => {
      const exercises = getExercisesByEquipment(Equipment.DUMBBELLS);
      expect(exercises.length).toBeGreaterThan(0);
      exercises.forEach((exercise) => {
        expect(exercise.equipment).toContain(Equipment.DUMBBELLS);
      });
    });

    it("should return an empty array for an invalid equipment type", () => {
      const exercises = getExercisesByEquipment(
        "invalid_equipment" as Equipment,
      );
      expect(exercises).toHaveLength(0);
    });
  });

  describe("Exercise ID uniqueness", () => {
    it("should have unique IDs for all exercises across all collections", () => {
      const ids = new Set<string>();
      const duplicates: string[] = [];

      allExercises.forEach((exercise) => {
        // Ensure id is not undefined before processing
        const exerciseId = exercise.id;
        if (exerciseId && ids.has(exerciseId)) {
          duplicates.push(exerciseId);
        }
        if (exerciseId) {
          ids.add(exerciseId);
        }
      });

      expect(duplicates).toHaveLength(0);
      if (duplicates.length > 0) {
        console.error(`Found duplicate exercise IDs: ${duplicates.join(", ")}`);
      }
    });
  });

  describe("filterExercises", () => {
    it("should filter exercises by muscle group", () => {
      const filters = {
        muscles: [Muscles.CHEST],
      };

      const filteredExercises = filterExercises(filters);
      expect(filteredExercises.length).toBeGreaterThan(0);
      filteredExercises.forEach((exercise) => {
        expect(exercise.muscles).toContain(Muscles.CHEST);
      });
    });

    it("should filter exercises by equipment", () => {
      const filters = {
        equipment: [Equipment.DUMBBELLS],
      };

      const filteredExercises = filterExercises(filters);
      expect(filteredExercises.length).toBeGreaterThan(0);
      filteredExercises.forEach((exercise) => {
        expect(exercise.equipment).toContain(Equipment.DUMBBELLS);
      });
    });

    it("should filter exercises by both muscle and equipment", () => {
      const filters = {
        muscles: [Muscles.CHEST],
        equipment: [Equipment.DUMBBELLS],
      };

      const filteredExercises = filterExercises(filters);
      expect(filteredExercises.length).toBeGreaterThan(0);
      filteredExercises.forEach((exercise) => {
        expect(exercise.muscles).toContain(Muscles.CHEST);
        expect(exercise.equipment).toContain(Equipment.DUMBBELLS);
      });
    });

    it("should return all exercises when no filters are provided", () => {
      const filters = {};
      const filteredExercises = filterExercises(filters);
      expect(filteredExercises).toEqual(allExercises);
    });

    it("should return empty array when no exercises match filters", () => {
      const filters = {
        muscles: ["nonexistent_muscle" as Muscles],
      };
      const filteredExercises = filterExercises(filters);
      expect(filteredExercises).toHaveLength(0);
    });
  });

  describe("getFilteredRandomExercises", () => {
    it("should return the specified number of filtered exercises", () => {
      const filters = {
        muscles: [Muscles.CHEST],
        equipment: [Equipment.DUMBBELLS],
      };

      const exercises = getFilteredRandomExercises(filters, 2);
      expect(exercises).toHaveLength(2);
      exercises.forEach((exercise) => {
        expect(exercise.muscles).toContain(Muscles.CHEST);
        expect(exercise.equipment).toContain(Equipment.DUMBBELLS);
      });
    });

    it("should return different exercises on subsequent calls", () => {
      const filters = {
        muscles: [Muscles.CHEST],
      };

      const exercises1 = getFilteredRandomExercises(filters, 3);
      const exercises2 = getFilteredRandomExercises(filters, 3);

      const ids1 = exercises1.map((e) => e.id);
      const ids2 = exercises2.map((e) => e.id);

      expect(JSON.stringify(ids1)).not.toBe(JSON.stringify(ids2));
    });

    it("should return all matching exercises when count exceeds available exercises", () => {
      const filters = {
        muscles: [Muscles.CHEST],
        equipment: [Equipment.DUMBBELLS],
      };

      const allFilteredExercises = filterExercises(filters);
      const randomExercises = getFilteredRandomExercises(filters, 1000);

      expect(randomExercises).toHaveLength(allFilteredExercises.length);
    });

    it("should return empty array when no exercises match filters", () => {
      const filters = {
        muscles: ["nonexistent_muscle" as Muscles],
      };

      const exercises = getFilteredRandomExercises(filters, 3);
      expect(exercises).toHaveLength(0);
    });
  });

  describe("getExerciseById", () => {
    it("should return an exercise when given a valid ID", () => {
      // Find first exercise with a defined ID
      const exerciseWithId = allExercises.find((ex) => ex.id !== undefined);
      if (!exerciseWithId || !exerciseWithId.id) {
        // Skip test if no exercises with IDs available
        console.warn("No exercises with IDs available to test");
        return;
      }

      const validId = exerciseWithId.id;
      const exercise = getExerciseById(validId);
      expect(exercise).toBeDefined();
      expect(exercise?.id).toBe(validId);
    });

    it("should return null when given a non-existent ID", () => {
      const exercise = getExerciseById("non-existent-id");
      expect(exercise).toBeNull();
    });
  });

  describe("getExercisesForRecoveredMuscles", () => {
    const mockRecoveryStatus: MuscleRecovery[] = [
      {
        id: "chest",
        status: recovery.MuscleRecoveryStatus.RECOVERED,
        last_trained: new Date(),
        recovery_percentage: 100,
        exercise_count: 0,
      },
      {
        id: "biceps",
        status: recovery.MuscleRecoveryStatus.RECOVERING,
        last_trained: new Date(),
        recovery_percentage: 50,
        exercise_count: 0,
      },
    ];

    it("should return exercises that only target recovered muscles", async () => {
      vi.mocked(
        recovery.getMuscleRecoveryStatusForAllMuscles,
      ).mockResolvedValueOnce(mockRecoveryStatus);

      const exercises = await getExercisesForRecoveredMuscles(3);

      // Check that each returned exercise only targets recovered muscles
      exercises.forEach((exercise) => {
        exercise.muscles.forEach((muscle) => {
          const muscleStatus = mockRecoveryStatus.find((s) => s.id === muscle);
          expect(muscleStatus?.status).toBe(
            recovery.MuscleRecoveryStatus.RECOVERED,
          );
        });
      });
    });

    it("should return the specified number of exercises", async () => {
      vi.mocked(
        recovery.getMuscleRecoveryStatusForAllMuscles,
      ).mockResolvedValueOnce(mockRecoveryStatus);

      const exercises = await getExercisesForRecoveredMuscles(3);
      expect(exercises.length).toBeLessThanOrEqual(3);
    });

    it("should return different exercises on subsequent calls when enough exercises are available", async () => {
      // Mock recovery status with multiple muscles recovered
      const extendedMockRecoveryStatus: MuscleRecovery[] = [
        {
          id: "chest",
          status: recovery.MuscleRecoveryStatus.RECOVERED,
          last_trained: new Date(),
          recovery_percentage: 100,
          exercise_count: 0,
        },
        {
          id: "biceps",
          status: recovery.MuscleRecoveryStatus.RECOVERED,
          last_trained: new Date(),
          recovery_percentage: 100,
          exercise_count: 0,
        },
        {
          id: "shoulders",
          status: recovery.MuscleRecoveryStatus.RECOVERED,
          last_trained: new Date(),
          recovery_percentage: 100,
          exercise_count: 0,
        },
      ];

      vi.mocked(recovery.getMuscleRecoveryStatusForAllMuscles)
        .mockResolvedValueOnce(extendedMockRecoveryStatus)
        .mockResolvedValueOnce(extendedMockRecoveryStatus);

      // Request more exercises to increase chance of different selections
      const exercises1 = await getExercisesForRecoveredMuscles(5);
      const exercises2 = await getExercisesForRecoveredMuscles(5);

      const ids1 = exercises1.map((e) => e.id);
      const ids2 = exercises2.map((e) => e.id);

      // Only compare if we have enough exercises to potentially be different
      if (exercises1.length >= 3 && exercises2.length >= 3) {
        expect(JSON.stringify(ids1)).not.toBe(JSON.stringify(ids2));
      }
    });

    it("should return empty array when no muscles are recovered", async () => {
      const noRecoveredMockRecoveryStatus: MuscleRecovery[] = [
        {
          id: "chest",
          status: recovery.MuscleRecoveryStatus.RECOVERING,
          last_trained: new Date(),
          recovery_percentage: 50,
          exercise_count: 0,
        },
        {
          id: "biceps",
          status: recovery.MuscleRecoveryStatus.RECOVERING,
          last_trained: new Date(),
          recovery_percentage: 50,
          exercise_count: 0,
        },
      ];

      vi.mocked(
        recovery.getMuscleRecoveryStatusForAllMuscles,
      ).mockResolvedValueOnce(noRecoveredMockRecoveryStatus);

      const exercises = await getExercisesForRecoveredMuscles(3);
      expect(exercises).toHaveLength(0);
    });
  });
});
