<script lang="ts">
import { page } from '$app/stores';

// Track active route to highlight current page
$: pathname = $page.url.pathname;
</script>

<nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex items-center justify-between">
        <a href="/" class="text-white text-xl font-bold">Workouts</a>
        
        <div class="flex gap-4">
            <a 
                href="/" 
                class="text-white hover:text-blue-300 transition-colors {pathname === '/' ? 'font-bold' : ''}"
            >
                Home
            </a>
            <a 
                href="/exercises" 
                class="text-white hover:text-blue-300 transition-colors {pathname === '/exercises' ? 'font-bold' : ''}"
            >
                Exercises
            </a>
            <a 
                href="/workout" 
                class="text-white hover:text-blue-300 transition-colors {pathname === '/workout' ? 'font-bold' : ''}"
            >
                Generate Workout
            </a>
        </div>
    </div>
</nav>