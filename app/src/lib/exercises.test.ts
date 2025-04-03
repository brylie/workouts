import { describe, it, expect, vi } from "vitest";
import {
  allExercises,
  getExerciseById,
  getExercisesByMuscle,
  getExercisesByEquipment,
  filterExercises,
  getFilteredRandomExercisesForRecoveredMuscles,
} from "$lib/exercises";
import { Equipment } from "$lib/equipment";
import { Muscles } from "$lib/muscles";

vi.mock("$lib/recovery", () => ({
  getMuscleRecoveryStatusForAllMuscles: vi.fn(),
  MuscleRecoveryStatus: {
    RECOVERED: "RECOVERED",
    RECOVERING: "RECOVERING",
  },
}));

describe("exercises", () => {
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
});
