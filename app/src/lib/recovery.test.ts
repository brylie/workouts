import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getMuscleRecoveryStatus,
  getSingleMuscleRecoveryStatus,
} from "$lib/recovery";
import * as database from "$lib/database";
import * as exercises from "$lib/exercises";
import { Muscles } from "$lib/muscles";

// Mock dependencies
vi.mock("$lib/database", () => ({
  getCompletedExercisesByDateRange: vi.fn(),
}));

vi.mock("$lib/exercises", () => ({
  getExerciseById: vi.fn(),
}));

describe("Recovery module", () => {
  // Set up a consistent current date for testing
  const NOW = new Date("2025-04-02T12:00:00Z");
  const ONE_DAY_AGO = new Date("2025-04-01T12:00:00Z");
  const TWO_DAYS_AGO = new Date("2025-03-31T12:00:00Z");
  const THREE_DAYS_AGO = new Date("2025-03-30T12:00:00Z");

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock the current date
    vi.useFakeTimers();
    vi.setSystemTime(NOW);

    // Set up basic mock data
    vi.mocked(database.getCompletedExercisesByDateRange).mockResolvedValue([
      {
        id: 1,
        exercise_id: "pushups",
        completed_at: TWO_DAYS_AGO,
        metrics: { sets: 3, reps: 10 },
      },
      {
        id: 2,
        exercise_id: "squats",
        completed_at: ONE_DAY_AGO,
        metrics: { sets: 3, reps: 15 },
      },
    ]);

    // Mock exercise details
    vi.mocked(exercises.getExerciseById).mockImplementation((id) => {
      if (id === "pushups") {
        return {
          id: "pushups",
          name: "Push Ups",
          muscles: [Muscles.CHEST, Muscles.TRICEPS],
          equipment: [],
          joints: [],
        };
      } else if (id === "squats") {
        return {
          id: "squats",
          name: "Squats",
          muscles: [Muscles.QUADRICEPS, Muscles.GLUTES],
          equipment: [],
          joints: [],
        };
      }
      return null;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("getMuscleRecoveryStatus", () => {
    it("should return recovery status for all muscles", async () => {
      const result = await getMuscleRecoveryStatus();

      // Should return status for all muscles in the registry
      expect(result.length).toBeGreaterThan(0);

      // Verify chest was trained 2 days ago with pushups
      const chest = result.find((m) => m.id === Muscles.CHEST);
      expect(chest).toBeDefined();
      expect(chest?.last_trained).toEqual(TWO_DAYS_AGO);

      // Verify quadriceps was trained 1 day ago with squats
      const quads = result.find((m) => m.id === Muscles.QUADRICEPS);
      expect(quads).toBeDefined();
      expect(quads?.last_trained).toEqual(ONE_DAY_AGO);

      // Verify biceps was not trained (no exercises that target biceps)
      const biceps = result.find((m) => m.id === Muscles.BICEPS);
      expect(biceps).toBeDefined();
      expect(biceps?.last_trained).toBeNull();
      expect(biceps?.recovery_percentage).toBe(100);
    });

    it("should calculate correct recovery percentages based on recovery hours", async () => {
      const result = await getMuscleRecoveryStatus();

      // Chest has 48 hour recovery and was trained 2 days (48 hours) ago
      const chest = result.find((m) => m.id === Muscles.CHEST);
      expect(chest?.recovery_percentage).toBe(100); // 100% recovered

      // Quads have 48 hour recovery and were trained 1 day (24 hours) ago
      const quads = result.find((m) => m.id === Muscles.QUADRICEPS);
      expect(quads?.recovery_percentage).toBe(50); // 50% recovered
    });

    it("should respect the lookbackDays parameter", async () => {
      // Test with 1-day lookback
      await getMuscleRecoveryStatus(1);

      // Verify that we only looked back 1 day
      expect(database.getCompletedExercisesByDateRange).toHaveBeenCalledWith(
        expect.any(Date),
        expect.any(Date),
      );

      const [startDate] = vi.mocked(database.getCompletedExercisesByDateRange)
        .mock.calls[0];
      const expectedStartDate = new Date(NOW);
      expectedStartDate.setDate(expectedStartDate.getDate() - 1);

      // Check the dates are within the same hour (avoiding ms comparison issues)
      expect(startDate.getFullYear()).toBe(expectedStartDate.getFullYear());
      expect(startDate.getMonth()).toBe(expectedStartDate.getMonth());
      expect(startDate.getDate()).toBe(expectedStartDate.getDate());
    });
  });

  describe("getSingleMuscleRecoveryStatus", () => {
    it("should return recovery status for a specific muscle", async () => {
      const result = await getSingleMuscleRecoveryStatus(Muscles.CHEST);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(Muscles.CHEST);
      expect(result?.last_trained).toEqual(TWO_DAYS_AGO);
    });

    it("should return null for an invalid muscle ID", async () => {
      // @ts-expect-error - Testing with invalid ID
      const result = await getSingleMuscleRecoveryStatus("invalid_id");

      expect(result).toBeNull();
    });
  });
});
