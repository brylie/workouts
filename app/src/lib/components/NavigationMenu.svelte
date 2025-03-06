<script lang="ts">
import { page } from '$app/stores';
import { base } from '$app/paths';

// Track active route to highlight current page
$: pathname = $page.url.pathname;
</script>

<nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex items-center justify-between">
        <a href="{base}/" class="text-white text-xl font-bold">Workouts</a>
        
        <div class="flex gap-4">
            <a 
                href="{base}/" 
                class="text-white hover:text-blue-300 transition-colors {pathname === base + '/' ? 'font-bold' : ''}"
            >
                Home
            </a>
            <a 
                href="{base}/exercises" 
                class="text-white hover:text-blue-300 transition-colors {pathname === base + '/exercises' ? 'font-bold' : ''}"
            >
                Exercises
            </a>
            <a 
                href="{base}/workout" 
                class="text-white hover:text-blue-300 transition-colors {pathname === base + '/workout' ? 'font-bold' : ''}"
            >
                Generate Workout
            </a>
        </div>
    </div>
</nav>