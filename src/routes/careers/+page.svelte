<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import { enhance } from '$app/forms';
	import logo from '$lib/assets/images/Logo.png';
	import { Button } from '$lib/components/ui/button/index.js';

	import {
		Brain,
		ChartLine,
		Component,
		Lightbulb,
		Palette,
		PencilRuler,
		type Icon as IconType
	} from '@lucide/svelte';



	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { m } from '$lib/paraglide/messages';

	import type { PageProps } from './$types';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { page } from '$app/state';
	import LazyLoading from '$lib/LazyLoading.svelte';
	import Empty from '$lib/Empty.svelte';

	let { data, form }: PageProps = $props(); // $props() is a Svelte 5 rune, assuming you are indeed using a Svelte 5 dev build where this is available.

	let value = $state<string>(''); // $state() is a Svelte 5 rune, assuming you are indeed using a Svelte 5 dev build where this is available.
	let loading = $state(false);
	const selectedvalue = $derived(
		// $derived() is a Svelte 5 rune, assuming you are indeed using a Svelte 5 dev build where this is available.
		value
			? getLocale() === 'ar'
				? data.position.find((postion) => postion.id === value)?.name_ar
				: data.position.find((postion) => postion.id === value)?.name
			: m.only_tired_donkey_rest()
	);

	type WorkItem = {
		body: string;
		icon: typeof IconType;
	};
	const workWithUs: WorkItem[] = [
		{
			icon: Component,
			body: m.agent_ornate_thrush_harbor()
		},
		{
			icon: Lightbulb,
			body: m.house_bright_gibbon_dance()
		},
		{
			icon: ChartLine,
			body: m.grassy_solid_cuckoo_bubble()
		},
		{
			icon: PencilRuler,
			body: m.tired_best_fly_savor()
		},
		{
			icon: Palette,
			body: m.flaky_tired_eagle_sail()
		},
		{
			icon: Brain,
			body: m.sweet_soft_snail_arrive()
		}
	];

	$effect(() => {
		// $effect() is a Svelte 5 rune, assuming you are indeed using a Svelte 5 dev build where this is available.
		if (form) {
			if (form?.success) {
				toast.success('It works!');
			} else {
				toast.error('Something Went Wrong!');
			}
		}
	});


	const CareerCardPromise = import('$lib/components/CareerCard.svelte');
	const CarouselPromise = import('$lib/components/Carousel.svelte');
</script>

<svelte:head>
	<title>Join Graffiti Resin | Careers in Flooring Innovation & Resin Art</title>
	<meta
		name="description"
		content="Explore career opportunities at Graffiti Resin. We're hiring creative and technical professionals in resin flooring, epoxy terrazzo, art resin products, and project management."
	/>

	<meta property="og:title" content="Careers at Graffiti Resin | Saudi Arabia" />
	<meta
		property="og:description"
		content="Be part of the resin revolution. Join Graffiti Resin’s growing team and contribute to innovative flooring and artistic projects across Saudi Arabia."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={logo} />

	<meta
		name="keywords"
		content="resin jobs Saudi Arabia, Graffiti Resin careers, epoxy flooring hiring, terrazzo flooring jobs, resin art opportunities, Saudi construction careers"
	/>
	<link rel="preload" href="https://picsum.photos/200" as="image" />
	<link rel="preload" href={logo} as="image" />

	<link rel="preconnect" href="https://fonts.googleapis.com"  />
</svelte:head>

