<script lang="ts">
  import { page } from "$app/stores";
  import { base } from "$app/paths";

  // Track active route to highlight current page
  $: pathname = $page.url.pathname;
</script>

<nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex items-center justify-between">
    <a href="{base}/" class="text-xl font-bold text-white">Workouts</a>

    <div class="flex gap-4">
      <a
        href="{base}/"
        class="text-white transition-colors hover:text-blue-300 {pathname ===
        base + '/'
          ? 'font-bold'
          : ''}"
      >
        Home
      </a>
      <a
        href="{base}/exercises"
        class="text-white transition-colors hover:text-blue-300 {pathname ===
        base + '/exercises'
          ? 'font-bold'
          : ''}"
      >
        Exercises
      </a>
      <a
        href="{base}/workout"
        class="text-white transition-colors hover:text-blue-300 {pathname ===
        base + '/workout'
          ? 'font-bold'
          : ''}"
      >
        Generate Workout
      </a>
      <a
        href="{base}/history"
        class="text-white transition-colors hover:text-blue-300 {pathname ===
        base + '/history'
          ? 'font-bold'
          : ''}"
      >
        History
      </a>
      <a
        href="{base}/recovery"
        class="text-white transition-colors hover:text-blue-300 {pathname ===
        base + '/recovery'
          ? 'font-bold'
          : ''}"
      >
        Recovery
      </a>
      <a
        href="{base}/guidelines"
        class="text-white transition-colors hover:text-blue-300 {pathname ===
        base + '/guidelines'
          ? 'font-bold'
          : ''}"
      >
        Guidelines
      </a>
    </div>
  </div>
</nav>
