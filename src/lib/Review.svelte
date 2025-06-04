<script lang="ts">
	import type { ReviewModel } from '$lib/interface/review';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import Quote from './Quote.svelte';

	let { reviews }: { reviews: ReviewModel[] } = $props();
</script>

<h1
	class="container mx-auto text-center text-3xl font-bold tracking-wide text-[#a71580] drop-shadow-2xl md:text-5xl"
>
	{m.game_tangy_haddock_jolt()}
</h1>

<section id="reviews" class="container my-5 w-full text-lg">
	<div class="mt-20 flex items-stretch justify-center gap-8 px-4 lg:px-10">
		{#each reviews as review (review.id)}
			<div
				class=" relative w-full rounded-lg border hover:shadow-lg hover:shadow-indigo-300 md:w-1/2 lg:w-1/3"
			>
				<div class="flex flex-col items-start justify-center p-5">
					<Quote />

					<div class="flex flex-col items-start justify-center gap-5 text-left">
						<p class=" text-sm italic md:text-base">
							{getLocale() === 'ar' ? review.review_ar : review.review}
						</p>
						<div class="">
							<h3
								class="text-xl font-semibold md:text-2xl"
								aria-label="Customer: {getLocale() === 'ar' ? review.name_ar : review.name}"
							>
								{getLocale() === 'ar' ? review.name_ar : review.name}
							</h3>
							<p class="text-xs md:text-sm">{review.role}</p>
						</div>
					</div>
				</div>
				<div class=" absolute bottom-2 left-0 right-0 rounded-b-lg bg-sky-500 p-0.5"></div>
			</div>
		{/each}
	</div>
</section>

<style>
	.parent {
		display: grid;
		grid-template-columns: 0.25fr 1fr;
		grid-template-rows: repeat(5, 1fr);
		grid-column-gap: 20px;
		grid-row-gap: 20px;
	}

	.div1 {
		grid-area: 1 / 1 / 6 / 2;
	}
</style>
