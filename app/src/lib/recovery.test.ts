import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getMuscleRecoveryStatusForAllMuscles,
  getSingleMuscleRecoveryStatus,
  calculateRecoveryPercentage,
  MuscleRecoveryStatus,
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
  const JUST_TRAINED = new Date(NOW.getTime());
  const HOURS_6_AGO = new Date(NOW.getTime() - 6 * 60 * 60 * 1000); // 6 hours ago

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
      {
        id: 3,
        exercise_id: "bicep_curls",
        completed_at: HOURS_6_AGO,
        metrics: { sets: 3, reps: 12 },
      },
      {
        id: 4,
        exercise_id: "overtraining_exercise",
        completed_at: JUST_TRAINED,
        metrics: { sets: 5, reps: 20 },
      },
    ]);

    // Mock exercise details
    vi.mocked(exercises.getExerciseById).mockImplementation((id) => {
      if (id === "pushups") {
        return {
          id: "pushups",
          title: "Push Ups",
          name: "Push Ups",
          muscles: [Muscles.CHEST, Muscles.TRICEPS],
          equipment: [],
          joints: [],
          description: "A bodyweight exercise targeting chest and triceps.",
          metrics: {
            hasSets: true,
            hasReps: true,
            hasWeight: false,
            hasTime: false,
            hasDistance: false,
            hasResistance: false,
          },
        };
      } else if (id === "squats") {
        return {
          id: "squats",
          title: "Squats",
          name: "Squats",
          muscles: [Muscles.QUADRICEPS, Muscles.GLUTES],
          equipment: [],
          joints: [],
          description: "A lower-body exercise targeting quads and glutes.",
          metrics: {
            hasSets: true,
            hasReps: true,
            hasWeight: false,
            hasTime: false,
            hasDistance: false,
            hasResistance: false,
          },
        };
      } else if (id === "bicep_curls") {
        return {
          id: "bicep_curls",
          title: "Bicep Curls",
          name: "Bicep Curls",
          muscles: [Muscles.BICEPS, Muscles.FOREARMS],
          equipment: [],
          joints: [],
          description: "An exercise targeting biceps.",
          metrics: {
            hasSets: true,
            hasReps: true,
            hasWeight: true,
            hasTime: false,
            hasDistance: false,
            hasResistance: false,
          },
        };
      } else if (id === "overtraining_exercise") {
        return {
          id: "overtraining_exercise",
          title: "Overtrained Exercise",
          name: "Overtrained Exercise",
          muscles: [Muscles.SHOULDERS], // This will be just trained (0% recovery)
          equipment: [],
          joints: [],
          description: "An exercise to test the overtrained status.",
          metrics: {
            hasSets: true,
            hasReps: true,
            hasWeight: true,
            hasTime: false,
            hasDistance: false,
            hasResistance: false,
          },
        };
      }
      return null;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("calculateRecoveryPercentage", () => {
    it("should return 100% when muscle was never trained (null lastTrainedDate)", () => {
      const result = calculateRecoveryPercentage(null, 48);
      expect(result).toBe(100);
    });

    it("should return 0% when muscle was just trained (0 hours passed)", () => {
      // Using the same current time as other tests
      const justTrained = new Date(NOW.getTime());
      const result = calculateRecoveryPercentage(justTrained, 48);
      expect(result).toBe(0);
    });

    it("should return 50% when half recovery time has passed", () => {
      // Set last training to 24 hours ago with 48 hour recovery period
      const halfRecovered = new Date(NOW.getTime() - 24 * 60 * 60 * 1000);
      const result = calculateRecoveryPercentage(halfRecovered, 48);
      expect(result).toBe(50);
    });

    it("should use default recovery hours when recoveryHours is zero or negative", () => {
      // Set last training to 12 hours ago, since default recovery is 24 hours
      // this should be 50% recovered
      const trainedRecently = new Date(NOW.getTime() - 12 * 60 * 60 * 1000);

      // Default recovery time is 24 hours, so this should be 50% recovered
      const resultWithZero = calculateRecoveryPercentage(trainedRecently, 0);
      expect(resultWithZero).toBe(50);

      // Test with negative value too
      const resultWithNegative = calculateRecoveryPercentage(
        trainedRecently,
        -5,
      );
      expect(resultWithNegative).toBe(50);
    });

    it("should return 100% when full recovery time has passed", () => {
      // Set last training to 48 hours ago with 48 hour recovery period
      const fullyRecovered = new Date(NOW.getTime() - 48 * 60 * 60 * 1000);
      const result = calculateRecoveryPercentage(fullyRecovered, 48);
      expect(result).toBe(100);
    });

    it("should return 100% when more than recovery time has passed", () => {
      // Set last training to 72 hours ago with 48 hour recovery period
      const overRecovered = new Date(NOW.getTime() - 72 * 60 * 60 * 1000);
      const result = calculateRecoveryPercentage(overRecovered, 48);
      expect(result).toBe(100); // Should cap at 100%
    });

    it("should handle shorter recovery periods correctly", () => {
      // Set last training to 12 hours ago with 24 hour recovery period
      const halfRecovered = new Date(NOW.getTime() - 12 * 60 * 60 * 1000);
      const result = calculateRecoveryPercentage(halfRecovered, 24);
      expect(result).toBe(50);
    });

    it("should handle very long recovery periods correctly", () => {
      // Set last training to 48 hours ago with 96 hour recovery period (4 days)
      const partiallyRecovered = new Date(NOW.getTime() - 48 * 60 * 60 * 1000);
      const result = calculateRecoveryPercentage(partiallyRecovered, 96);
      expect(result).toBe(50); // Should be half recovered
    });

    it("should round percentages to nearest integer", () => {
      // Set last training to 33 hours ago with 48 hour recovery period
      // This would be 68.75% recovered - should round to 69
      const partiallyRecovered = new Date(NOW.getTime() - 33 * 60 * 60 * 1000);
      const result = calculateRecoveryPercentage(partiallyRecovered, 48);
      expect(result).toBe(69);
    });
  });

  describe("getMuscleRecoveryStatus", () => {
    it("should return recovery status for all muscles", async () => {
      const result = await getMuscleRecoveryStatusForAllMuscles();

      // Should return status for all muscles in the registry
      expect(result.length).toBeGreaterThan(0);

      // Verify chest was trained 2 days ago with pushups
      const chest = result.find((m) => m.id === Muscles.CHEST);
      expect(chest).toBeDefined();
      expect(chest?.lastTrainedDate).toEqual(TWO_DAYS_AGO);

      // Verify quadriceps was trained 1 day ago with squats
      const quads = result.find((m) => m.id === Muscles.QUADRICEPS);
      expect(quads).toBeDefined();
      expect(quads?.lastTrainedDate).toEqual(ONE_DAY_AGO);

      // Verify a muscle that wasn't trained has null lastTrainedDate date
      // (Need to find a muscle not used in our test data)
      const neck = result.find((m) => m.id === Muscles.NECK);
      expect(neck).toBeDefined();
      expect(neck?.lastTrainedDate).toBeNull();
      expect(neck?.recoveryPercentage).toBe(100);
    });

    it("should validate all MuscleRecovery interface fields are present", async () => {
      const result = await getMuscleRecoveryStatusForAllMuscles();

      // Check first result has all expected fields
      expect(result.length).toBeGreaterThan(0);
      const firstMuscle = result[0];

      // Check all interface properties exist
      expect(firstMuscle).toHaveProperty("id");
      expect(firstMuscle).toHaveProperty("name");
      expect(firstMuscle).toHaveProperty("muscleGroup");
      expect(firstMuscle).toHaveProperty("status");
      expect(firstMuscle).toHaveProperty("lastTrainedDate");
      expect(firstMuscle).toHaveProperty("recoveryHours");
      expect(firstMuscle).toHaveProperty("recoveryPercentage");
      expect(firstMuscle).toHaveProperty("exerciseCount");

      // Check types of properties
      expect(typeof firstMuscle.id).toBe("string");
      expect(typeof firstMuscle.name).toBe("string");
      expect(typeof firstMuscle.muscleGroup).toBe("string");
      expect(Object.values(MuscleRecoveryStatus)).toContain(firstMuscle.status);
      expect(typeof firstMuscle.recoveryHours).toBe("number");
      expect(typeof firstMuscle.recoveryPercentage).toBe("number");
      expect(typeof firstMuscle.exerciseCount).toBe("number");

      // lastTrainedDate can be Date or null
      expect(
        firstMuscle.lastTrainedDate === null ||
          firstMuscle.lastTrainedDate instanceof Date,
      ).toBe(true);
    });

    it("should calculate correct recovery percentages based on recovery hours", async () => {
      const result = await getMuscleRecoveryStatusForAllMuscles();

      // Chest has 48 hour recovery and was trained 2 days (48 hours) ago
      const chest = result.find((m) => m.id === Muscles.CHEST);
      expect(chest?.recoveryPercentage).toBe(100); // 100% recovered

      // Quads have 48 hour recovery and were trained 1 day (24 hours) ago
      const quads = result.find((m) => m.id === Muscles.QUADRICEPS);
      expect(quads?.recoveryPercentage).toBe(50); // 50% recovered
    });

    it("should respect the lookbackDays parameter", async () => {
      // Test with 1-day lookback
      await getMuscleRecoveryStatusForAllMuscles(1);

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
      expect(result?.lastTrainedDate).toEqual(TWO_DAYS_AGO);

      // Verify all fields in the MuscleRecovery interface are present
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("muscleGroup");
      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("recoveryHours");
      expect(result).toHaveProperty("recoveryPercentage");
      expect(result).toHaveProperty("exerciseCount");
    });

    it("should return null for an invalid muscle ID", async () => {
      // @ts-expect-error - Testing with invalid ID
      const result = await getSingleMuscleRecoveryStatus("invalid_id");

      expect(result).toBeNull();
    });
  });

  describe("Recovery status determination", () => {
    it("should correctly categorize recovery status based on exercise count", async () => {
      const results = await getMuscleRecoveryStatusForAllMuscles();

      // Chest (trained once 2 days ago) should be RECOVERED (100%)
      const chest = results.find((m) => m.id === Muscles.CHEST);
      expect(chest).toBeDefined();
      expect(chest?.recoveryPercentage).toBe(100);
      expect(chest?.exerciseCount).toBe(1);
      expect(chest?.status).toBe(MuscleRecoveryStatus.RECOVERED);
      expect(chest?.muscleGroup).toBeTruthy();
      expect(chest?.recoveryHours).toBeGreaterThan(0);

      // Quads (trained once 1 day ago, 48h recovery) should be RECOVERING (50%)
      const quads = results.find((m) => m.id === Muscles.QUADRICEPS);
      expect(quads).toBeDefined();
      expect(quads?.recoveryPercentage).toBe(50);
      expect(quads?.exerciseCount).toBe(1);
      expect(quads?.status).toBe(MuscleRecoveryStatus.RECOVERING);
      expect(quads?.muscleGroup).toBeTruthy();
      expect(quads?.recoveryHours).toBeGreaterThan(0);

      // Biceps (trained once 6 hours ago, 48h recovery) should be RECOVERING
      const biceps = results.find((m) => m.id === Muscles.BICEPS);
      expect(biceps).toBeDefined();
      expect(biceps?.recoveryPercentage).toBeLessThan(25);
      expect(biceps?.recoveryPercentage).toBeGreaterThan(0);
      expect(biceps?.exerciseCount).toBe(1);
      expect(biceps?.status).toBe(MuscleRecoveryStatus.RECOVERING);
      expect(biceps?.muscleGroup).toBeTruthy();
      expect(biceps?.recoveryHours).toBeGreaterThan(0);
    });

    it("should mark untrained muscles as RECOVERED with zero exercise count", async () => {
      const results = await getMuscleRecoveryStatusForAllMuscles();

      // Find a muscle that wasn't trained in our mock data
      const untrained = results.find(
        (m) =>
          m.id !== Muscles.CHEST &&
          m.id !== Muscles.TRICEPS &&
          m.id !== Muscles.QUADRICEPS &&
          m.id !== Muscles.GLUTES &&
          m.id !== Muscles.BICEPS &&
          m.id !== Muscles.FOREARMS &&
          m.id !== Muscles.SHOULDERS,
      );

      expect(untrained).toBeDefined();
      expect(untrained?.recoveryPercentage).toBe(100);
      expect(untrained?.exerciseCount).toBe(0);
      expect(untrained?.status).toBe(MuscleRecoveryStatus.RECOVERED);
    });

    it("should mark muscles as OVERTRAINED when exercised twice in recovery period", async () => {
      const mockData = [
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
        {
          id: 3,
          exercise_id: "shoulder_press",
          completed_at: ONE_DAY_AGO,
          metrics: { sets: 3, reps: 12 },
        },
        {
          id: 4,
          exercise_id: "overtraining_exercise",
          completed_at: JUST_TRAINED,
          metrics: { sets: 5, reps: 20 },
        },
      ];

      vi.mocked(
        database.getCompletedExercisesByDateRange,
      ).mockResolvedValueOnce(mockData);

      // Update the exercise mock with a proper implementation that won't cause recursion
      vi.mocked(exercises.getExerciseById).mockImplementation((id) => {
        if (id === "shoulder_press") {
          return {
            id: "shoulder_press",
            title: "Shoulder Press",
            name: "Shoulder Press",
            muscles: [Muscles.SHOULDERS],
            equipment: [],
            joints: [],
            description: "A shoulder exercise.",
            metrics: {
              hasSets: true,
              hasReps: true,
              hasWeight: true,
              hasTime: false,
              hasDistance: false,
              hasResistance: false,
            },
          };
        } else if (id === "pushups") {
          return {
            id: "pushups",
            title: "Push Ups",
            name: "Push Ups",
            muscles: [Muscles.CHEST, Muscles.TRICEPS],
            equipment: [],
            joints: [],
            description: "A bodyweight exercise targeting chest and triceps.",
            metrics: {
              hasSets: true,
              hasReps: true,
              hasWeight: false,
              hasTime: false,
              hasDistance: false,
              hasResistance: false,
            },
          };
        } else if (id === "squats") {
          return {
            id: "squats",
            title: "Squats",
            name: "Squats",
            muscles: [Muscles.QUADRICEPS, Muscles.GLUTES],
            equipment: [],
            joints: [],
            description: "A lower-body exercise targeting quads and glutes.",
            metrics: {
              hasSets: true,
              hasReps: true,
              hasWeight: false,
              hasTime: false,
              hasDistance: false,
              hasResistance: false,
            },
          };
        } else if (id === "overtraining_exercise") {
          return {
            id: "overtraining_exercise",
            title: "Overtrained Exercise",
            name: "Overtrained Exercise",
            muscles: [Muscles.SHOULDERS],
            equipment: [],
            joints: [],
            description: "An exercise to test the overtrained status.",
            metrics: {
              hasSets: true,
              hasReps: true,
              hasWeight: true,
              hasTime: false,
              hasDistance: false,
              hasResistance: false,
            },
          };
        }
        return null;
      });

      const results = await getMuscleRecoveryStatusForAllMuscles();

      // Shoulders should have two exercises and be marked as OVERTRAINED
      const shoulders = results.find((m) => m.id === Muscles.SHOULDERS);
      expect(shoulders).toBeDefined();
      expect(shoulders?.exerciseCount).toBe(2);
      expect(shoulders?.status).toBe(MuscleRecoveryStatus.OVERTRAINED);
    });
  });
});
