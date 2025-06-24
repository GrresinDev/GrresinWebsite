<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let rootElement: HTMLElement | undefined = $state();
	let renderComponent = $state(false);
	const createIntersectionObserver = () => {
		return new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					renderComponent = true;
				}
			}
		});
	};

	onMount(() => {
		if (rootElement) {
			createIntersectionObserver().observe(rootElement);
		}
	});
	let { children } = $props();
</script>

<div bind:this={rootElement}>
	{#if renderComponent}
		<div transition:fade>
			{@render children()}
		</div>
	{/if}
</div>
