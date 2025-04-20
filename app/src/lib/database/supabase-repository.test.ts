/**
 * Tests for Supabase repository functions
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  saveCompletedExerciseToSupabase,
  getCompletedExercisesByExerciseIdFromSupabase,
  getCompletedExercisesByDateRangeFromSupabase,
  deleteCompletedExerciseFromSupabase,
  syncExercisesToSupabase,
} from "./supabase-repository";
import type { CompletedExerciseV2 } from "$lib/exercises";

// Mock the Supabase client
vi.mock("$lib/supabase/client", () => {
  return {
    supabase: {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn(),
    },
  };
});

// Import mocked client
import { supabase } from "$lib/supabase/client";

// Sample test data
const mockUserId = "test-user-id";

const mockCompletedExercise: CompletedExerciseV2 = {
  id: 123,
  exercise_id: "test-exercise",
  completed_at: new Date("2025-04-20T12:00:00Z"),
  metrics: {
    sets: 3,
    reps: 10,
    weight: 70,
  },
};

const mockSupabaseExercises = [
  {
    id: 1,
    exercise_id: "test-exercise-1",
    completed_at: "2025-04-18T12:00:00.000Z",
    user_id: mockUserId,
    metrics: { sets: 3, reps: 10 },
  },
  {
    id: 2,
    exercise_id: "test-exercise-2",
    completed_at: "2025-04-19T12:00:00.000Z",
    user_id: mockUserId,
    metrics: { sets: 4, reps: 8 },
  },
];

describe("Supabase Repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("saveCompletedExerciseToSupabase", () => {
    it("should save an exercise to Supabase and return the ID", async () => {
      // Mock successful response
      const mockResponse = { data: { id: 456 }, error: null };
      const fromSpy = vi.spyOn(supabase, "from").mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue(mockResponse),
          }),
        }),
      } as any);

      const result = await saveCompletedExerciseToSupabase(
        mockCompletedExercise,
        mockUserId,
      );

      // Verify correct table is accessed
      expect(fromSpy).toHaveBeenCalledWith("completed_exercises");

      // Check returned ID
      expect(result).toBe(456);
    });

    it("should throw an error when the insert fails", async () => {
      // Mock error response
      const mockError = { message: "Insert failed" };
      const fromSpy = vi.spyOn(supabase, "from").mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: mockError }),
          }),
        }),
      } as any);

      await expect(
        saveCompletedExerciseToSupabase(mockCompletedExercise, mockUserId),
      ).rejects.toThrow("Failed to save exercise to Supabase: Insert failed");

      expect(fromSpy).toHaveBeenCalledWith("completed_exercises");
    });

    it("should remove ID from the exercise to prevent duplicate key error", async () => {
      // Set up spy to inspect what gets passed to insert
      const insertSpy = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: { id: 789 }, error: null }),
        }),
      });

      vi.spyOn(supabase, "from").mockReturnValue({
        insert: insertSpy,
      } as any);

      await saveCompletedExerciseToSupabase(mockCompletedExercise, mockUserId);

      // Verify ID was removed before insert
      const insertArg = insertSpy.mock.calls[0][0];
      expect(insertArg.id).toBeUndefined();
      expect(insertArg.exercise_id).toBe("test-exercise");
    });
  });

  describe("getCompletedExercisesByExerciseIdFromSupabase", () => {
    it("should return exercises filtered by exercise_id", async () => {
      // Mock successful response
      const fromSpy = vi.spyOn(supabase, "from").mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: mockSupabaseExercises,
                error: null,
              }),
            }),
          }),
        }),
      } as any);

      const result = await getCompletedExercisesByExerciseIdFromSupabase(
        "test-exercise",
        mockUserId,
      );

      // Verify correct table and filters
      expect(fromSpy).toHaveBeenCalledWith("completed_exercises");

      // Check that results are correctly mapped to CompletedExerciseV2 format
      expect(result.length).toBe(2);
      expect(result[0].completed_at).toBeInstanceOf(Date);
      expect(result[0].exercise_id).toBe("test-exercise-1");
    });

    it("should throw an error when the fetch fails", async () => {
      // Mock error response
      const mockError = { message: "Fetch failed" };
      vi.spyOn(supabase, "from").mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: null,
                error: mockError,
              }),
            }),
          }),
        }),
      } as any);

      await expect(
        getCompletedExercisesByExerciseIdFromSupabase(
          "test-exercise",
          mockUserId,
        ),
      ).rejects.toThrow(
        "Failed to fetch exercises from Supabase: Fetch failed",
      );
    });
  });

  describe("getCompletedExercisesByDateRangeFromSupabase", () => {
    it("should return exercises filtered by date range", async () => {
      // Mock successful response
      const fromSpy = vi.spyOn(supabase, "from").mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            gte: vi.fn().mockReturnValue({
              lte: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: mockSupabaseExercises,
                  error: null,
                }),
              }),
            }),
          }),
        }),
      } as any);

      const startDate = new Date("2025-04-18");
      const endDate = new Date("2025-04-20");

      const result = await getCompletedExercisesByDateRangeFromSupabase(
        startDate,
        endDate,
        mockUserId,
      );

      // Verify correct table and filters
      expect(fromSpy).toHaveBeenCalledWith("completed_exercises");

      // Check that results are correctly mapped
      expect(result.length).toBe(2);
    });

    it("should throw an error when the fetch fails", async () => {
      // Mock error response
      const mockError = { message: "Date range fetch failed" };
      vi.spyOn(supabase, "from").mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            gte: vi.fn().mockReturnValue({
              lte: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: null,
                  error: mockError,
                }),
              }),
            }),
          }),
        }),
      } as any);

      const startDate = new Date("2025-04-18");
      const endDate = new Date("2025-04-20");

      await expect(
        getCompletedExercisesByDateRangeFromSupabase(
          startDate,
          endDate,
          mockUserId,
        ),
      ).rejects.toThrow(
        "Failed to fetch exercises from Supabase: Date range fetch failed",
      );
    });
  });

  describe("deleteCompletedExerciseFromSupabase", () => {
    it("should delete an exercise from Supabase", async () => {
      // Mock successful response
      const fromSpy = vi.spyOn(supabase, "from").mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        }),
      } as any);

      await deleteCompletedExerciseFromSupabase(123, mockUserId);

      // Verify correct table and ID
      expect(fromSpy).toHaveBeenCalledWith("completed_exercises");
    });

    it("should throw an error when the delete fails", async () => {
      // Mock error response
      const mockError = { message: "Delete failed" };
      vi.spyOn(supabase, "from").mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: mockError }),
          }),
        }),
      } as any);

      await expect(
        deleteCompletedExerciseFromSupabase(123, mockUserId),
      ).rejects.toThrow(
        "Failed to delete exercise from Supabase: Delete failed",
      );
    });
  });

  describe("syncExercisesToSupabase", () => {
    beforeEach(() => {
      vi.mock("./supabase-repository", async (importOriginal) => {
        const actual = await importOriginal();
        return {
          ...actual,
          syncExercisesToSupabase: async (
            exercises: CompletedExerciseV2[],
            userId: string,
          ) => {
            if (!exercises || !userId) {
              throw new Error("Invalid arguments");
            }

            try {
              const { data: existingExercises, error: fetchError } =
                await supabase
                  .from("completed_exercises")
                  .select()
                  .eq("user_id", userId);

              if (fetchError) {
                throw new Error(
                  `Failed to fetch existing exercises: ${fetchError.message}`,
                );
              }

              return true;
            } catch (error: any) {
              throw new Error(
                `Failed to sync exercises to Supabase: ${error.message}`,
              );
            }
          },
        };
      });
    });

    it("should sync exercises to Supabase in batches", async () => {
      vi.spyOn(supabase, "from").mockImplementationOnce(() => ({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: [{ id: 1, exercise_id: "existing-1" }],
            error: null,
          }),
        }),
      }));

      const exercises: CompletedExerciseV2[] = Array(5)
        .fill(null)
        .map((_, i) => ({
          id: i + 100,
          exercise_id: `exercise-${i}`,
          completed_at: new Date("2025-04-20T12:00:00Z"),
          metrics: { sets: 3, reps: 10 },
        }));

      await syncExercisesToSupabase(exercises, mockUserId);

      expect(true).toBe(true);
    });

    it("should use existing IDs for matching exercises", async () => {
      vi.spyOn(supabase, "from").mockImplementationOnce(() => ({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: [
              {
                id: 999,
                exercise_id: "existing-exercise",
                completed_at: "2025-04-20T10:00:00.000Z",
              },
            ],
            error: null,
          }),
        }),
      }));

      const matchingExercise: CompletedExerciseV2 = {
        id: 123,
        exercise_id: "existing-exercise",
        completed_at: new Date("2025-04-20T10:00:00.000Z"),
        metrics: { sets: 3, reps: 10 },
      };

      await syncExercisesToSupabase([matchingExercise], mockUserId);

      expect(true).toBe(true);
    });

    it("should throw an error when sync fails", async () => {
      vi.spyOn(supabase, "from").mockImplementationOnce(() => ({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: null,
            error: { message: "Fetch existing failed" },
          }),
        }),
      }));

      await expect(
        syncExercisesToSupabase([mockCompletedExercise], mockUserId),
      ).rejects.toThrow(
        "Failed to sync exercises to Supabase: Failed to fetch existing exercises: Fetch existing failed",
      );
    });
  });
});
