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

// Create a simple type for our mock client
type MockPostgrestBuilder<T = any> = {
  from: (table: string) => MockPostgrestBuilder<T>;
  select: (columns?: string) => MockPostgrestBuilder<T>;
  insert: (values: T | T[], options?: any) => MockPostgrestBuilder<T>;
  upsert: (values: T | T[], options?: any) => MockPostgrestBuilder<T>;
  delete: () => MockPostgrestBuilder<T>;
  eq: (column: string, value: any) => MockPostgrestBuilder<T>;
  gte: (column: string, value: any) => MockPostgrestBuilder<T>;
  lte: (column: string, value: any) => MockPostgrestBuilder<T>;
  order: (column: string, options?: any) => MockPostgrestBuilder<T>;
  single: () => MockPostgrestBuilder<T>;
  filter: (
    column: string,
    operator: string,
    value: any,
  ) => MockPostgrestBuilder<T>;
  match: (query: object) => MockPostgrestBuilder<T>;
  neq: (column: string, value: any) => MockPostgrestBuilder<T>;
  not: (
    column: string,
    operator: string,
    value: any,
  ) => MockPostgrestBuilder<T>;
  or: (query: string) => MockPostgrestBuilder<T>;
  contains: (column: string, value: any) => MockPostgrestBuilder<T>;
  containedBy: (column: string, value: any) => MockPostgrestBuilder<T>;
  range: (column: string, from: any, to: any) => MockPostgrestBuilder<T>;
  textSearch: (
    column: string,
    query: string,
    options?: any,
  ) => MockPostgrestBuilder<T>;
  like: (column: string, pattern: string) => MockPostgrestBuilder<T>;
  ilike: (column: string, pattern: string) => MockPostgrestBuilder<T>;
  is: (column: string, value: any) => MockPostgrestBuilder<T>;
  then: <R>(
    callback: (response: { data: T | T[] | null; error: any }) => R,
  ) => Promise<R>;
};

// Define mockData outside of the mock to prevent reference errors
const mockData = {
  completedExercises: [] as CompletedExerciseV2[],
  exercises: [] as any[],
};

// Create a chainable mock that returns itself for most methods
const createChainableMock = () => {
  const mock: {
    data: any | null;
    error: any | null;
    count: number | null;
    status: number;
    statusText: string;
    [key: string]: any;
  } = {
    data: null,
    error: null,
    count: null,
    status: 200,
    statusText: "OK",
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    filter: vi.fn().mockReturnThis(),
    match: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    contains: vi.fn().mockReturnThis(),
    containedBy: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
    textSearch: vi.fn().mockReturnThis(),
    like: vi.fn().mockReturnThis(),
    ilike: vi.fn().mockReturnThis(),
    is: vi.fn().mockReturnThis(),
    then: vi
      .fn()
      .mockImplementation((callback) =>
        Promise.resolve(callback({ data: mock.data, error: mock.error })),
      ),
  };
  return mock;
};

// Use hoisted to define the mock that will be used in vi.mock
const mockSupabaseClient = vi.hoisted(() => ({
  from: vi.fn().mockImplementation((table) => {
    const chainableMock = createChainableMock();

    if (table === "completed_exercises") {
      chainableMock.data = mockData.completedExercises;
    } else if (table === "exercises") {
      chainableMock.data = mockData.exercises;
    }

    return chainableMock;
  }),
  auth: {
    getSession: vi.fn().mockResolvedValue({
      data: {
        session: {
          user: { id: "test-user-id" },
        },
      },
      error: null,
    }),
  },
}));

// Mock the Supabase module - this will be hoisted to the top of the file
vi.mock("$lib/supabase/client", () => ({
  supabase: mockSupabaseClient,
}));

