<script lang="ts">
	import '../app.css';
	import NavigationMenu from '$lib/components/NavigationMenu.svelte';
	let { children } = $props();
	// This may be necessary in order for GitHub pages deployment to work
	// export const prerender = true;
</script>

<NavigationMenu />
{@render children()}
