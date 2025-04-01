<script lang="ts">
  import "../app.css";
  import NavigationMenu from "$lib/components/NavigationMenu.svelte";
  let { children } = $props();
</script>

<NavigationMenu />
{@render children()}
