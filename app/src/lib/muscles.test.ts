import { describe, expect, it } from "vitest";
import {
  Muscles,
  getMuscleDetails,
  getMuscleDetailsForTypes,
  musclesRegistry,
  musclesList,
} from "./muscles";

describe("muscles", () => {
  describe("getMuscleDetails", () => {
    // First add a specific test to verify the registry itself is correct
    it("should have correct properties for all muscle types in registry", () => {
      Object.entries(musclesRegistry).forEach(([muscleKey, muscle]) => {
        console.log(`Checking muscle: ${muscleKey}`, muscle);
        expect(muscle).toHaveProperty("id");
        expect(muscle).toHaveProperty("name");
        expect(muscle).toHaveProperty("recovery_hours");
        expect(muscle).toHaveProperty("muscle_group");
        expect(typeof muscle.recovery_hours).toBe("number");
      });
    });

    it("should return correct details for a muscle", () => {
      const details = getMuscleDetails(Muscles.BICEPS);
      expect(details).toEqual({
        id: Muscles.BICEPS,
        name: "Biceps",
        recovery_hours: 48,
        muscle_group: "upper_body",
      });
    });

    it("should return details for all muscle types", () => {
      // First log all muscle types for debugging
      console.log("All muscle types:", Object.values(Muscles));
      console.log("Registry keys:", Object.keys(musclesRegistry));

      Object.values(Muscles).forEach((muscleType) => {
        const details = getMuscleDetails(muscleType);

        // More detailed debugging before assertions
        console.log(`Testing muscle type: ${muscleType}`, {
          details,
          hasDetails: !!details,
          recoveryHours: details?.recovery_hours,
          typeOfRecoveryHours: details ? typeof details.recovery_hours : "N/A",
        });

        try {
          expect(details).toBeDefined();
          expect(details.id).toBe(muscleType);
          expect(details.name).toBeTruthy();
          expect(details.recovery_hours).toBeGreaterThan(0);
        } catch (error) {
          console.error(`Test failed for muscle: ${muscleType}`, {
            details,
            muscleType,
            isInRegistry: muscleType in musclesRegistry,
            registryValue: musclesRegistry[muscleType],
          });
          throw error;
        }
      });
    });

    it("should verify all enum values are in registry", () => {
      const enumMuscles = new Set(Object.values(Muscles));
      const registryKeys = new Set(Object.keys(musclesRegistry));

      // Convert both sets to arrays for easier debugging
      const missingInRegistry = [...enumMuscles].filter(
        (m) => !registryKeys.has(m),
      );
      const extraInRegistry = [...registryKeys].filter(
        (k) => !enumMuscles.has(k as Muscles),
      );

      expect(missingInRegistry).toEqual([]);
      expect(extraInRegistry).toEqual([]);
    });
  });

  describe("getMuscleDetailsForTypes", () => {
    it("should return details for multiple muscles", () => {
      const muscles = [Muscles.BICEPS, Muscles.TRICEPS, Muscles.CHEST];
      const details = getMuscleDetailsForTypes(muscles);

      expect(details).toHaveLength(3);
      expect(details).toEqual([
        {
          id: Muscles.BICEPS,
          name: "Biceps",
          recovery_hours: 48,
          muscle_group: "upper_body",
        },
        {
          id: Muscles.TRICEPS,
          name: "Triceps",
          recovery_hours: 48,
          muscle_group: "upper_body",
        },
        {
          id: Muscles.CHEST,
          name: "Chest",
          recovery_hours: 48,
          muscle_group: "upper_body",
        },
      ]);
    });

    it("should return empty array for empty input", () => {
      const details = getMuscleDetailsForTypes([]);
      expect(details).toEqual([]);
    });
  });

  describe("musclesList", () => {
    it("should contain all muscles from registry", () => {
      expect(musclesList).toHaveLength(Object.keys(musclesRegistry).length);

      musclesList.forEach((muscle) => {
        expect(musclesRegistry[muscle.id]).toEqual(muscle);
      });
    });

    it("should have unique muscle ids", () => {
      const ids = musclesList.map((muscle) => muscle.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids).toHaveLength(uniqueIds.length);
    });
  });
});

describe("Muscles enum", () => {
  it("should contain the expected muscle groups", () => {
    expect(Muscles.ABDOMINALS).toBe("abdominals");
    expect(Muscles.OBLIQUES).toBe("obliques");
    expect(Muscles.LATS).toBe("lats");
    expect(Muscles.BICEPS).toBe("biceps");
    expect(Muscles.CHEST).toBe("chest");
    expect(Muscles.GLUTES).toBe("glutes");
    expect(Muscles.HAMSTRINGS).toBe("hamstrings");
    expect(Muscles.QUADRICEPS).toBe("quadriceps");
    expect(Muscles.SHOULDERS).toBe("shoulders");
    expect(Muscles.TRICEPS).toBe("triceps");
    expect(Muscles.LOWER_BACK).toBe("lower_back");
    expect(Muscles.CALVES).toBe("calves");
    expect(Muscles.TRAPEZIUS).toBe("trapezius");
    expect(Muscles.ABDUCTORS).toBe("abductors");
    expect(Muscles.ADDUCTORS).toBe("adductors");
    expect(Muscles.FOREARMS).toBe("forearms");
    expect(Muscles.NECK).toBe("neck");
    expect(Muscles.UPPER_BACK).toBe("upper_back");
  });
});
