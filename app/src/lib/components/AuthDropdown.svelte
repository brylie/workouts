<script lang="ts">
  import { user } from "$lib/supabase/client";
  import {
    loginWithEmail,
    registerWithEmail,
    logout,
  } from "$lib/supabase/auth";

  let isOpen = $state(false);
  let isRegistering = $state(false);
  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let errorMessage = $state("");
  let successMessage = $state("");

  // Toggle dropdown visibility
  function toggleDropdown() {
    isOpen = !isOpen;
    clearMessages();
    resetForm();
  }

  // Toggle between login and registration forms
  function toggleAuthMode() {
    isRegistering = !isRegistering;
    clearMessages();
    resetForm();
  }

  // Reset form fields
  function resetForm() {
    email = "";
    password = "";
    confirmPassword = "";
  }

  // Clear status messages
  function clearMessages() {
    errorMessage = "";
    successMessage = "";
  }

  // Handle login submission
  async function handleLogin() {
    clearMessages();

    try {
      const { success, error } = await loginWithEmail(email, password);

      if (success) {
        successMessage = "Login successful!";
        isOpen = false;
      } else {
        errorMessage = error?.message || "Login failed. Please try again.";
      }
    } catch (err) {
      errorMessage = "An unexpected error occurred. Please try again.";
      console.error("Login error:", err);
    }
  }

  // Handle registration submission
  async function handleRegister() {
    clearMessages();

    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match.";
      return;
    }

    try {
      const { success, error } = await registerWithEmail(email, password);

      if (success) {
        successMessage =
          "Registration successful! Please check your email for verification.";
        isRegistering = false;
      } else {
        errorMessage =
          error?.message || "Registration failed. Please try again.";
      }
    } catch (err) {
      errorMessage = "An unexpected error occurred. Please try again.";
      console.error("Registration error:", err);
    }
  }

  // Handle logout
  async function handleLogout() {
    try {
      await logout();
      successMessage = "Logged out successfully!";
    } catch (err) {
      errorMessage = "Error logging out. Please try again.";
      console.error("Logout error:", err);
    }
  }
</script>

<div class="dropdown dropdown-end">
  {#if $user}
    <!-- Logged in state -->
    <button
      onclick={toggleDropdown}
      class="btn btn-ghost flex items-center"
      id="auth-user-button"
    >
      <span class="mr-1">{$user.email}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    {#if isOpen}
      <ul
        class="dropdown-content menu bg-base-100 z-10 mt-2 w-48 rounded-md shadow-lg"
        id="auth-dropdown-menu"
      >
        <li>
          <button
            onclick={handleLogout}
            class="w-full text-left"
            id="auth-logout-button"
          >
            Logout
          </button>
        </li>
      </ul>
    {/if}
  {:else}
    <!-- Logged out state -->
    <button
      onclick={toggleDropdown}
      class="btn btn-ghost flex items-center"
      id="auth-login-button"
    >
      <span class="mr-1">Login</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    {#if isOpen}
      <div
        class="dropdown-content card bg-base-100 z-10 mt-2 w-64 rounded-md shadow-lg"
        id="auth-form-container"
      >
        <div class="card-body p-4">
          <!-- Form title -->
          <h3 class="card-title text-lg">
            {isRegistering ? "Register" : "Login"}
          </h3>

          <!-- Error/Success messages -->
          {#if errorMessage}
            <div class="alert alert-error py-2" id="auth-error-message">
              <span>{errorMessage}</span>
            </div>
          {/if}

          {#if successMessage}
            <div class="alert alert-success py-2" id="auth-success-message">
              <span>{successMessage}</span>
            </div>
          {/if}

          <!-- Auth Form -->
          <form class="form-control gap-3">
            <div>
              <label for="email" class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                id="auth-email-input"
                bind:value={email}
                class="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label for="password" class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                id="auth-password-input"
                bind:value={password}
                class="input input-bordered w-full"
                required
              />
            </div>

            {#if isRegistering}
              <div>
                <label for="confirmPassword" class="label">
                  <span class="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  id="auth-confirm-password-input"
                  bind:value={confirmPassword}
                  class="input input-bordered w-full"
                  required
                />
              </div>
            {/if}

            <div>
              <button
                type="button"
                onclick={isRegistering ? handleRegister : handleLogin}
                class="btn btn-primary mt-2 w-full"
                id="auth-submit-button"
              >
                {isRegistering ? "Register" : "Login"}
              </button>
            </div>

            <div class="mt-2 text-center text-xs">
              <button
                type="button"
                onclick={toggleAuthMode}
                class="btn btn-link btn-sm p-0"
                id="auth-toggle-mode-button"
              >
                {isRegistering
                  ? "Already have an account? Login"
                  : "Need an account? Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    {/if}
  {/if}
</div>
