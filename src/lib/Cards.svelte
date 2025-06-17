<script lang="ts">
	import type { ArtProductsModelwithThumb } from '$lib/interface/art';
	import { getLocale } from '$lib/paraglide/runtime';
	import { fade } from 'svelte/transition';

	let { product, i }: { product: ArtProductsModelwithThumb; i: number } = $props();
</script>

<div
	in:fade|global={{ duration: i * 400, delay: i * 300 }}
	class="min-h-[200px] w-[280px] flex-shrink-0 transition-all duration-300 ease-in-out
           hover:scale-105 sm:w-[320px] md:w-[320px] lg:w-[350px]"
>
	<div
		class="my-4 flex h-[450px] flex-col rounded-2xl border bg-gray-600/60 transition-all duration-300 ease-in-out"
	>
		<a href={product.shop} class="block aspect-square overflow-hidden">
			<img
				class="h-full w-full rounded-t-2xl object-cover"
				src={product.thumbnail}
				alt="poject products"
			/>
		</a>
		<div class="flex flex-grow flex-col justify-between p-2 sm:p-3 md:p-2.5">
			<h5
				class="mb-3 text-center text-sm font-bold tracking-tight text-white sm:text-base md:mb-2 md:text-[15px] lg:text-lg"
			>
				{getLocale() === 'ar' ? product.name_ar : product.name}
			</h5>

			<p class="overflow-auto text-center text-[13px] text-white sm:text-sm md:text-xs lg:text-sm">
				{getLocale() === 'ar' ? product.description_ar : product.description}
			</p>
		</div>
	</div>
</div>
