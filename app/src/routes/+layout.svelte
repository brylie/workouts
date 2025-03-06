<script lang="ts">
	import '../app.css';
	import NavigationMenu from '$lib/components/NavigationMenu.svelte';
	let { children } = $props();
	export const prerender = true;
</script>

<NavigationMenu />
{@render children()}
