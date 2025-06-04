<script lang="ts">
	import { type Icon as IconType } from '@lucide/svelte';

	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	interface GridItem {
		id: string;
		title: string;
		icon: typeof IconType;
		href: string;
		backgroundImage?: string;
		colSpan: `col-span-${1 | 2 | 3 | 4 | 5}`;
		rowSpan: `row-span-${1 | 2 | 3 | 4 | 5}`;
	}
	let { items }: { items: GridItem[] } = $props();

	const predefinedGridItems = [
		{ colSpan: 'col-span-5', rowSpan: 'row-span-3' },
		{ colSpan: 'col-span-1', rowSpan: 'row-span-3' },
		{ colSpan: 'col-span-1', rowSpan: 'row-span-3' },
		{ colSpan: 'col-span-1', rowSpan: 'row-span-3' },
		{ colSpan: 'col-span-1', rowSpan: 'row-span-3' },
		{ colSpan: 'col-span-1', rowSpan: 'row-span-3' },
		{ colSpan: 'col-span-5', rowSpan: 'row-span-4' },
		{ colSpan: 'col-span-2', rowSpan: 'row-span-5' },
		{ colSpan: 'col-span-3', rowSpan: 'row-span-5' }
	];
	const gridItems = items.map((item, index) => {
		const gridItem = predefinedGridItems[index] || { colSpan: 'col-span-1', rowSpan: 'row-span-1' };
		return {
			...item,
			colSpan: gridItem.colSpan,
			rowSpan: gridItem.rowSpan
		};
	});
</script>

<div class="flex h-full w-full items-center justify-center md:hidden">
	<div class="grid h-full w-full grid-cols-5 grid-rows-5 gap-4 p-2">
		{#each gridItems as item, index (item.id)}
			{@const Icon = item.icon}
			<a
				in:fly|global={{ y: 50, x: 200, duration: index * 350, delay: 100, easing: cubicOut }}
				href={item.href}
				class={`relative ${item.colSpan} ${item.rowSpan} flex flex-col items-center justify-center overflow-hidden rounded-3xl shadow-md  transition-transform ease-in-out hover:scale-110 `}
				style={item.backgroundImage
					? `background-image: ${item.backgroundImage}; background-size: cover; background-position: center;`
					: ''}
			>
				{#if item.backgroundImage}
					<div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
				{/if}
				<div
					class="relative z-10 flex flex-col items-center justify-center p-4 text-white"
					transition:scale|global={{ duration: index * 250, delay: 400, easing: cubicOut }}
				>
					<Icon class="m-2 h-4 w-4" />

					<span class="text-xs font-semibold">{item.title}</span>
				</div>
			</a>
		{/each}
	</div>
</div>
