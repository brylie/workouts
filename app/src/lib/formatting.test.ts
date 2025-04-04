import { describe, it, expect } from "vitest";
import { formatMuscleGroup } from "$lib/formatting";

describe("formatting utils", () => {
  describe("formatMuscleGroup", () => {
    it("should capitalize the first letter of each word", () => {
      expect(formatMuscleGroup("upper_body")).toBe("Upper Body");
      expect(formatMuscleGroup("lower_body")).toBe("Lower Body");
      expect(formatMuscleGroup("core")).toBe("Core");
    });

    it("should handle empty strings", () => {
      expect(formatMuscleGroup("")).toBe("");
    });

    it("should handle strings with multiple underscores", () => {
      expect(formatMuscleGroup("very_long_muscle_group_name")).toBe(
        "Very Long Muscle Group Name",
      );
    });
  });
});
