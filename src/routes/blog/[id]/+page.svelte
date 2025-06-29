<script lang="ts">
	import logo from '$lib/assets/images/Logo.png';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import type { PageData } from './$types';
	import Sticky from '$lib/components/Sticky.svelte';
	import { Facebook } from '@lucide/svelte';
	import Sharing from '$lib/Sharing.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import toast from 'svelte-french-toast';
	import { getReadingTime } from '$lib/utils';

	let { data }: { data: PageData } = $props();
	let copied = $state(false);
	let fullUrl = $state('');
	function getd(post_date: Date) {
		const date: Date = new Date(post_date);

		return date.toLocaleDateString();
	}
	onMount(() => {
		fullUrl = `${window.location.origin}${page.url.pathname}`;
	});
	async function copyToClipBoard() {
		try {
			await navigator.clipboard.writeText(fullUrl);
			copied = true;

			setTimeout(() => (copied = false), 2000);
			toast.success('Copied To ClipBoard');
		} catch (err) {
			toast.error('Something Went Wrong ');
		}
	}
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{getLocale() === 'ar' ? data.post.title_ar : data.post.title} | {m.company_name()}</title>
	<meta name="title" content={getLocale() === 'ar' ? data.post.title_ar : data.post.title} />
	<meta
		name="description"
		content={getLocale() === 'ar'
			? data.post.desc_ar.replace(/<[^>]+>/g, '').slice(0, 160)
			: data.post.desc.replace(/<[^>]+>/g, '').slice(0, 160)}
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:title" content={getLocale() === 'ar' ? data.post.title_ar : data.post.title} />
	<meta
		property="og:description"
		content={getLocale() === 'ar'
			? data.post.desc_ar.replace(/<[^>]+>/g, '').slice(0, 160)
			: data.post.desc.replace(/<[^>]+>/g, '').slice(0, 160)}
	/>
	<meta property="og:image" content={data.post.thumbnail} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={fullUrl} />
	<meta
		name="twitter:title"
		content={getLocale() === 'ar' ? data.post.title_ar : data.post.title}
	/>
	<meta
		name="twitter:description"
		content={getLocale() === 'ar'
			? data.post.desc_ar.replace(/<[^>]+>/g, '').slice(0, 160)
			: data.post.desc.replace(/<[^>]+>/g, '').slice(0, 160)}
	/>
	<meta name="twitter:image" content={data.post.thumbnail} />

	<!-- Canonical -->
	<link rel="canonical" href={fullUrl} />
</svelte:head>

<!-- Blog Article -->
<div class="mx-auto max-w-3xl px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-10">
	<div class="max-w-2xl">
		<!-- Avatar Media -->
		<div class="mb-6 flex items-center justify-between">
			<div class="flex w-full gap-x-5 sm:items-center sm:gap-x-3">
				<div class="shrink-0">
					<img class="size-12 rounded-full" src={logo} alt="Avatar" />
				</div>

				<div class="grow">
					<div class="flex items-center justify-between gap-x-2">
						<div>
							<div class="hs-tooltip inline-block [--placement:bottom] [--trigger:hover]">
								<div class="hs-tooltip-toggle block text-start sm:mb-1">
									<span class="font-semibold text-gray-800 dark:text-neutral-200">
										{m.company_name()}
									</span>
								</div>
							</div>

							<ul class="text-xs text-gray-500 dark:text-neutral-500">
								<li
									class="relative inline-block pe-6 before:absolute before:end-2 before:top-1/2 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-gray-300 last:pe-0 last-of-type:before:hidden dark:text-neutral-400 dark:before:bg-neutral-600"
								>
									{getd(data.post.created)}
								</li>
								<li
									class="relative inline-block pe-6 before:absolute before:end-2 before:top-1/2 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-gray-300 last:pe-0 last-of-type:before:hidden dark:text-neutral-400 dark:before:bg-neutral-600"
								>
									{getReadingTime(getLocale() === 'ar' ? data.post.desc_ar : data.post.desc, true)} min
									read
								</li>
							</ul>
						</div>

						<!-- Button Group -->
						<Sharing>
							<div
								class="shadow-2xs focus:outline-hidden inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
							>
								<Facebook />
								Facebook
							</div>
						</Sharing>
						<!-- End Button Group -->
					</div>
				</div>
			</div>
		</div>
		<!-- End Avatar Media -->

		<!-- Content -->
		<div class="space-y-5 md:space-y-8">
			<div class="space-y-3">
				<h2 class="text-2xl font-bold dark:text-white md:text-3xl">
					{getLocale() === 'ar' ? data.post.title_ar : data.post.title}
				</h2>

				<div class="text-lg text-gray-800 dark:text-neutral-200">
					{@html getLocale() === 'ar' ? data.post.desc_ar : data.post.desc}
				</div>
			</div>

			<figure>
				<img
					class="w-full rounded-xl object-cover"
					src={data.post.thumbnail}
					alt="Resine Creating "
				/>
				<figcaption class="mt-3 text-center text-sm text-gray-500 dark:text-neutral-500">
					Resin Dropping .
				</figcaption>
			</figure>
		</div>
		<!-- End Content -->
	</div>
</div>

<!-- End Blog Article -->

<!-- Sticky Share Group -->

<Sticky bind:likes={data.post.likes} {copyToClipBoard} />

<!-- End Sticky Share Group -->

<style>
	:global(body) {
		background-size: 150%;
	}
</style>
