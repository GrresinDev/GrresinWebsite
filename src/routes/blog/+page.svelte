<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoplay from 'embla-carousel-autoplay';
	import { Facebook, Instagram } from '@lucide/svelte';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime.js';
	import type { PageProps } from './$types';
	import { m } from '$lib/paraglide/messages';
	import { fly } from 'svelte/transition';
	import logo from '$lib/assets/images/Logo.png';
	import { page } from '$app/state';
	import Empty from '$lib/Empty.svelte';

	let { data }: PageProps = $props();
	const myBreadcrumbs = [
		{ label: 'Home', link: localizeHref('/') },
		{ label: 'Blog', link: localizeHref('/blog') }
	];
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{m.company_name()} Blogs | Resin Tips & Projects in Saudi Arabia</title>
	<meta name="title" content="{m.company_name()} Blogs | Resin Tips & Projects in Saudi Arabia" />
	<meta
		name="description"
		content="Explore resin art tutorials, epoxy tips, and DIY projects from {m.company_name()}, a leading resin products company based in Saudi Arabia."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://grresin.com/blogs" />
	<meta
		property="og:title"
		content="{m.company_name()} Blogs | Resin Tips & Projects in Saudi Arabia"
	/>
	<meta
		property="og:description"
		content="Explore resin art tutorials, epoxy tips, and DIY projects from {m.company_name()}, a leading resin products company based in Saudi Arabia."
	/>
	<meta property="og:image" content={logo} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://grresin.com/blogs" />
	<meta
		name="twitter:title"
		content="{m.company_name()} Blogs | Resin Tips & Projects in Saudi Arabia"
	/>
	<meta
		name="twitter:description"
		content="Explore resin art tutorials, epoxy tips, and DIY projects from {m.company_name()}, a leading resin products company based in Saudi Arabia."
	/>
	<meta name="twitter:image" content="https://grresin.com/og-cover.jpg" />

	<!-- Canonical -->
	<link rel="canonical" href="https://grresin.com/blogs" />
</svelte:head>

<div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
	<aside class="order-1 space-y-8 md:order-2">
		<div class="text-center">
			<img src={logo} alt="Graffiti Resin Logo" class="mx-auto mb-4 h-auto w-40" />

			<p class="text-sm text-gray-600">
				{m.welcomeDesc()}
			</p>
		</div>

		<div>
			<h3 class="mb-2 font-semibold">{m.brave_awake_pelican_amuse()}</h3>
			<ul class="space-y-2">
				<li>
					<a
						href="https://www.facebook.com/GraffitiResin/"
						class="flex items-center space-x-2 text-sm text-gray-700 hover:underline"
						><span><Facebook /></span> <span>Facebook</span></a
					>
				</li>
				<li>
					<a
						href="https://www.facebook.com/GraffitiResin/"
						class="flex items-center space-x-2 text-sm text-gray-700 hover:underline"
					>
						<span class="mx-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-twitter-x"
								viewBox="0 0 16 16"
							>
								<path
									d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
								/>
							</svg>
						</span>
						<span class="mx-1">X</span></a
					>
				</li>
				<li>
					<a
						href="https://www.instagram.com/graffitiresin/"
						class="flex items-center space-x-2 text-sm text-gray-700 hover:underline"
						><span><Instagram /></span> <span>Instagram</span></a
					>
				</li>
			</ul>
		</div>

		<div>
			<h3 class="mb-2 font-semibold">{m.cuddly_factual_lamb_quiz()}</h3>

			<!-- Fix starts here -->
			<div
				class="relative z-0 transform-gpu overflow-hidden transition-all hover:z-10 hover:scale-110"
			>
				<div class=" h-24 w-full bg-gray-300">
					<article
						class="flex transform-gpu flex-row space-x-4 space-y-0 transition-transform hover:z-10 hover:scale-110"
						in:fly|global={{ y: -200 }}
					>
						<a
							href={localizeHref(`/blog/${data.recentPost.slug}`)}
							class="flex w-full flex-row space-x-4 space-y-0 no-underline hover:no-underline"
						>
							<div class="h-24 flex-shrink-0 sm:w-32">
								<img class="h-full w-full" src={data.recentPost.thumbnail} alt="post" />
							</div>
							<div>
								<h4 class="font-semibold rtl:mx-2">
									{getLocale() === 'ar' ? data.recentPost.title_ar : data.recentPost.title}
								</h4>
								<p class="mb-2 line-clamp-2 text-lg text-gray-500 rtl:mx-2">
									{@html getLocale() === 'ar' ? data.recentPost.desc_ar : data.recentPost.desc}
								</p>
							</div>
						</a>
					</article>
				</div>
			</div>
			<!-- Fix ends here -->
		</div>
	</aside>

	<div class="order-2 md:order-1 md:col-span-2">
		<ol class="my-2 flex flex-row space-x-2">
			{#each myBreadcrumbs as crumb, i}
				<!-- If crumb index is less than the breadcrumb length minus 1 -->
				{#if i < myBreadcrumbs.length - 1}
					<li>
						<a href={crumb.link}>{crumb.label}</a>
					</li>
					<li>/</li>
				{:else}
					<li>{crumb.label}</li>
				{/if}
			{/each}
		</ol>

		<div class="mb-8 w-full overflow-hidden rounded-md">
			<Carousel.Root
				class="h-full w-full"
				opts={{
					direction: getLocale() === 'ar' ? 'rtl' : 'ltr'
				}}
				plugins={[
					Autoplay({
						delay: 5000
					})
				]}
			>
				<Carousel.Content class="aspect-video">
					{#each data.carouselImageUrls as image}
						<Carousel.Item>
							<img src={image} alt="old_project" class="h-full w-full object-cover" />
						</Carousel.Item>
					{/each}
				</Carousel.Content>

				<Carousel.Previous class="mx-20 h-8 w-8  text-white " />
				<Carousel.Next class="mx-20 h-8 w-8  text-white" />
			</Carousel.Root>
		</div>

		<h3 class="mb-6 text-2xl font-bold">{m.inclusive_active_gopher_talk()}</h3>

		<div class="space-y-8">
			<Empty items={data.posts}>
				{#each data.posts as post, i (post.id)}
					<article
						class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
						in:fly|global={{ x: -200 }}
					>
						<div class="h-24 w-full flex-shrink-0 sm:w-32">
							<img class="h-full w-full" src={post.thumbnail} alt="post" />
						</div>
						<div>
							<h4 class="font-semibold rtl:mx-2">
								{i + 1} &nbsp; {getLocale() === 'ar' ? post.title_ar : post.title}
							</h4>
							<p class="mb-2 line-clamp-3 text-lg text-gray-500 rtl:mx-2">
								{@html getLocale() === 'ar' ? post.desc_ar : post.desc}
							</p>
							<a href={localizeHref(`/blog/${post.slug}`)} class="text-sm text-blue-500"
								>{m.awful_fair_ibex_pause()}</a
							>
						</div>
					</article>
				{/each}
			</Empty>
		</div>
	</div>
</div>
