<script lang="ts">
	import { Motion, useViewportScroll } from 'svelte-motion';
	const { scrollYProgress } = useViewportScroll();
</script>

<Motion let:motion style={{ scaleX: $scrollYProgress }}>
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div use:motion class="far-long fixed inset-x-0 top-0 z-[100] h-[5px] origin-left bg-[#a71580]" />
</Motion>

<style>
	.far-long {
		transform: scaleX(0.8);
	}
</style>
