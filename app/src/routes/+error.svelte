<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
	<h1 class="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
	<p class="mb-8 text-lg text-gray-300">The page {$page.url.pathname} could not be found.</p>
	<a
		href="{base}/"
		class="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700"
	>
		Return Home
	</a>
</div>
