<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { page, navigating } from '$app/state';
	import ScrollProgress from '$lib/ScrollProgress.svelte';

	import { SvelteLenis } from 'svelte-lenis';

	let { children, data } = $props();
</script>

<ScrollProgress />
<Toaster />
<Navbar />

{#key data.url}
	<SvelteLenis root>
		<div>
			{@render children()}
		</div>
	</SvelteLenis>
{/key}

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
