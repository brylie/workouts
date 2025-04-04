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
    it("should return correct details for a muscle", () => {
      const details = getMuscleDetails(Muscles.BICEPS);
      expect(details).toEqual({
        id: Muscles.BICEPS,
        name: "Biceps",
        recoveryHours: 48,
        muscleGroup: "upper_body",
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
          recoveryHours: 48,
          muscleGroup: "upper_body",
        },
        {
          id: Muscles.TRICEPS,
          name: "Triceps",
          recoveryHours: 48,
          muscleGroup: "upper_body",
        },
        {
          id: Muscles.CHEST,
          name: "Chest",
          recoveryHours: 48,
          muscleGroup: "upper_body",
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
