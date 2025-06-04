<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { enhance } from '$app/forms';

	import {
		Brain,
		ChartLine,
		Component,
		Lightbulb,
		Palette,
		PencilRuler,
		type Icon as IconType
	} from '@lucide/svelte';

	import CareerCard from '$lib/components/CareerCard.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { m } from '$lib/paraglide/messages';

	import type { PageProps } from './$types';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	let { data, form }: PageProps = $props();

	let value = $state<string>('');
	const selectedvalue = $derived(
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
		if (form) {
			if (form?.success) {
				toast.success('It works!');
			} else {
				toast.error('Something Went Wrong!');
			}
		}
	});
</script>

<section class="">
	<div class="relative z-10 max-w-full">
		<Carousel />
	</div>
</section>

<p
	class="container mx-auto text-center text-3xl font-bold tracking-wide text-[#a71580] drop-shadow-2xl md:text-5xl"
>
	{m.swift_knotty_crow_arise()}
</p>
<section class=" container my-10 grid grid-cols-1 gap-x-8 gap-y-16 p-10 md:grid-cols-3">
	{#each workWithUs as content}
		<CareerCard body={content.body}>
			{@const Icon = content.icon}
			<Icon
				color="#a71580"
				strokeWidth={1.25}
				class="-mt-24 h-24 w-24 rounded-full bg-white p-2 shadow-black drop-shadow-2xl rtl:mr-52"
			/>
		</CareerCard>
	{/each}
</section>

<p class="container mx-auto my-5 min-h-20 text-center text-4xl font-thin text-[#a71580]">
	{m.misty_even_angelfish_taste()}
</p>

<div class="  px-10 py-10 md:py-16 lg:py-24 xl:px-0">
	<h2 class=" mb-14 text-center text-3xl font-bold leading-10 text-gray-900 lg:text-4xl">
		{m.clear_less_jackdaw_bump()}
	</h2>
	<div
		class="bg-gray-0 mx-auto max-w-sm rounded-md border bg-opacity-5
 bg-clip-padding p-12 backdrop-blur-sm backdrop-filter sm:max-w-md md:max-w-xl lg:max-w-3xl
"
	>
		{#each data.position as postion}
			<div class="flex justify-between gap-x-8 border-b border-blue-500 py-6">
				<h3 class="text-xl font-medium leading-8 text-gray-900">
					{getLocale() === 'ar' ? postion.name_ar : postion.name}
				</h3>
				<button
					onclick={() => {
						value = postion.id;
						goto(localizeHref('/careers#application'));
					}}
					class="h-9 w-20 rounded-full bg-indigo-50 text-xs font-semibold leading-4 text-[#a71580] transition-all duration-700 hover:bg-indigo-100"
					>{m.known_jolly_cat_hurl()}</button
				>
			</div>
		{/each}
	</div>
</div>

<section class="bg-[#a71580]" id="application">
	<div class=" container">
		<div class=" flex h-full flex-col gap-8 md:flex-row">
			<div class=" my-8 flex basis-1/2 flex-col">
				<div class="basis-1/4 text-start">
					<h1 class=" whitespace-pre-line text-4xl font-bold tracking-wider text-white md:text-6xl">
						{m.wild_close_angelfish_swim()}
					</h1>
				</div>
				<div class="aspect-square basis-4/5 rounded-full p-8">
					<img
						class="h-full w-full rounded-full object-cover"
						src="https://picsum.photos/200"
						alt="jobs "
					/>
				</div>
			</div>

			<!--Form Start-->
			<div class="  my-8 basis-1/2 rounded-2xl bg-white">
				<form method="POST" enctype="multipart/form-data" use:enhance>
					<div class="flex w-full flex-col gap-1.5 p-8">
						<Label>
							<h1 class="w-full text-3xl">
								{m.known_zippy_llama_empower()}

								<hr class="h-[2px] w-1/2 bg-blue-500" />
							</h1>
						</Label>
						<Input
							class=" border-b border-l-0 border-r-0 border-t-0 border-gray-500    bg-transparent text-xl  placeholder:text-gray-500 focus:border-gray-500 "
							type="name"
							name="name"
							id="name"
							placeholder="Name"
						/>
						<p class="h-1 text-red-500">
							{#if form?.validation?.name}
								Wrong name
							{/if}
						</p>
					</div>
					<div class="flex w-full flex-col gap-1.5 p-8">
						<Label>
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
						/>
					</div>
					<div class=" flex w-full flex-col gap-1.5 p-8">
						<Label>
							<h1 class="w-full text-3xl">
								{m.proof_key_mongoose_adore()}

								<hr class="h-[2px] w-1/2 bg-blue-500" />
							</h1>
						</Label>
						<Select.Root type="single" name="position" bind:value>
							<Select.Trigger
								class="border-b border-l-0 border-r-0 border-t-0 border-gray-500    bg-transparent text-xl  placeholder:text-gray-500 focus:border-gray-500"
							>
								{selectedvalue}
							</Select.Trigger>
							<Select.Content>
								<Select.Group class="bg-white">
									{#each data.position as postion, i (postion.id)}
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
						<Label>
							<h1 class="w-full text-3xl">
								{m.vexed_antsy_lynx_zap()}

								<hr class="h-[2px] w-1/2 bg-blue-500" />
							</h1>
						</Label>
						<Textarea
							id="message"
							class=" border-b border-l-0 border-r-0 border-t-0 border-gray-500    bg-transparent text-2xl  placeholder:text-gray-500 focus:border-gray-500 "
							name="message"
							placeholder="Type your message here."
						/>
					</div>
					<div class="flex w-full flex-col gap-1.5 p-8">
						<Label>
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
						/>
					</div>
					<div class="flex w-full flex-col gap-1.5 p-8">
						<button
							type="submit"
							class="rounded-2xl border border-blue-500 text-3xl hover:bg-blue-500 hover:text-white"
							>{m.known_jolly_cat_hurl()}</button
						>
					</div>
				</form>
			</div>
			<!--Form End-->
		</div>
	</div>
</section>
