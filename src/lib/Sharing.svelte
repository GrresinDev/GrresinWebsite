<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();
	let url = page.url.href;
	const encodedUrl = encodeURIComponent(url);

	const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
</script>

<a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
	{@render children()}
</a>
