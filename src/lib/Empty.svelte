<script lang="ts" generics="T">
	import { m } from '$lib/paraglide/messages';
	import type { Snippet } from 'svelte';
	let { items, children }: { items: T[]; children: Snippet } = $props();
</script>

{#if !items || items.length === 0}
	<div class="container mx-auto text-wrap text-center">
		<h1 class="text-3xl font-bold text-gray-400">{m.wacky_tidy_kangaroo_view()}</h1>
	</div>
{:else}
	{@render children()}
{/if}
