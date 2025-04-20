/**
 * Tests for database abstraction layer that handles both local and Supabase storage
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { CompletedExerciseV2 } from "./exercises";

// Define constants we'll need in the mocks
const MOCK_SUPABASE_ID = 999;
const mockUserId = "test-user-123";

// Mock the Supabase repositories with direct mock functions instead of constants
vi.mock("$lib/database/supabase-repository", () => ({
  saveCompletedExerciseToSupabase: vi
    .fn()
    .mockImplementation(() => Promise.resolve(MOCK_SUPABASE_ID)),
  getCompletedExercisesByExerciseIdFromSupabase: vi.fn().mockResolvedValue([]),
  getCompletedExercisesByDateRangeFromSupabase: vi.fn().mockResolvedValue([]),
  deleteCompletedExerciseFromSupabase: vi.fn().mockResolvedValue(undefined),
  syncExercisesToSupabase: vi.fn().mockResolvedValue(undefined),
}));

// Mock the authentication status
vi.mock("$lib/supabase/auth", () => ({
  getCurrentUserId: vi.fn().mockReturnValue(null),
}));

// Mock the Supabase user store
vi.mock("$lib/supabase/client", () => {
  // Create mock store with callbacks array
  let currentUser = null;
  const subscribers = [];

  return {
    user: {
      subscribe: vi.fn((callback) => {
        subscribers.push(callback);
        callback(currentUser);
        return () => {
          const index = subscribers.indexOf(callback);
          if (index !== -1) {
            subscribers.splice(index, 1);
          }
        };
      }),
      set: vi.fn((newUser) => {
        currentUser = newUser;
        subscribers.forEach((callback) => callback(currentUser));
      }),
    },
  };
});

// Import the modules AFTER mocking them
import {
  saveCompletedExercise,
  getCompletedExercisesByExerciseId,
  getCompletedExercisesByDateRange,
  deleteCompletedExercise,
  syncLocalExercisesToSupabase,
} from "./database";
import * as supabaseRepository from "$lib/database/supabase-repository";
import { getCurrentUserId } from "$lib/supabase/auth";
import { user } from "$lib/supabase/client";
import { db } from "./database"; // Import the db instance to spy on it

// Sample test data
const testExercise: CompletedExerciseV2 = {
  exercise_id: "test-exercise",
  completed_at: new Date("2025-04-20T12:00:00Z"),
  metrics: {
    sets: 3,
    reps: 10,
    weight: 70,
  },
};

const testDate = new Date("2025-04-20T12:00:00Z");

describe("Database Abstraction Layer", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Ensure consistent mock behavior for each test
    vi.mocked(
      supabaseRepository.saveCompletedExerciseToSupabase,
    ).mockResolvedValue(MOCK_SUPABASE_ID);
  });

  afterEach(() => {
    // Reset mocked authentication state
    vi.mocked(getCurrentUserId).mockReturnValue(null);
  });

  describe("saveCompletedExercise", () => {
    it("should save to Dexie when user is not authenticated", async () => {
      // Ensure auth returns null (not authenticated)
      vi.mocked(getCurrentUserId).mockReturnValue(null);

      // Spy on local db add method
      const addSpy = vi
        .spyOn(db.completedExercises, "add")
        .mockResolvedValue(123);

      const result = await saveCompletedExercise(testExercise);

      // Should call local DB and not Supabase
      expect(addSpy).toHaveBeenCalledWith(testExercise);
      expect(
        supabaseRepository.saveCompletedExerciseToSupabase,
      ).not.toHaveBeenCalled();
      expect(result).toBe(123);
    });

    it("should save to Supabase when user is authenticated", async () => {
      // Mock authenticated user
      vi.mocked(getCurrentUserId).mockReturnValue(mockUserId);

      // Spy on local db add method to make sure it's not called
      const addSpy = vi.spyOn(db.completedExercises, "add");

      const result = await saveCompletedExercise(testExercise);

      // Should call Supabase and not local DB
      expect(addSpy).not.toHaveBeenCalled();
      expect(
        supabaseRepository.saveCompletedExerciseToSupabase,
      ).toHaveBeenCalledWith(testExercise, mockUserId);
      expect(result).toBe(MOCK_SUPABASE_ID); // Use the mocked constant
    });
  });

  describe("getCompletedExercisesByExerciseId", () => {
    it("should get from Dexie when user is not authenticated", async () => {
      // Ensure auth returns null (not authenticated)
      vi.mocked(getCurrentUserId).mockReturnValue(null);

      // Spy on local db where/equals method
      const whereSpy = vi.fn().mockReturnValue({
        equals: vi.fn().mockReturnValue({
          sortBy: vi.fn().mockResolvedValue([testExercise]),
        }),
      });
      vi.spyOn(db.completedExercises, "where").mockImplementation(whereSpy);

      const result = await getCompletedExercisesByExerciseId("test-exercise");

      // Should call local DB and not Supabase
      expect(whereSpy).toHaveBeenCalledWith("exercise_id");
      expect(
        supabaseRepository.getCompletedExercisesByExerciseIdFromSupabase,
      ).not.toHaveBeenCalled();
      expect(result).toEqual([testExercise]);
    });

    it("should get from Supabase when user is authenticated", async () => {
      // Mock authenticated user
      vi.mocked(getCurrentUserId).mockReturnValue(mockUserId);

      // Mock Supabase response
      vi.mocked(
        supabaseRepository.getCompletedExercisesByExerciseIdFromSupabase,
      ).mockResolvedValue([testExercise]);

      // Spy on local db to make sure it's not called
      const whereSpy = vi.spyOn(db.completedExercises, "where");

      const result = await getCompletedExercisesByExerciseId("test-exercise");

      // Should call Supabase and not local DB
      expect(whereSpy).not.toHaveBeenCalled();
      expect(
        supabaseRepository.getCompletedExercisesByExerciseIdFromSupabase,
      ).toHaveBeenCalledWith("test-exercise", mockUserId);
      expect(result).toEqual([testExercise]);
    });
  });

  describe("getCompletedExercisesByDateRange", () => {
    it("should get from Dexie when user is not authenticated", async () => {
      // Ensure auth returns null (not authenticated)
      vi.mocked(getCurrentUserId).mockReturnValue(null);

      // Spy on local db where/between method
      const whereSpy = vi.fn().mockReturnValue({
        between: vi.fn().mockReturnValue({
          sortBy: vi.fn().mockResolvedValue([testExercise]),
        }),
      });
      vi.spyOn(db.completedExercises, "where").mockImplementation(whereSpy);

      const startDate = new Date("2025-04-18");
      const endDate = new Date("2025-04-20");

      const result = await getCompletedExercisesByDateRange(startDate, endDate);

      // Should call local DB and not Supabase
      expect(whereSpy).toHaveBeenCalledWith("completed_at");
      expect(
        supabaseRepository.getCompletedExercisesByDateRangeFromSupabase,
      ).not.toHaveBeenCalled();
      expect(result).toEqual([testExercise]);
    });

    it("should get from Supabase when user is authenticated", async () => {
      // Mock authenticated user
      vi.mocked(getCurrentUserId).mockReturnValue(mockUserId);

      // Mock Supabase response
      vi.mocked(
        supabaseRepository.getCompletedExercisesByDateRangeFromSupabase,
      ).mockResolvedValue([testExercise]);

      // Spy on local db to make sure it's not called
      const whereSpy = vi.spyOn(db.completedExercises, "where");

      const startDate = new Date("2025-04-18");
      const endDate = new Date("2025-04-20");

      const result = await getCompletedExercisesByDateRange(startDate, endDate);

      // Should call Supabase and not local DB
      expect(whereSpy).not.toHaveBeenCalled();
      expect(
        supabaseRepository.getCompletedExercisesByDateRangeFromSupabase,
      ).toHaveBeenCalledWith(startDate, endDate, mockUserId);
      expect(result).toEqual([testExercise]);
    });
  });

  describe("deleteCompletedExercise", () => {
    it("should delete from Dexie when user is not authenticated", async () => {
      // Ensure auth returns null (not authenticated)
      vi.mocked(getCurrentUserId).mockReturnValue(null);

      // Spy on local db delete method
      const deleteSpy = vi
        .spyOn(db.completedExercises, "delete")
        .mockResolvedValue(undefined);

      await deleteCompletedExercise(123);

      // Should call local DB and not Supabase
      expect(deleteSpy).toHaveBeenCalledWith(123);
      expect(
        supabaseRepository.deleteCompletedExerciseFromSupabase,
      ).not.toHaveBeenCalled();
    });

    it("should delete from Supabase when user is authenticated", async () => {
      // Mock authenticated user
      vi.mocked(getCurrentUserId).mockReturnValue(mockUserId);

      // Spy on local db delete method to make sure it's not called
      const deleteSpy = vi.spyOn(db.completedExercises, "delete");

      await deleteCompletedExercise(123);

      // Should call Supabase and not local DB
      expect(deleteSpy).not.toHaveBeenCalled();
      expect(
        supabaseRepository.deleteCompletedExerciseFromSupabase,
      ).toHaveBeenCalledWith(123, mockUserId);
    });
  });

  describe("syncLocalExercisesToSupabase", () => {
    it("should not sync when user is not authenticated", async () => {
      // Ensure auth returns null (not authenticated)
      vi.mocked(getCurrentUserId).mockReturnValue(null);

      await syncLocalExercisesToSupabase();

      // Should not call Supabase
      expect(supabaseRepository.syncExercisesToSupabase).not.toHaveBeenCalled();
    });

    it("should sync local exercises to Supabase when user is authenticated", async () => {
      // Mock authenticated user
      vi.mocked(getCurrentUserId).mockReturnValue(mockUserId);

      // Mock local exercises
      const localExercises = [testExercise];
      vi.spyOn(db.completedExercises, "toArray").mockResolvedValue(
        localExercises,
      );

      await syncLocalExercisesToSupabase();

      // Should call syncExercisesToSupabase with local exercises and user ID
      expect(supabaseRepository.syncExercisesToSupabase).toHaveBeenCalledWith(
        localExercises,
        mockUserId,
      );
    });

    it("should handle user login event and trigger sync", async () => {
      // Mock authenticated user
      vi.mocked(getCurrentUserId).mockReturnValue(mockUserId);

      // Mock local exercises
      const localExercises = [testExercise];
      vi.spyOn(db.completedExercises, "toArray").mockResolvedValue(
        localExercises,
      );

      // Simulate a user login by triggering the subscribe callback
      user.set({ id: mockUserId });

      // Wait for any promises to resolve
      await vi.waitFor(() => {
        expect(supabaseRepository.syncExercisesToSupabase).toHaveBeenCalledWith(
          localExercises,
          mockUserId,
        );
      });
    });
  });
});
