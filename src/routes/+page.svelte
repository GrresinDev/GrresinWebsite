<script lang="ts">
	/* 
sales to point of sales
start page sales point of project and out for arts with some description and then view it all
add an arts for bento grid 
products to art and art section adn scroll view 
projects to projects sectoin 
parteners: Logo Only



FAQS: Must Be Aan  ASK and answer form with ai an ?
"Ask Me ?" 


	
	*/
	import toast from 'svelte-french-toast';
	import { Button } from '$lib/components/ui/button/index.js';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import Hr from '$lib/components/HR.svelte';
	import { m } from '$lib/paraglide/messages';
	import art from '$lib/assets/images/art.webp?enhanced';
	import logo from '$lib/assets/images/Logo.png';
	import art_second from '$lib/assets/images/art_second.webp?enhanced';
	import partners from '$lib/assets/images/partners.png';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import GridCard from '$lib/GridCard.svelte';
	import CountUp from '$lib/components/CountUp.svelte';
	import ContactCarousel from '$lib/ContactCarousel.svelte';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import Faq from '$lib/components/Faq.svelte';
	import { page } from '$app/state';
	import Empty from '$lib/Empty.svelte';
	import { inview } from 'svelte-inview';
	import Cards from '$lib/Cards.svelte';
	import Clients from '$lib/components/Clients.svelte';

	let statview = $state(false);
	let loading = $state(false);

	let { data, form }: PageProps = $props();
	$effect(() => {
		if (form) {
			if (form?.success) {
				toast.success('It works!');
			} else {
				toast.error('Something Went Wrong!');
			}
		}
	});

	const CarouselPromise = import('$lib/components/Carousel.svelte');
</script>

<svelte:head>
	<title>Graffiti Resin | Resin Flooring & Artistic Resin Solutions in Saudi Arabia</title>
	<meta
		name="description"
		content="Graffiti Resin leads in resin-based flooring and decorative art solutions. Explore epoxy terrazzo, cement terrazzo, and high-performance coatings made in Saudi Arabia."
	/>

	<meta property="og:title" content="Graffiti Resin | Expert Resin Flooring & Art Solutions" />
	<meta
		property="og:description"
		content="Transforming surfaces with epoxy terrazzo, cement terrazzo, and resin art. Based in Saudi Arabia, Graffiti Resin delivers innovative, durable, and aesthetic solutions."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={logo} />

	<meta
		name="keywords"
		content="epoxy terrazzo Saudi Arabia, cement terrazzo, resin flooring, resin art, Graffiti Resin, decorative flooring, industrial resin floor"
	/>
</svelte:head>

