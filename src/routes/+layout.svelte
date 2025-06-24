<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { page, navigating } from '$app/state';
	import ScrollProgress from '$lib/ScrollProgress.svelte';
	import Loader from '$lib/PageLoader.svelte';

	let { children } = $props();

	let showLoadingIndicator = $state(false);

	$effect(() => {
		showLoadingIndicator = !!navigating.to;
	});
</script>

{#if showLoadingIndicator}
	<div class="loading-overlay">
		<Loader />
	</div>
{/if}
<ScrollProgress />
<Toaster />
<Navbar />

<div>
	{@render children()}
</div>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

<style>
	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 9999; /* Ensure it's on top of other content */
		backdrop-filter: blur(2px); /* Optional: blur content underneath */
	}
</style>
