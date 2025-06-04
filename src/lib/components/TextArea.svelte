<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<p class="text-container">
	{@render children()}
</p>

<style>
	.text-container {
		max-width: 100%;
		padding: 12px 15px;
		margin: 0 auto;
		line-height: 1.6;
		text-align: justify;
		word-wrap: break-word;
	}

	@media (max-width: 768px) {
		.text-container {
			font-size: 16px;
			line-height: 1.5;
			padding: 10px 12px;
			hyphens: auto;
		}
	}

	@media (max-width: 480px) {
		.text-container {
			font-size: 14px;
			padding: 8px 10px;
		}
	}
</style>
