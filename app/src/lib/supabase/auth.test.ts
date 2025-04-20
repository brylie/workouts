/**
 * Tests for Supabase authentication functions
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  registerWithEmail,
  loginWithEmail,
  loginWithOAuth,
  resetPassword,
  logout,
  getCurrentUserId,
} from "./auth";
import { supabase, user } from "./client";
import type { User } from "@supabase/supabase-js";

// Mock the Supabase client
vi.mock("./client", () => {
  const writable = vi.fn(() => {
    const subscribers: ((value: User | null) => void)[] = [];
    let value: User | null = null;

    return {
      subscribe: vi.fn((callback) => {
        subscribers.push(callback);
        callback(value);
        return () => {
          const index = subscribers.indexOf(callback);
          if (index !== -1) subscribers.splice(index, 1);
        };
      }),
      set: vi.fn((newValue) => {
        value = newValue;
        subscribers.forEach((callback) => callback(value));
      }),
    };
  });

  return {
    supabase: {
      auth: {
        signUp: vi.fn(),
        signInWithPassword: vi.fn(),
        signInWithOAuth: vi.fn(),
        resetPasswordForEmail: vi.fn(),
        signOut: vi.fn(),
        getSession: vi.fn(),
      },
    },
    user: writable(),
    writable,
  };
});

describe("Supabase Auth Module", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("registerWithEmail", () => {
    it("should register a user successfully", async () => {
      // Mock successful registration
      vi.mocked(supabase.auth.signUp).mockResolvedValue({
        data: { user: { id: "test-user" } },
        error: null,
      } as any);

      const result = await registerWithEmail("test@example.com", "password123");

      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should handle registration failure", async () => {
      // Mock failed registration
      const mockError = { message: "Email already in use" };
      vi.mocked(supabase.auth.signUp).mockResolvedValue({
        data: { user: null },
        error: mockError,
      } as any);

      const result = await registerWithEmail(
        "existing@example.com",
        "password123",
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe(mockError);
    });
  });

  describe("loginWithEmail", () => {
    it("should login a user successfully", async () => {
      // Mock successful login
      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
        data: { user: { id: "test-user" } },
        error: null,
      } as any);

      const result = await loginWithEmail("test@example.com", "password123");

      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should handle login failure", async () => {
      // Mock failed login
      const mockError = { message: "Invalid credentials" };
      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
        data: { user: null },
        error: mockError,
      } as any);

      const result = await loginWithEmail("wrong@example.com", "wrongpassword");

      expect(result.success).toBe(false);
      expect(result.error).toBe(mockError);
    });
  });

  describe("loginWithOAuth", () => {
    it("should initiate OAuth login successfully", async () => {
      // Mock successful OAuth initiation
      vi.mocked(supabase.auth.signInWithOAuth).mockResolvedValue({
        error: null,
      } as any);

      const result = await loginWithOAuth("google");

      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: "google",
      });
    });

    it("should handle OAuth initiation failure", async () => {
      // Mock failed OAuth initiation
      const mockError = { message: "Provider not supported" };
      vi.mocked(supabase.auth.signInWithOAuth).mockResolvedValue({
        error: mockError,
      } as any);

      const result = await loginWithOAuth("unsupported" as any);

      expect(result.success).toBe(false);
      expect(result.error).toBe(mockError);
    });
  });

  describe("resetPassword", () => {
    it("should initiate password reset successfully", async () => {
      // Mock successful password reset
      vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValue({
        error: null,
      } as any);

      const result = await resetPassword("test@example.com");

      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        "test@example.com",
      );
    });

    it("should handle password reset failure", async () => {
      // Mock failed password reset
      const mockError = { message: "User not found" };
      vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValue({
        error: mockError,
      } as any);

      const result = await resetPassword("nonexistent@example.com");

      expect(result.success).toBe(false);
      expect(result.error).toBe(mockError);
    });
  });

  describe("logout", () => {
    it("should log out a user successfully", async () => {
      // Mock successful logout
      vi.mocked(supabase.auth.signOut).mockResolvedValue({
        error: null,
      } as any);

      const result = await logout();

      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });

    it("should handle logout failure", async () => {
      // Mock failed logout
      const mockError = { message: "Network error" };
      vi.mocked(supabase.auth.signOut).mockResolvedValue({
        error: mockError,
      } as any);

      const result = await logout();

      expect(result.success).toBe(false);
      expect(result.error).toBe(mockError);
    });
  });

  describe("getCurrentUserId", () => {
    it("should return the user ID when authenticated", () => {
      // Set up a mock authenticated user
      const mockUser = {
        id: "auth-user-123",
        app_metadata: {},
        user_metadata: {},
        aud: "authenticated",
        created_at: new Date().toISOString(),
        email: "test@example.com",
      };
      vi.mocked(user.subscribe).mockImplementation((callback) => {
        callback(mockUser);
        return () => {};
      });

      const userId = getCurrentUserId();

      expect(userId).toBe("auth-user-123");
    });

    it("should return null when not authenticated", () => {
      // Set up no authenticated user
      vi.mocked(user.subscribe).mockImplementation((callback) => {
        callback(null);
        return () => {};
      });

      const userId = getCurrentUserId();

      expect(userId).toBeNull();
    });
  });
});
