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
		FileBadge2,
		File
	} from '@lucide/svelte';
	import { fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import bento from '$lib/assets/images/shop.jpg';
	import partner from '$lib/assets/images/partner.jpg';
	import projects from '$lib/assets/images/projects.jpg';

	import aboutus from '$lib/assets/images/aboutus.png';
	import sales from '$lib/assets/images/sales.png';
	import products from '$lib/assets/images/products.jpg';
	import flooring from '$lib/assets/images/flooring.png';
	import blogs from '$lib/assets/images/blogs.jpg';
	import creating from '$lib/assets/images/creating.jpg';
	import MobileBentoGrid from './MobileBentoGrid.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	interface GridItem {
		id: string;
		title: string;
		icon: typeof IconType;
		href: string;
		backgroundImage?: string;
		colSpan: `col-span-${1 | 2 | 3 | 4 | 5}`;
		rowSpan: `row-span-${1 | 2 | 3 | 4 | 5}`;
		className?: string;
		backgroundPosition: string;
	}
	let items: GridItem[] = [
		{
			id: '1',
			title: m.shop(),
			icon: ShoppingCart,
			href: 'https://shop.grresin.com/',
			colSpan: 'col-span-1',
			rowSpan: 'row-span-3',
			backgroundImage: `url(${bento})`,

			backgroundPosition: 'center'
		},
		{
			id: '2',
			title: m.partner(),
			icon: Users,
			href: localizeHref("#partner"),
			colSpan: 'col-span-1',
			rowSpan: 'row-span-1',
			backgroundImage: `url(${partner})`,

			backgroundPosition: 'center'
		},
		{
			id: '3',
			title: m.projects(),
			icon: ClipboardList,
			href: localizeHref("#project"),
			colSpan: 'col-span-1',
			rowSpan: 'row-span-1',
			backgroundImage: `url(${projects})`,
			backgroundPosition: 'center'
		},
		{
			id: '4',
			title: m.about(),
			icon: Info,
			href: localizeHref("/about"),
			colSpan: 'col-span-2',
			rowSpan: 'row-span-1',
			backgroundImage: `url(${aboutus})`,
			backgroundPosition: 'top'
		},
		{
			id: '5',
			title: m.sales(),
			icon: ChartSpline,
			href: 'https://shop.grresin.com/',

			colSpan: 'col-span-2',
			rowSpan: 'row-span-1',
			backgroundImage: `url(${sales})`,

			backgroundPosition: 'center'
		},
		{
			id: '6',
			title: m.products(),
			icon: Tag,
			href: '#top',

			colSpan: 'col-span-1',
			rowSpan: 'row-span-1',
			backgroundImage: `url(${products})`,

			backgroundPosition: 'center'
		},
		{
			id: '7',
			title: m.cool_just_carp_flow(),
			icon: FileBadge2,
			href: '/Graffite Profile.pdf',
			colSpan: 'col-span-1',
			rowSpan: 'row-span-1',
			backgroundImage: `url(${flooring})`,
			backgroundPosition: 'center'
		},
		{
			id: '8',
			title: m.blogs(),
			icon: BookOpen,
			href: '#top',
			colSpan: 'col-span-2',
			rowSpan: 'row-span-1',
			backgroundImage: `url(${blogs})`,

			backgroundPosition: 'left bottom'
		},
		{
			id: '9',
			title: m.make(),
			icon: File,
			href: '#top',
			colSpan: 'col-span-2',
			rowSpan: 'row-span-1',
			backgroundImage: `url(${creating})`,

			backgroundPosition: 'center'
		}
	];
</script>

<!-- Desktop & Tablet View -->
<div class="hidden h-full w-full items-center justify-center md:flex">
	<div class="grid h-full w-full grid-cols-5 grid-rows-3 gap-4 p-2">
		{#each items as item, index (item.id)}
			{@const Icon = item.icon}
			{#if item.id === '7'}
				<a
					in:fly|global={{ y: 50, x: 200, duration: index * 350, delay: 100, easing: cubicOut }}
					href={item.href}
					class={` relative ${item.colSpan} ${item.rowSpan} flex flex-col items-center justify-center overflow-hidden rounded-2xl  ${item.className || ''} transition-all duration-300 ease-in hover:z-10 hover:scale-110 `}
					style={item.backgroundImage
						? `background-image: ${item.backgroundImage}; background-size: cover; background-position: ${item.backgroundPosition};`
						: ''}
					download
				>
					{#if item.backgroundImage}
						<div class="ahmad absolute inset-0 backdrop-blur-[2px]"></div>
					{/if}
					<div
						class="relative z-10 flex flex-col items-center justify-center p-4 text-white"
						in:scale|global={{ duration: index * 250, delay: 400, easing: cubicOut }}
					>
						<Icon class="mb-2 h-8 w-8" />
						<span class="text-[2rem] drop-shadow-2xl">{item.title}</span>
					</div>
				</a>
			{:else}
				<a
					in:fly|global={{ y: 50, x: 200, duration: index * 350, delay: 100, easing: cubicOut }}
					href={item.href}
					class={` relative ${item.colSpan} ${item.rowSpan} flex flex-col items-center justify-center overflow-hidden rounded-2xl  ${item.className || ''} transition-all duration-300 ease-in hover:z-10 hover:scale-110 `}
					style={item.backgroundImage
						? `background-image: ${item.backgroundImage}; background-size: cover; background-position: ${item.backgroundPosition};`
						: ''}
				>
					{#if item.backgroundImage}
						<div class="ahmad absolute inset-0 backdrop-blur-[2px]"></div>
					{/if}
					<div
						class="relative z-10 flex flex-col items-center justify-center p-4 text-white"
						in:scale|global={{ duration: index * 250, delay: 400, easing: cubicOut }}
					>
						<Icon class="mb-2 h-8 w-8" />
						<span class="text-[2rem] drop-shadow-2xl">{item.title}</span>
					</div>
				</a>
			{/if}
		{/each}
	</div>
</div>
<MobileBentoGrid {items} />

<style>
	.hibo {
		opacity: 0;
		height: 0;
	}
	.ahmad {
		background: radial-gradient(rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
	}
</style>
