<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { locales, localizeHref } from '$lib/paraglide/runtime';

	import ScrollProgress from '$lib/ScrollProgress.svelte';
	import Loader from '$lib/PageLoader.svelte';

	import { fade } from 'svelte/transition';
	import { onNavigate } from '$app/navigation';

	import { page, navigating } from '$app/state';
	let loadingNavigatoion = $state(false);

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			loadingNavigatoion = true;
			navigating.complete?.then(() => {
				loadingNavigatoion = false;
			});
			return;
		}

		return new Promise((resolve) => {
			loadingNavigatoion = true;
			document.startViewTransition(async () => {
				resolve();

				await navigation.complete;
				loadingNavigatoion = false;
			});
		});
	});
	let { children } = $props();
</script>

{#if !!navigating.to}
	<div class="loading-overlay" transition:fade={{ duration: 200 }}>
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
		background-color: rgba(255, 255, 255, 0.8);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 9999;
		backdrop-filter: blur(2px);
	}
</style>