<section class="">
	<div class="relative z-10 max-w-full">
		
			{#await CarouselPromise then M}
				{@const Carousel = M.default}
				<Carousel />
			{:catch error}
				<p>Failed to load carousel: {error.message}</p>
			{/await}
		
	</div>
</section>

<p
	class="container mx-auto text-center text-3xl font-bold tracking-wide text-[#a71580] drop-shadow-2xl md:text-5xl"
>
	{m.swift_knotty_crow_arise()}
</p>
<section class=" container my-10 grid grid-cols-1 gap-x-8 gap-y-16 p-10 md:grid-cols-3">
	{#each workWithUs as content}
		{#await CareerCardPromise then M}
			{@const CareerCard = M.default}
			<CareerCard body={content.body}>
				{@const Icon = content.icon}
				<Icon
					color="#a71580"
					strokeWidth={1.25}
					class="-mt-24 h-24 w-24 rounded-full bg-white p-2 shadow-black drop-shadow-2xl rtl:mr-52"
				/>
			</CareerCard>
		{:catch error}
			<p>Failed to load career card: {error.message}</p>
		{/await}
	{/each}
</section>

<p class="container mx-auto my-5 min-h-20 text-center text-4xl font-thin text-[#a71580]">
	{m.misty_even_angelfish_taste()}
</p>
<Empty items={data.position}>
	<div class="  px-10 py-10 md:py-16 lg:py-24 xl:px-0">
		<h2 class=" mb-14 text-center text-3xl font-bold leading-10 text-gray-900 lg:text-4xl">
			{m.clear_less_jackdaw_bump()}
		</h2>
		<div
			class="bg-gray-0 mx-auto max-w-sm rounded-md border bg-opacity-5
 bg-clip-padding p-12 backdrop-blur-sm backdrop-filter sm:max-w-md md:max-w-xl lg:max-w-3xl
"
		>
			{#each data.position as postion (postion.id)}
				<div class="flex justify-between gap-x-8 border-b border-blue-500 py-6">
					<h3 class="text-xl font-medium leading-8 text-gray-900">
						{getLocale() === 'ar' ? postion.name_ar : postion.name}
					</h3>
					<button
						onclick={() => {
							value = postion.id;
							// Ensure localizeHref is correctly used for SEO-friendly URLs
							goto(localizeHref('/careers#application'));
						}}
						class="h-9 w-20 rounded-full bg-indigo-50 text-xs font-semibold leading-4 text-[#a71580] transition-all duration-700 hover:bg-indigo-100"
						>{m.known_jolly_cat_hurl()}</button
					>
				</div>
			{/each}
		</div>
	</div>
</Empty>

<section class="bg-[#a71580]" id="application">
	<LazyLoading>
		<div class=" container">
			<div class=" flex h-full flex-col gap-8 md:flex-row">
				<div class=" my-8 flex basis-1/2 flex-col">
					<div class="basis-1/4 text-start">
						<h1
							class=" whitespace-pre-line text-4xl font-bold tracking-wider text-white md:text-6xl"
						>
							{m.wild_close_angelfish_swim()}
						</h1>
					</div>
					<div class="aspect-square basis-4/5 rounded-full p-8">
						<img
							loading="lazy"
							class="h-full w-full rounded-full object-cover"
							src="https://picsum.photos/200"
							alt="jobs "
						/>
					</div>
				</div>

				<div class="  my-8 basis-1/2 rounded-2xl bg-white">
					<form
						method="POST"
						enctype="multipart/form-data"
						use:enhance={() => {
							loading = true;
							return async ({ update }) => {
								// Invalidate only necessary parts or nothing if only form state changes
								// `invalidateAll: false` is good if only form data needs updating,
								// preventing unnecessary data re-fetches from load functions.
								await update({ invalidateAll: false });
								loading = false;
							};
						}}
					>
						<div class="flex w-full flex-col gap-1.5 p-8">
							<Label for="name">
								<h1 class="w-full text-3xl">
									{m.known_zippy_llama_empower()}
									<hr class="h-[2px] w-1/2 bg-blue-500" />
								</h1>
							</Label>
							<Input
								class=" border-b border-l-0 border-r-0 border-t-0 border-gray-500    bg-transparent text-xl  placeholder:text-gray-500 focus:border-gray-500 "
								type="text"
								name="name"
								id="name"
								placeholder={m.vivid_direct_gopher_belong()}
								required
							/>
							<p class="h-1 text-red-500">
								{#if form?.validation?.name}
									{m.every_fine_crow_yell()}
								{/if}
							</p>
						</div>
						<div class="flex w-full flex-col gap-1.5 p-8">
							<Label for="email">
								<h1 class="w-full text-3xl">
									{m.great_awful_donkey_endure()}
									<hr class="h-[2px] w-1/2 bg-blue-500" />
								</h1>
							</Label>
							<Input
								class=" border-b border-l-0 border-r-0 border-t-0 border-gray-500    bg-transparent text-xl  placeholder:text-gray-500 focus:border-gray-500 "
								type="email"
								id="email"
								name="email"
								placeholder="example@example.com"
								required
							/>
						</div>
						<div class=" flex w-full flex-col gap-1.5 p-8">
							<Label for="position-select">
								<h1 class="w-full text-3xl">
									{m.proof_key_mongoose_adore()}
									<hr class="h-[2px] w-1/2 bg-blue-500" />
								</h1>
							</Label>
							<Select.Root type="single" name="position" bind:value required>
								<Select.Trigger
									id="position-select"
									class="border-b border-l-0 border-r-0 border-t-0 border-gray-500    bg-transparent text-xl  placeholder:text-gray-500 focus:border-gray-500"
								>
									{selectedvalue}
								</Select.Trigger>
								<Select.Content side="bottom">
									<Select.Group class="bg-white">
										{#each data.position as postion (postion.id)}
											<Select.Item
												class="hover:bg-slate-300"
												value={postion.id}
												label={getLocale() === 'ar' ? postion.name_ar : postion.name}
											>
												{getLocale() === 'ar' ? postion.name_ar : postion.name}</Select.Item
											>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</div>
						<div class="flex w-full flex-col gap-1.5 p-8">
							<Label for="message">
								<h1 class="w-full text-3xl">
									{m.vexed_antsy_lynx_zap()}
									<hr class="h-[2px] w-1/2 bg-blue-500" />
								</h1>
							</Label>
							<Textarea
								id="message"
								class=" border-b border-l-0 border-r-0 border-t-0 border-gray-500    bg-transparent text-2xl  placeholder:text-gray-500 focus:border-gray-500 "
								name="message"
								placeholder={m.sunny_trick_manatee_urge()}
								required
							/>
						</div>
						<div class="flex w-full flex-col gap-1.5 p-8">
							<Label for="cv">
								<h1 class="w-full text-3xl">
									{m.hour_tidy_worm_transform()}
									<hr class="h-[2px] w-1/2 bg-blue-500" />
								</h1>
							</Label>
							<Input
								class=" border-b border-l-0 border-r-0 border-t-0 border-gray-500    bg-transparent text-xl  placeholder:text-gray-500 focus:border-gray-500 "
								type="file"
								id="cv"
								name="cv"
								accept=".pdf,.doc,.docx"
							/>
						</div>
						<div class="flex w-full flex-col gap-1.5 p-8">
							<Button
								type="submit"
								class="rounded-2xl border border-blue-500 text-3xl hover:bg-blue-500 hover:text-white"
								disabled={loading}
							>
								{#if loading}
									<LoaderCircle class="mr-2 animate-spin" />
								{/if}
								{m.known_jolly_cat_hurl()}</Button
							>
						</div>
					</form>
				</div>
			</div>
		</div>
	</LazyLoading>
</section>
