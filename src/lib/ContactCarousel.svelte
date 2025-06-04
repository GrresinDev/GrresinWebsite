<script lang="ts">
	let currentIndex = $state(0);
	const images = [
		'https://picsum.photos/400?random=1',
		'https://picsum.photos/400?random=2',
		'https://picsum.photos/400?random=3'
	];

	let interval: NodeJS.Timeout | undefined = $state<NodeJS.Timeout>();

	$effect(() => {
		interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
		}, 3000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="relative h-full w-full">
	{#each images as image, index (image)}
		<img
			src={image}
			alt="Carousel"
			class="carousel-item h-full w-full object-cover transition-opacity ltr:rounded-l-2xl rtl:rounded-r-2xl"
			class:active={index === currentIndex}
		/>
	{/each}
</div>

<style>
	.carousel-item {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: -10;
		transition: opacity 0.5s ease-in-out;
	}

	.carousel-item.active {
		opacity: 1;
		z-index: 1;
	}
</style>
