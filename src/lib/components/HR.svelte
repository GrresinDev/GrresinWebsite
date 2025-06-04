<script lang="ts">
	import { inview, type Options } from 'svelte-inview';
	let isInView: boolean = $state(false);

	let {
		id,
		options = {
			rootMargin: '-50px',
			unobserveOnEnter: false
		},
		borderColor = 'border-black'
	}: { id: string; options?: Options; borderColor?: string } = $props();
</script>

<hr
	{id}
	use:inview={options}
	oninview_change={(event) => {
		const { inView } = event.detail;
		isInView = inView;
	}}
	class:animated-ruler={isInView}
	class="mt-6 border-2 border-solid {borderColor}"
/>

<style>
	.animated-ruler {
		width: 100%;
		animation: wider 2s linear backwards;
	}
	@keyframes wider {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}
</style>
