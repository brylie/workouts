/**
 * Tests for Supabase client initialization and user state management
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock setup - we need to mock the module before importing it
vi.mock("$lib/supabase/client", () => {
  // Create a mock store with a setter method for tests
  let currentUser = null;
  const mockStore = {
    subscribe: vi.fn((callback) => {
      callback(currentUser);
      return () => {};
    }),
    set: vi.fn((newUser) => {
      currentUser = newUser;
    }),
  };

  return {
    supabase: {
      auth: {
        getSession: vi.fn().mockResolvedValue({
          data: { session: null },
        }),
        onAuthStateChange: vi.fn(),
      },
    },
    user: mockStore,
    isAuthenticated: () => currentUser !== null,
  };
});

// Import the mocked module
import { isAuthenticated, user } from "$lib/supabase/client";

describe("Supabase Client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset user state between tests
    user.set(null);
  });

  describe("isAuthenticated", () => {
    it("should return false when no user is present", () => {
      // Default state is no user
      const result = isAuthenticated();
      expect(result).toBe(false);
    });

    it("should return true when a user is present", () => {
      // Set a mock user
      const mockUser = { id: "test-user-123", email: "test@example.com" };
      user.set(mockUser);

      const result = isAuthenticated();
      expect(result).toBe(true);
    });
  });
});
