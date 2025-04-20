/**
 * Mock implementation of Supabase client for testing
 */
import { vi } from "vitest";

// Create mock functions with predefined response structure
const mockSelect = vi.fn().mockReturnThis();
const mockInsert = vi.fn().mockReturnThis();
const mockUpsert = vi.fn().mockReturnThis();
const mockDelete = vi.fn().mockReturnThis();
const mockEq = vi.fn().mockReturnThis();
const mockGte = vi.fn().mockReturnThis();
const mockLte = vi.fn().mockReturnThis();
const mockOrder = vi.fn().mockReturnThis();
const mockSingle = vi.fn().mockImplementation(() => {
  return { data: { id: 123 }, error: null };
});

// Mock auth functions
const mockSignUp = vi.fn();
const mockSignInWithPassword = vi.fn();
const mockSignInWithOAuth = vi.fn();
const mockResetPasswordForEmail = vi.fn();
const mockSignOut = vi.fn();
const mockGetSession = vi.fn().mockImplementation(() => {
  return { data: { session: null } };
});
const mockOnAuthStateChange = vi.fn();

// Mock database responses
export const mockAuthResponse = {
  success: true,
  data: { user: { id: "mock-user-id", email: "test@example.com" } },
  error: null,
};

export const mockExerciseData = {
  id: 123,
  exercise_id: "test-exercise",
  completed_at: "2025-04-20T12:00:00Z",
  user_id: "mock-user-id",
  metrics: {
    sets: 3,
    reps: 10,
    weight: 70,
    time: null,
    distance: null,
    resistance: null,
    speed: null,
    incline: null,
    resistance_type: null,
    calories: null,
    heart_rate: null,
    rpe: null,
  },
};

// Create the mock Supabase client
export const mockSupabaseClient = {
  from: vi.fn().mockImplementation(() => {
    return {
      select: mockSelect,
      insert: mockInsert,
      upsert: mockUpsert,
      delete: mockDelete,
      eq: mockEq,
      gte: mockGte,
      lte: mockLte,
      order: mockOrder,
      single: mockSingle,
    };
  }),
  auth: {
    signUp: mockSignUp,
    signInWithPassword: mockSignInWithPassword,
    signInWithOAuth: mockSignInWithOAuth,
    resetPasswordForEmail: mockResetPasswordForEmail,
    signOut: mockSignOut,
    getSession: mockGetSession,
    onAuthStateChange: mockOnAuthStateChange,
  },
};

// Reset all mocks between tests
export function resetMocks() {
  vi.clearAllMocks();

  // Reset default implementations
  mockSelect.mockReturnThis();
  mockInsert.mockReturnThis();
  mockUpsert.mockReturnThis();
  mockDelete.mockReturnThis();
  mockEq.mockReturnThis();
  mockGte.mockReturnThis();
  mockLte.mockReturnThis();
  mockOrder.mockReturnThis();
  mockSingle.mockImplementation(() => {
    return { data: { id: 123 }, error: null };
  });
}

// Helper to mock specific responses
export function mockSupabaseResponse(method: string, response: any) {
  switch (method) {
    case "select":
      mockSelect.mockImplementation(() => response);
      break;
    case "insert":
      mockInsert.mockImplementation(() => response);
      break;
    case "upsert":
      mockUpsert.mockImplementation(() => response);
      break;
    case "delete":
      mockDelete.mockImplementation(() => response);
      break;
    case "signUp":
      mockSignUp.mockImplementation(() => response);
      break;
    case "signInWithPassword":
      mockSignInWithPassword.mockImplementation(() => response);
      break;
    case "signInWithOAuth":
      mockSignInWithOAuth.mockImplementation(() => response);
      break;
    case "resetPasswordForEmail":
      mockResetPasswordForEmail.mockImplementation(() => response);
      break;
    case "signOut":
      mockSignOut.mockImplementation(() => response);
      break;
    case "getSession":
      mockGetSession.mockImplementation(() => response);
      break;
    default:
      throw new Error(`Unknown method: ${method}`);
  }
}
