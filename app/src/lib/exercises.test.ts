import { describe, it, expect, vi, beforeEach } from "vitest";
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
import {
  getMuscleRecoveryStatusForAllMuscles,
  MuscleRecoveryStatus,
  type MuscleRecovery,
} from "./recovery";

vi.mock("$lib/recovery", () => ({
  getMuscleRecoveryStatusForAllMuscles: vi.fn(),
  MuscleRecoveryStatus: {
    RECOVERED: "RECOVERED",
    RECOVERING: "RECOVERING",
  },
}));

// Test fixtures for muscle recovery data
const createMuscleRecovery = (
  muscleId: string,
  status: MuscleRecoveryStatus,
  overrides: Partial<MuscleRecovery> = {},
): MuscleRecovery => ({
  id: muscleId,
  name: muscleId.charAt(0).toUpperCase() + muscleId.slice(1).toLowerCase(),
  status,
  lastTrainedDate: new Date(),
  recoveryPercentage: status === MuscleRecoveryStatus.RECOVERED ? 100 : 50,
  exerciseCount: status === MuscleRecoveryStatus.RECOVERED ? 0 : 1,
  muscleGroup:
    muscleId.includes("QUAD") || muscleId.includes("HAMSTRINGS")
      ? "Lower Body"
      : "Upper Body",
  recoveryHours: 48,
  ...overrides,
});

// Common recovery status fixtures
const createRecoveryFixtures = {
  allRecovered: () => [
    createMuscleRecovery(Muscles.CHEST, MuscleRecoveryStatus.RECOVERED),
    createMuscleRecovery(Muscles.BICEPS, MuscleRecoveryStatus.RECOVERED),
    createMuscleRecovery(Muscles.QUADRICEPS, MuscleRecoveryStatus.RECOVERED),
  ],

  mixedRecoveryStatus: () => [
    createMuscleRecovery(Muscles.CHEST, MuscleRecoveryStatus.RECOVERED),
    createMuscleRecovery(Muscles.BICEPS, MuscleRecoveryStatus.RECOVERED),
    createMuscleRecovery(Muscles.QUADRICEPS, MuscleRecoveryStatus.RECOVERING),
  ],

  noneRecovered: () => [
    createMuscleRecovery(Muscles.CHEST, MuscleRecoveryStatus.RECOVERING),
    createMuscleRecovery(Muscles.BICEPS, MuscleRecoveryStatus.RECOVERING),
    createMuscleRecovery(Muscles.QUADRICEPS, MuscleRecoveryStatus.RECOVERING),
  ],
};

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

  describe("getFilteredRandomExercisesForRecoveredMuscles", () => {
    beforeEach(() => {
      vi.resetAllMocks();
    });

    it("should return exercises that target only recovered muscles", async () => {
      // Mock recovered muscles
      vi.mocked(getMuscleRecoveryStatusForAllMuscles).mockResolvedValue(
        createRecoveryFixtures.mixedRecoveryStatus(),
      );

      const filters = {};
      const result = await getFilteredRandomExercisesForRecoveredMuscles(
        filters,
        3,
      );

      // Verify results only include exercises targeting recovered muscles
      result.forEach((exercise) => {
        // Every targeted muscle should be in the recovered set
        expect(
          exercise.muscles.every(
            (muscle) => muscle === Muscles.CHEST || muscle === Muscles.BICEPS,
          ),
        ).toBeTruthy();
      });

      expect(getMuscleRecoveryStatusForAllMuscles).toHaveBeenCalledTimes(1);
    });

    it("should apply provided filters along with recovery status", async () => {
      // Mock recovered muscles
      vi.mocked(getMuscleRecoveryStatusForAllMuscles).mockResolvedValue(
        createRecoveryFixtures.mixedRecoveryStatus(),
      );

      const filters = {
        equipment: [Equipment.DUMBBELLS],
      };

      const result = await getFilteredRandomExercisesForRecoveredMuscles(
        filters,
        3,
      );

      // Verify results match both filters and recovery status
      result.forEach((exercise) => {
        // Should only have recovered muscles
        expect(
          exercise.muscles.every(
            (muscle) => muscle === Muscles.CHEST || muscle === Muscles.BICEPS,
          ),
        ).toBeTruthy();

        // Should only use dumbbells equipment
        expect(exercise.equipment).toBeDefined();
        expect(exercise.equipment!.includes(Equipment.DUMBBELLS)).toBeTruthy();
      });
    });

    it("should return an empty array when no muscles are recovered", async () => {
      // Mock with no recovered muscles
      vi.mocked(getMuscleRecoveryStatusForAllMuscles).mockResolvedValue(
        createRecoveryFixtures.noneRecovered(),
      );

      const filters = {};
      const result = await getFilteredRandomExercisesForRecoveredMuscles(
        filters,
        3,
      );

      expect(result).toEqual([]);
    });

    it("should limit results to the specified count", async () => {
      // Mock all muscles as recovered to ensure we have enough exercises
      vi.mocked(getMuscleRecoveryStatusForAllMuscles).mockResolvedValue(
        createRecoveryFixtures.allRecovered(),
      );

      const count = 2;
      const result = await getFilteredRandomExercisesForRecoveredMuscles(
        {},
        count,
      );

      expect(result.length).toBeLessThanOrEqual(count);
    });
  });
});