<section id="Hero" class="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8" dir="ltr">
	<div class="container mx-auto">
		<div class="flex flex-col-reverse items-center gap-10 md:grid md:grid-cols-2 md:gap-16">
			<!-- Logo + Text -->
			<div class="w-full text-start md:order-1">
				<div class="flex w-full justify-center md:justify-start">
					<img
						class="mb-0 max-h-[300px] w-auto object-contain"
						src={logo}
						alt="Graffiti Resin Logo"
					/>
				</div>
				<div class="mt-4 p-2 text-start md:text-start">
					<h1
						class="myshadow mb-4 py-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl rtl:text-right"
					>
						{m.welcome()}<br />
						{m.welcomeHeader()}
						<hr class="mt-4 h-2 w-[100%] bg-[#a71580] rtl:mt-4" />
					</h1>
				</div>
			</div>

			<!-- Carousel -->
			<div class="flex w-full justify-center md:order-2">
				<div class="relative z-10 w-full max-w-[400px]">
					{#await CarouselPromise then M}
						{@const Carousel = M.default}
						<Carousel />
					{:catch error}
						<p>Failed to load carousel: {error.message}</p>
					{/await}
				</div>
			</div>
		</div>

		<!-- Description Paragraph -->
		<p
			style="white-space: pre-line"
			class="mx-auto hyphens-auto text-wrap px-2 text-justify text-xl md:text-2xl ltr:ml-0 ltr:text-left rtl:mr-0 rtl:text-right"
		>
			{m.welcomeDesc()}
		</p>
	</div>
</section>
<!--Bento Grid -->
<section class=" mt-12 flex w-full flex-col px-0 py-20 md:min-h-svh md:px-4 lg:px-8">
	<article class="h-full w-full px-2 md:p-20">
		<h1 class="  myshadow ml-11 w-fit text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
			{m.department()}<br />
			<hr class=" my-2 h-1 w-full bg-[#a71580]" />
		</h1>
		{#await import('$lib/components/layout/Grid/BentoGrid.svelte') then { default: BentoGrid }}
			<BentoGrid />
		{/await}
	</article>
</section>

<!--Intro-->

<section id="intro" class=" bg-[#a71580] py-20 text-white">
	<div class="container mx-auto px-4">
		<h1 class="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
			{m.service_header()}
		</h1>
		<br />
		<h2
			class="  w-fit text-ellipsis break-words text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
		>
			{m.service_body()}
			<Hr
				id="small"
				borderColor="border-gray-500"
				options={{
					rootMargin: '-10px',
					unobserveOnEnter: true
				}}
			/>
		</h2>

		<p class="text-bold my-8 mr-0 text-pretty text-justify text-3xl tracking-tighter">
			{m.service_desc()}
		</p>
	</div>
</section>

<!--Art Section-->

<section id="art" class="my-24 md:h-[25rem]">
	<div class="flex h-full flex-col gap-8 md:flex-row-reverse">
		<div class="  md:h-full md:basis-3/5">
			<enhanced:img
				class="h-full w-full rounded-r-3xl object-cover shadow-2xl shadow-blue-300 rtl:rounded-r-3xl"
				src={art}
				alt="resin Project"
			/>
		</div>

		<div class="mx-4 self-center break-words md:mt-40 md:basis-2/5">
			<div class="container max-w-full p-8">
				<h1 class="px-2 text-start text-3xl font-semibold md:text-5xl">
					{m.art_header()}
				</h1>
				<h2
					class="w-fit text-center text-2xl font-semibold tracking-wide sm:text-3xl md:tracking-tight lg:text-4xl"
				>
					{m.art_body()}
					<hr class="mx-2 h-2 w-full rounded-sm border-0 bg-blue-400 md:my-10" />
				</h2>
				<p
					class="text-bold my-6 text-pretty text-xl hover:line-clamp-none hover:max-h-[500px] md:my-8 md:line-clamp-6 md:text-2xl"
				>
					{m.art_desc()}
				</p>
			</div>
		</div>
	</div>
</section>

<section id="art_products">
	<ScrollArea orientation="horizontal">
		<div
			data-lenis-prevent
			class="flex touch-auto snap-x snap-mandatory flex-nowrap overflow-x-scroll"
			style="-webkit-overflow-scrolling: touch;"
		>
			<Empty items={data.art_products}>
				{#each data.art_products as product, i (product.id)}
					<article class="mx-2 min-h-[500px]">
						<Cards {i} {product} />
					</article>
				{/each}
			</Empty>
		</div>
	</ScrollArea>
</section>

<Empty items={data.art_products}>
	<div class="container mx-auto text-center text-3xl font-semibold tracking-widest text-[#a71580]">
		{m.mad_alert_porpoise_spin()}
	</div>
</Empty>

<section id="art" class="my-20">
	<div class="flex flex-col gap-8 md:h-[20rem] md:flex-row-reverse">
		<div class="h-48 drop-shadow-2xl md:h-full md:basis-3/5">
			<enhanced:img
				class="h-full w-full rounded-l-md object-cover drop-shadow-2xl"
				src={art_second}
				alt="resin Project"
			/>
		</div>
		<div class="container mx-auto self-center md:basis-2/5">
			<!-- Removed self-center on mobile -->
			<p class=" text-4xl font-bold md:text-5xl">
				<!-- Responsive text size -->
				{m.project_header()}<br />
				{m.project_body()}
			</p>

			<hr class=" mx-4 my-4 h-2 w-48 rounded-sm border-0 bg-blue-400 pl-10 md:my-10" />
		</div>
	</div>
</section>

<!--Project Section-->
<article id="Project Section" class="  my-9 px-4">
	<p
		class=" text-black-50/40 my-8 mr-0 whitespace-pre-line text-pretty p-2 text-xl font-thin leading-loose tracking-tighter drop-shadow-2xl md:text-3xl"
	>
		{m.project_section()}
	</p>
</article>

<section id="project_products" class="my-10 p-5">
	<Empty items={data.projects_productsWithImageUrls}>
		<div class="grid grid-cols-1 gap-8 text-center sm:p-3 md:grid-cols-2">
			{#each data.projects_productsWithImageUrls as project, i (project.id)}
				<GridCard {i} {project} />
			{/each}
		</div>
	</Empty>
</section>

<!--Partners Secttion-->
<section id="partner">
	<h1 class="  myshadow w-fit px-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
		{m.partner()}<br />
		<span class=" ms-9 text-left">
			Graffiti Resin
			<hr class="mr-14 h-2 w-full rounded-sm border-0 bg-blue-400 md:my-10" />
		</span>
	</h1>

	<Clients partner={data.partenerWithThumb}/>
</section>

<!--Statics Section-->
<section
	id="statics"
	use:inview={{ rootMargin: '-50px', unobserveOnEnter: true }}
	oninview_change={(event) => {
		const { inView } = event.detail;
		statview = inView;
	}}
>
	<div class=" mx-auto w-full max-w-7xl p-4 py-16 md:py-24">
		<h1
			class="font-heading myshadow my-5 w-fit px-3 text-start text-5xl font-bold tracking-tight drop-shadow-md md:text-6xl lg:text-7xl"
		>
			{m.goals()} .

			<hr class=" my-2 h-2 w-full bg-blue-400" />
		</h1>

		<CountUp reloade={statview} />
	</div>
</section>

<section id="faq" class="my-4">
	<Empty items={data.faq}>
		<Faq faq={data.faq} />
	</Empty>
</section>

<!--Contact Section-->
<section class="my-4">
	<div class=" flex-row-reverse overflow-hidden rounded-lg shadow-xl lg:flex">
		<div class="flex w-full items-center justify-start p-8 lg:w-1/2 ltr:pr-0 rtl:pl-0">
			<ContactCarousel />
		</div>

		<div class="w-full p-8 lg:w-1/2 lg:p-12">
			<h2 class="myshadow font-heading mb-3 w-fit text-start text-3xl font-bold md:text-5xl">
				{m.contact()}
				<hr class="ml-auto mt-2 block h-1 w-full bg-blue-400" />
			</h2>
			<p class="mb-8 whitespace-pre-line text-start text-gray-600">
				{m.contact_desc()}
			</p>

			<form
				method="POST"
				class="space-y-5"
				use:enhance={() => {
					loading = true;
					return ({ update }) => {
						update({ invalidateAll: false }).finally(async () => {
							loading = false;
						});
					};
				}}
			>
				<div class="relative">
					<label for="email" class="sr-only">Your Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder={m.jumpy_long_termite_spur()}
						class="w-full rounded-md border border-gray-200 py-3 pl-4 pr-12 text-start text-black placeholder-gray-500 hover:bg-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<p class="h-1 text-red-500">
					{#if form?.validation?.email}
						{m.loved_sour_skate_clap()}
					{/if}
				</p>
				<div class="relative">
					<label for="subject" class="sr-only">{m.hour_patient_sloth_hack()}</label>
					<input
						type="text"
						id="subject"
						name="subject"
						placeholder={m.gross_wide_canary_sew()}
						class="w-full rounded-md border border-gray-200 py-3 pl-4 pr-12 text-start text-black placeholder-gray-500 hover:bg-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<p class="h-1 text-red-500">
					{#if form?.validation?.subject}
						{m.sad_neat_piranha_sail()}
					{/if}
				</p>
				<div class="relative">
					<label for="message" class="sr-only">{m.fluffy_aware_shell_offer()}</label>
					<input
						type="text"
						id="message"
						name="message"
						placeholder={m.knotty_stale_piranha_transform()}
						class="w-full rounded-md border border-gray-200 py-3 pl-4 pr-12 text-start text-black placeholder-gray-500 hover:bg-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<p class="h-1 text-red-500">
					{#if form?.validation?.message}
						{m.mushy_tangy_dingo_pat()}
					{/if}
				</p>

				<div>
					<Button
						id="contact"
						disabled={loading}
						type="submit"
						class="w-full rounded-md bg-blue-400 px-4 py-3 font-bold text-white transition duration-150 ease-in-out hover:bg-[#a71580] focus:outline-none focus:ring-2 focus:ring-[#a71580] focus:ring-offset-2"
					>
						{#if loading}
							<LoaderCircle class="animate-spin" />
						{/if}
						{m.jolly_male_warthog_vent()}
					</Button>
				</div>
			</form>
		</div>
	</div>
</section>

<style>
	.myshadow {
		text-shadow: 2px 2px #a715805b;
	}
</style>
