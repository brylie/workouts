<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p class="text-lg mb-8 text-gray-300">The page {$page.url.pathname} could not be found.</p>
    <a 
        href="{base}/" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
    >
        Return Home
    </a>
</div>