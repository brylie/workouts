<script lang="ts">
  import { page } from "$app/state";
  import { base } from "$app/paths";
  import AuthDropdown from "$lib/components/AuthDropdown.svelte";

  // Track active route to highlight current page
  let pathname = $derived(page.url.pathname);
</script>

<nav class="navbar bg-neutral text-neutral-content p-4">
  <div class="container mx-auto flex items-center justify-between">
    <a href="{base}/" class="text-xl font-bold">Workouts</a>

    <div class="flex items-center gap-4">
      <a
        href="{base}/"
        class="hover:text-primary transition-colors {pathname === base + '/'
          ? 'font-bold'
          : ''}"
        id="nav-home"
      >
        Home
      </a>
      <a
        href="{base}/exercises"
        class="hover:text-primary transition-colors {pathname ===
        base + '/exercises'
          ? 'font-bold'
          : ''}"
        id="nav-exercises"
      >
        Exercises
      </a>
      <a
        href="{base}/workout"
        class="hover:text-primary transition-colors {pathname ===
        base + '/workout'
          ? 'font-bold'
          : ''}"
        id="nav-workout"
      >
        Generate Workout
      </a>
      <a
        href="{base}/history"
        class="hover:text-primary transition-colors {pathname ===
        base + '/history'
          ? 'font-bold'
          : ''}"
        id="nav-history"
      >
        History
      </a>
      <a
        href="{base}/recovery"
        class="hover:text-primary transition-colors {pathname ===
        base + '/recovery'
          ? 'font-bold'
          : ''}"
        id="nav-recovery"
      >
        Recovery
      </a>
      <a
        href="{base}/guidelines"
        class="hover:text-primary transition-colors {pathname ===
        base + '/guidelines'
          ? 'font-bold'
          : ''}"
        id="nav-guidelines"
      >
        Guidelines
      </a>

      <!-- Add Authentication Dropdown -->
      <div class="divider divider-horizontal mx-2"></div>
      <AuthDropdown />
    </div>
  </div>
</nav>