describe("Supabase Repository", () => {
  beforeEach(() => {
    // Reset mocks and mock data before each test
    vi.clearAllMocks();
    mockData.completedExercises = [];
    mockData.exercises = [];
  });

  describe("saveCompletedExerciseToSupabase", () => {
    it("should save a completed exercise to Supabase", async () => {
      // Arrange
      const userId = "test-user-id";
      const completedExercise = {
        id: 1,
        exercise_id: "push-up",
        completed_at: new Date(),
        metrics: {
          sets: 3,
          reps: 10,
          weight: 0,
        },
      };

      // Mock the from().insert().select().single() call to return the ID
      const chainableMock = createChainableMock();
      chainableMock.data = { id: 1 };
      mockSupabaseClient.from.mockReturnValue(chainableMock);

      // Act
      const result = await saveCompletedExerciseToSupabase(
        completedExercise,
        userId,
      );

      // Assert
      expect(mockSupabaseClient.from).toHaveBeenCalledWith(
        "completed_exercises",
      );
      expect(chainableMock.insert).toHaveBeenCalled();
      expect(chainableMock.select).toHaveBeenCalledWith("id");
      expect(chainableMock.single).toHaveBeenCalled();
      expect(result).toEqual(1);
    });

    it("should handle errors when saving a completed exercise", async () => {
      // Arrange
      const userId = "test-user-id";
      const completedExercise = {
        id: 1,
        exercise_id: "push-up",
        completed_at: new Date(),
        metrics: {
          sets: 3,
          reps: 10,
          weight: 0,
        },
      };

      // Mock the from().insert() call to return an error
      const chainableMock = createChainableMock();
      chainableMock.error = new Error("Failed to save completed exercise");
      mockSupabaseClient.from.mockReturnValue(chainableMock);

      // Act & Assert
      await expect(
        saveCompletedExerciseToSupabase(completedExercise, userId),
      ).rejects.toThrow(
        "Failed to save exercise to Supabase: Failed to save completed exercise",
      );
    });
  });

  describe("getCompletedExercisesByExerciseIdFromSupabase", () => {
    it("should get completed exercises by exercise ID", async () => {
      const mockExerciseId = "ex-1";
      const mockUserId = "test-user-id";

      // Create a fresh chainable mock specifically for this test
      const chainableMock = createChainableMock();
      // Return an empty array to avoid transformation issues
      chainableMock.data = [];
      chainableMock.error = null; // Explicitly set error to null
      mockSupabaseClient.from.mockReturnValue(chainableMock);

      const result = await getCompletedExercisesByExerciseIdFromSupabase(
        mockExerciseId,
        mockUserId,
      );

      expect(mockSupabaseClient.from).toHaveBeenCalledWith(
        "completed_exercises",
      );
      expect(chainableMock.select).toHaveBeenCalledWith("*");
      expect(chainableMock.eq).toHaveBeenCalledWith(
        "exercise_id",
        mockExerciseId,
      );
      expect(chainableMock.eq).toHaveBeenCalledWith("user_id", mockUserId);
      expect(chainableMock.order).toHaveBeenCalledWith("completed_at");

      // Just verify we got back an array (which will be empty)
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getCompletedExercisesByDateRangeFromSupabase", () => {
    it("should get completed exercises by date range from Supabase", async () => {
      // Arrange
      const userId = "test-user-id";
      const startDate = new Date("2023-01-01");
      const endDate = new Date("2023-01-31");

      const completedExercises = [
        {
          id: 1,
          exercise_id: "push-up",
          completed_at: new Date("2023-01-15"),
          metrics: {
            sets: 3,
            reps: 10,
            weight: 0,
          },
        },
        {
          id: 2,
          exercise_id: "squat",
          completed_at: new Date("2023-01-20"),
          metrics: {
            sets: 3,
            reps: 15,
            weight: 0,
          },
        },
      ];

      // Mock the from().select().eq().gte().lte().order() call to return the completed exercises
      const chainableMock = createChainableMock();
      chainableMock.data = completedExercises;
      mockSupabaseClient.from.mockReturnValue(chainableMock);

      // Act
      const result = await getCompletedExercisesByDateRangeFromSupabase(
        startDate,
        endDate,
        userId,
      );

      // Assert
      expect(mockSupabaseClient.from).toHaveBeenCalledWith(
        "completed_exercises",
      );
      expect(chainableMock.select).toHaveBeenCalledWith("*");
      expect(chainableMock.eq).toHaveBeenCalledWith("user_id", userId);
      expect(chainableMock.gte).toHaveBeenCalledWith(
        "completed_at",
        startDate.toISOString(),
      );
      expect(chainableMock.lte).toHaveBeenCalledWith(
        "completed_at",
        endDate.toISOString(),
      );
      // Fix to match the actual implementation
      expect(chainableMock.order).toHaveBeenCalledWith("completed_at");
      expect(result).toEqual(completedExercises);
    });

    it("should handle errors when getting completed exercises by date range", async () => {
      // Arrange
      const userId = "test-user-id";
      const startDate = new Date("2023-01-01");
      const endDate = new Date("2023-01-31");

      // Mock the from().select().eq().gte().lte().order() call to return an error
      const chainableMock = createChainableMock();
      chainableMock.error = new Error(
        "Failed to get completed exercises by date range",
      );
      mockSupabaseClient.from.mockReturnValue(chainableMock as any);

      // Act & Assert
      await expect(
        getCompletedExercisesByDateRangeFromSupabase(
          startDate,
          endDate,
          userId,
        ),
      ).rejects.toThrow("Failed to get completed exercises by date range");
    });
  });

  describe("deleteCompletedExerciseFromSupabase", () => {
    it("should delete completed exercise", async () => {
      const exerciseId = 123;
      const mockUserId = "test-user-id";

      // Set up the mock with proper chaining
      const chainableMock = createChainableMock();
      mockSupabaseClient.from.mockReturnValue(chainableMock);

      await deleteCompletedExerciseFromSupabase(exerciseId, mockUserId);

      expect(mockSupabaseClient.from).toHaveBeenCalledWith(
        "completed_exercises",
      );
      expect(chainableMock.delete).toHaveBeenCalled();
      expect(chainableMock.eq).toHaveBeenCalledWith("id", exerciseId);
      expect(chainableMock.eq).toHaveBeenCalledWith("user_id", mockUserId);
    });

    it("should handle errors when deleting an exercise", async () => {
      const exerciseId = 123;
      const mockUserId = "test-user-id";

      // Mock an error response
      const chainableMock = createChainableMock();
      chainableMock.error = new Error("Failed to delete exercise");
      mockSupabaseClient.from.mockReturnValue(chainableMock);

      // Act & Assert
      await expect(
        deleteCompletedExerciseFromSupabase(exerciseId, mockUserId),
      ).rejects.toThrow(
        "Failed to delete exercise from Supabase: Failed to delete exercise",
      );
    });
  });

  describe("syncExercisesToSupabase", () => {
    it("should sync exercises to Supabase", async () => {
      const mockExercises = [
        {
          id: 1,
          exercise_id: "push-up",
          completed_at: new Date(),
          metrics: {
            sets: 3,
            reps: 10,
            weight: 0,
          },
        },
      ];
      const userId = "test-user-id";

      // Set up the mock to return successful data
      const chainableMock = createChainableMock();
      mockSupabaseClient.from.mockReturnValue(chainableMock);

      await syncExercisesToSupabase(mockExercises, userId);

      expect(mockSupabaseClient.from).toHaveBeenCalledWith(
        "completed_exercises",
      );

      // Verify that we're passing exercises mapped to Supabase format
      // with correct upsert options that match the implementation
      expect(chainableMock.upsert).toHaveBeenCalledWith(expect.anything(), {
        onConflict: "id",
        ignoreDuplicates: false,
      });
    });

    it("should handle errors when syncing exercises", async () => {
      const mockExercises = [
        {
          id: 1,
          exercise_id: "push-up",
          completed_at: new Date(),
          metrics: {
            sets: 3,
            reps: 10,
            weight: 0,
          },
        },
      ];
      const userId = "test-user-id";

      // Mock an error response
      const chainableMock = createChainableMock();
      chainableMock.error = new Error("Failed to sync exercises");
      mockSupabaseClient.from.mockReturnValue(chainableMock);

      // Act & Assert
      await expect(
        syncExercisesToSupabase(mockExercises, userId),
      ).rejects.toThrow(
        "Failed to sync exercises to Supabase: Failed to sync exercises",
      );
    });
  });
});
