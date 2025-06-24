<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { page, navigating } from '$app/state';
	import ScrollProgress from '$lib/ScrollProgress.svelte';
	import Loader from '$lib/PageLoader.svelte';
	import { onNavigate } from '$app/navigation';
	let showLoadingIndicator = $state(false);
	onNavigate((navigation) => {
		// If View Transitions are not supported, let SvelteKit handle navigation normally.
		// The `$navigating` store will still work for the loading indicator.
		if (!document.startViewTransition) {
			return; // No special Promise needed for non-VT
		}

		// Return a Promise to onNavigate to tell SvelteKit to wait for the View Transition
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				// This callback runs *after* the old view is snapshotted
				// and *before* SvelteKit starts rendering the new view.

				// Resolve the promise immediately. This tells SvelteKit to
				// proceed with navigation and render the new page.
				// The browser has already taken the snapshot of the old page.
				resolve();

				// Wait for SvelteKit to fully render the new page and load all its data.
				// During this time, the `$navigating` store will be truthy,
				// and your loading indicator will be visible.
				await navigation.complete;

				// At this point, the new page is fully rendered and the
				// transition should be complete or nearly complete.
				// The `$navigating` store will become null.
			});
		});
	});
	let { children } = $props();
</script>

{#if !!navigating.to}
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
