<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { type Icon as IconType } from '@lucide/svelte';
	import {
		ShoppingCart,
		ClipboardList,
		ChartSpline,
		Info,
		Users,
		Tag,
		BookOpen,
		Layers,
		File
	} from '@lucide/svelte';
	import { fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	interface GridItem {
		id: string;
		title: string;
		icon: typeof IconType;
		href: string;
		backgroundImage?: string;
		colSpan: number;
		rowSpan: number;
		className?: string;
		backgroundPosition: string;
	}
	let items: GridItem[] = [
		{
			id: '1',
			title: m.shop(),
			icon: ShoppingCart,
			href: '#top',
			colSpan: 1,
			rowSpan: 3,
			backgroundImage: 'url("bentogrid/shop.jpg")',

			backgroundPosition: 'center'
		},
		{
			id: '2',
			title: m.partner(),
			icon: Users,
			href: '#top',
			colSpan: 1,
			rowSpan: 1,
			backgroundImage: 'url("bentogrid/partner.jpg")',

			backgroundPosition: 'center'
		},
		{
			id: '3',
			title: m.projects(),
			icon: ClipboardList,
			href: '#top',
			colSpan: 1,
			rowSpan: 1,
			backgroundImage: 'url("bentogrid/projects.jpg")',
			backgroundPosition: 'center'
		},
		{
			id: '4',
			title: m.about(),
			icon: Info,
			href: '#top',
			colSpan: 2,
			rowSpan: 1,
			backgroundImage: 'url("bentogrid/aboutus.png")',
			backgroundPosition: 'top'
		},
		{
			id: '5',
			title: m.sales(),
			icon: ChartSpline,
			href: '#top',
			colSpan: 2,
			rowSpan: 1,
			backgroundImage: 'url("bentogrid/sales.png")',

			backgroundPosition: 'center'
		},
		{
			id: '6',
			title: m.products(),
			icon: Tag,
			href: '#top',
			colSpan: 1,
			rowSpan: 1,
			backgroundImage: 'url("bentogrid/products.jpg")',

			backgroundPosition: 'center'
		},
		{
			id: '7',
			title: m.Flooring(),
			icon: Layers,
			href: '#top',
			colSpan: 1,
			rowSpan: 1,
			backgroundImage: 'url("bentogrid/flooring.png")',
			backgroundPosition: 'center'
		},
		{
			id: '8',
			title: m.blogs(),
			icon: BookOpen,
			href: '#top',
			colSpan: 2,
			rowSpan: 1,
			backgroundImage: 'url("bentogrid/blogs.jpg")',

			backgroundPosition: 'left bottom'
		},
		{
			id: '9',
			title: m.make(),
			icon: File,
			href: '#top',
			colSpan: 2,
			rowSpan: 1,
			backgroundImage: 'url("bentogrid/creating.jpg")',

			backgroundPosition: 'center'
		}
	];

	let isInView: boolean = $state(false);
</script>

<div class="hidden h-full w-full items-center justify-center md:flex">
	<div class="grid h-full w-full grid-cols-5 grid-rows-3 gap-4 rounded-lg p-2">
		{#each items as item, index (item.id)}
			{@const Icon = item.icon}
			<a
				in:fly|global={{ y: 50, x: 200, duration: index * 350, delay: 100, easing: cubicOut }}
				href={item.href}
				class={`relative col-span-${item.colSpan} row-span-${item.rowSpan} flex flex-col items-center justify-center overflow-hidden rounded-lg shadow-2xl ${item.className || ''} transition-all duration-300 ease-in hover:z-10 hover:scale-110`}
				style={item.backgroundImage
					? `background-image: ${item.backgroundImage}; background-size: cover; background-position: ${item.backgroundPosition};`
					: ''}
			>
				{#if item.backgroundImage}
					<div class="absolute inset-0 bg-black/35 backdrop-blur-[2px]"></div>
				{/if}
				<div
					class="relative z-10 flex flex-col items-center justify-center p-4 text-white"
					in:scale|global={{ duration: index * 250, delay: 400, easing: cubicOut }}
				>
					<Icon class="mb-2 h-8 w-8" />

					<span class="text-sm font-semibold drop-shadow-2xl">{item.title}</span>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.hibo {
		opacity: 0;
		height: 0;
	}
</style>
