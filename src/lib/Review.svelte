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
	<div class="mt-20 flex flex-wrap justify-center gap-8 px-4 lg:px-10">
		{#each reviews as review (review.id)}
			<div class="w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-22px)]">
				<div
					class="relative flex h-full flex-col rounded-lg border hover:shadow-lg hover:shadow-indigo-300"
				>
					<div class="flex flex-grow flex-col items-start p-5">
						<!--Icon-->
						<Quote />

						<div class="flex flex-grow flex-col gap-5 text-left">
							<p class="flex-grow text-sm italic sm:text-base">
								{getLocale() === 'ar' ? review.review_ar : review.review}
							</p>
							<div>
								<h3
									class="text-xl font-semibold sm:text-2xl"
									aria-label="Customer: {getLocale() === 'ar' ? review.name_ar : review.name}"
								>
									{getLocale() === 'ar' ? review.name_ar : review.name}
								</h3>
								<p class="text-xs sm:text-sm">{review.role}</p>
							</div>
						</div>
					</div>
					<div class="absolute bottom-0 left-0 right-0 rounded-b-lg bg-sky-500 p-0.5"></div>
				</div>
			</div>
		{/each}
	</div>
</section>
