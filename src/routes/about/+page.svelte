<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	import Review from '$lib/Review.svelte';
	import logo from '$lib/assets/images/Logo.png';

	import TimelineCard from '$lib/TimelineCard.svelte';
	import {
		Building,
		Factory,
		Lock,
		Mail,
		Milestone,
		Rocket,
		ShieldPlus,
		TestTubeDiagonal,
		Trophy
	} from '@lucide/svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';

	let { data }: { data: PageData } = $props();

	const timelineData = [
		{
			id: 'event1',
			date: '2018',
			title: 'Company Inception in KSA',
			description:
				'ResinTransform established its presence in Saudi Arabia, focusing on specialized resin flooring.',
			Icon: Rocket
		},
		{
			id: 'event2',
			date: '2020',
			title: 'First Major Commercial Project',
			description:
				'Successfully completed a large-scale epoxy flooring project for a prestigious Riyadh business park.',
			Icon: Building
		},
		{
			id: 'event3',
			date: '2022',
			title: 'Expansion to Industrial Sector',
			description:
				'Expanded services to cater to the demanding needs of industrial clients in Dammam and Jubail.',
			Icon: Factory
		},
		{
			id: 'event4',
			date: '2023',
			title: 'Recognition for Quality',
			description:
				'Received industry award for outstanding quality and innovation in resin flooring solutions in the GCC region.',
			Icon: Trophy
		},
		{
			id: 'event5',
			date: 'Ongoing',
			title: 'Commitment to Vision 2030',
			description:
				"Aligning our growth and sustainability practices with Saudi Arabia's Vision 2030.",
			Icon: Milestone
		}
	];
	const workwithusData = [
		{
			header: 'Secure in Every Step',
			Icon: Lock,
			body: 'From mixing to final touches, our resins are designed for safe, controlled use in real-world environments. We focus on reducing risks during application — with low-VOC formulas, anti-drip properties, and packaging built for clean, easy handling. Your workflow stays safe, smooth, and mess-free.'
		},
		{
			header: 'Crafted In-House',
			Icon: TestTubeDiagonal,
			body: 'Every component in our resin formulas is developed, tested, and manufactured by our team. Unlike other brands that rely on generic mixes, we control every ingredient to ensure premium performance, clarity, and weather resistance. We’re makers — not just distributors.'
		},
		{
			header: 'Built for Safety',
			Icon: ShieldPlus,
			body: "We prioritize your safety at every level. Our graffiti resin products are non-toxic, low-odor, and engineered to meet the highest standards of durability and environmental care. Whether you're a street artist or a muralist, you can create confidently knowing our resins are safe for both you and your surroundings."
		}
	];
</script>

<svelte:head>
	<title>About Graffiti Resin | Leaders in Resin Innovation in Saudi Arabia</title>
	<meta
		name="description"
		content="Learn about Graffiti Resin – our story, values, and mission to innovate flooring and artistic resin solutions with epoxy terrazzo, cement terrazzo, and creative products."
	/>

	<meta
		property="og:title"
		content="Meet Graffiti Resin: Saudi Arabia’s Resin Flooring & Art Experts"
	/>
	<meta
		property="og:description"
		content="With a vision rooted in quality and design, Graffiti Resin pioneers artistic and functional resin surfaces across the region."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={logo} />

	<meta
		name="keywords"
		content="about Graffiti Resin, Saudi epoxy company, resin floor specialists, cement terrazzo team, resin design experts, resin flooring history"
	/>
</svelte:head>

<div id="hero" class=" relative z-0 py-16 md:pb-20 md:pt-32">
	<div class="container mx-auto px-4 xl:max-w-6xl">
		<div class="-mx-4 flex flex-row flex-wrap justify-center">
			<!-- content -->
			<div
				class="lg:px-18 w-full max-w-full flex-shrink self-center px-4 sm:w-9/12 sm:px-12 lg:w-1/2"
			>
				<img src={logo} class="h-auto w-full max-w-full" alt="creative agency" />
			</div>
			<!-- end content -->

			<!-- text -->
			<div class="w-full max-w-full flex-shrink self-center px-4 md:w-9/12 lg:w-1/2 lg:pr-12">
				<div class="mt-6 text-center lg:mt-0 lg:text-left">
					<div class="mb-12">
						<h1 class="mb-4 text-4xl font-bold leading-normal text-black">
							We are Graffiti Resin <br />
						</h1>
						<p class="mx-auto pb-2 text-xl font-light leading-relaxed text-gray-500">
							We firmly believe in the power of art and the spirit of giving. Our specialization is
							evident in the sale and manufacturing of resin products
						</p>
					</div>

					<Button class=" mx-2 min-w-52 bg-white text-lg font-semibold"
						><Mail class="mr-2 size-4" />Work With us</Button
					>
					<Button class="min-w-52 bg-[#a71580] text-lg  font-semibold text-white hover:text-black">
						<Mail class="mr-2 size-4" />Contact Us</Button
					>
				</div>
			</div>
		</div>
	</div>
</div>

<Review reviews={data.reviews} />

<section class="my-8 shadow-md">
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
		<div class="mb-8 max-w-screen-md lg:mb-16">
			<h2 class="mb-4 text-4xl font-extrabold tracking-tight text-[#a71580]">
				What Makes Us Special
			</h2>
			<p class="text-gray-500 dark:text-gray-400 sm:text-xl">
				Prequalification, practice, technical support in addition to keen supervision on our sites
				Our products are fumeless, odorless, non-toxic and flame resistant.
			</p>
		</div>
		<div class="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
			{#each workwithusData as text}
				{@const Icon = text.Icon}
				<div class="p-8 shadow-2xl">
					<div
						class="dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-300 lg:h-12 lg:w-12"
					>
						<Icon />
					</div>
					<h3 class="mb-2 text-xl font-bold text-[#a71580]">{text.header}</h3>
					<p class=" text-gray-600">
						{text.body}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="timeline" class="w-full py-16 md:py-24">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<section
			class="mb-16 w-full rounded-lg bg-gradient-to-br from-background to-card py-20 md:mb-24 md:py-32"
		>
			<div class="container mx-auto px-4 text-center sm:px-6 lg:px-8">
				<h1 class="mb-6 text-4xl font-bold tracking-tight text-[#a71580] sm:text-5xl md:text-6xl">
					Our Journey in KSA
				</h1>
				<p class="mx-auto mb-10 max-w-2xl text-lg text-foreground/80 sm:text-xl">
					Key milestones that mark our growth and commitment in Saudi Arabia.
				</p>
			</div>

			<div class="relative">
				{#each timelineData as event, index (event.id)}
					<TimelineCard {event} isLast={index === timelineData.length - 1} />
				{/each}
			</div>
		</section>
	</div>
</section>
