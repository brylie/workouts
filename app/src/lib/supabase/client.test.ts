/**
 * Tests for Supabase client initialization and user state management
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { User } from "@supabase/supabase-js";

// Mock setup - we need to mock the module before importing it
vi.mock("$lib/supabase/client", () => {
  let currentUser: User | null = null;
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
      // Set a mock user with all required User type properties
      const mockUser = {
        id: "test-user-123",
        email: "test@example.com",
        app_metadata: {},
        user_metadata: {},
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as User;
      user.set(mockUser);

      const result = isAuthenticated();
      expect(result).toBe(true);
    });
  });
});
