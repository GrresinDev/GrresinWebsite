<script lang="ts">
	import { Motion, useViewportScroll } from 'svelte-motion';
	import { onDestroy } from 'svelte';

	const { scrollYProgress } = useViewportScroll();

	// Optional explicit cleanup (recommended for complex apps)
	let unsub: () => void;
	const init = () => (unsub = scrollYProgress.subscribe(() => {}));
	init();

	onDestroy(() => {
		unsub?.(); // Safely unsubscribe
	});
</script>

<Motion let:motion>
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div
		use:motion
		class="far-long fixed inset-x-0 top-0 z-[100] h-[5px] origin-left bg-[#a71580]"
		style="transform: scaleX({$scrollYProgress});"
	/>
</Motion>

<style>
	.far-long {
		will-change: transform; /* Performance hint */
		transition: all 0.5s cubic-bezier(0.15, 0.85, 0.45, 1);
	}
</style>
