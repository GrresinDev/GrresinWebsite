<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageProps } from './$types';
	import ProjectCard from '$lib/ProjectCard.svelte';

	let { data }: PageProps = $props();
	import {
		GlassWater,
		FlaskConical,
		Droplet,
		BrickWall,
		Home,
		type Icon as IconType
	} from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages';
	import Estiamtor from '$lib/Estiamtor.svelte';
	import { page } from '$app/state';

	const iconList: (typeof IconType)[] = [Home, BrickWall, Droplet, FlaskConical, GlassWater];
</script>

<svelte:head>
	<!-- Core Meta Tags -->
	<title>GRResin | Commercial & Residential Epoxy Flooring Projects</title>
	<meta
		name="description"
		content="GRResin transforms floors with epoxy, polyurethane, and decorative resins. Explore commercial warehouse coatings, residential garage floors, and before/after results."
	/>

	<!-- Open Graph (Facebook/LinkedIn) -->
	<meta property="og:title" content="GRResin Flooring Projects: Epoxy & Resin Solutions" />
	<meta
		property="og:description"
		content="From cracked concrete to glossy floors: See GRResin's commercial/residential projects using epoxy, polyaspartic, and metallic resins."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<!-- Primary Image (Before/After Collage) -->
	<meta property="og:image" content={data.recentProject.after_thumbnail} />
	<!-- Alternate Images (Optional) -->
	<meta property="og:image" content="https://grresin.com/images/commercial-warehouse-after.jpg" />
	<meta
		property="og:image"
		content="https://grresin.com/images/residential-garage-before-after.jpg"
	/>

	<!-- Keywords (Optional) -->
	<meta
		name="keywords"
		content="epoxy flooring, commercial resin floors, residential garage coating, polyurethane concrete, decorative resin, before and after flooring"
	/>
</svelte:head>

<section
	class="mb-16 w-full rounded-lg bg-gradient-to-br from-background to-card py-20 shadow-xl md:mb-24 md:py-32"
>
	<div class="container mx-auto px-4 text-center sm:px-6 lg:px-8">
		<h1 class="mb-6 text-4xl font-bold tracking-tight text-[#a71580] sm:text-5xl md:text-6xl">
			{m.mean_small_anteater_hush()}
		</h1>
		<p class="mx-auto mb-10 max-w-2xl text-lg text-foreground/80 sm:text-xl">
			{m.cool_long_sheep_tear()}
		</p>
		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button
				size="lg"
				class="bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105 hover:bg-primary/90"
			>
				<a href={localizeHref('/projects#all')}>{m.vexed_jolly_boar_blend()}</a>
			</Button>
			<Button
				variant="outline"
				size="lg"
				class="border-primary bg-[#a71580] text-primary shadow-md transition-transform hover:scale-105 hover:bg-primary hover:text-primary-foreground"
			>
				<a href={localizeHref('/projects#estimate')}>{m.stock_extra_leopard_blink()}</a>
			</Button>
		</div>
	</div>
</section>

<div class="my-10 text-center md:my-16">
	<h2 class="mb-3 text-3xl font-bold tracking-tight text-[#a71580] sm:text-4xl">
		{m.tame_novel_kestrel_adore()}
	</h2>
	<p class="text-md mx-auto max-w-2xl text-muted-foreground sm:text-lg">
		{m.true_sleek_loris_boost()}
	</p>
</div>

<section id="all" class="w-full py-16 md:py-24">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<Tabs.Root value="5zz0023y54et9rs" class="mb-8">
			<Tabs.List
				class=" grid h-auto w-full grid-cols-2 gap-2 rounded-lg bg-card p-2 sm:grid-cols-4"
			>
				{#each data.projectTypes as projectTypeConfig, i (projectTypeConfig.id)}
					{@const Icon = iconList[i]}

					<Tabs.Trigger
						value={projectTypeConfig.id}
						class="relative flex-1 px-2 py-2.5 text-sm font-bold uppercase transition-colors data-[state=active]:bg-[#a71580] data-[state=active]:text-primary-foreground data-[state=active]:shadow-md sm:text-base"
					>
						<Icon class="mr-2 hidden h-5 w-5 sm:inline-block" />

						{projectTypeConfig.types}
					</Tabs.Trigger>
				{/each}
			</Tabs.List>

			{#each data.projectTypes as projectTypeConfig (projectTypeConfig.id)}
				{@const projectsForThisTab =
					projectTypeConfig.types === 'all'
						? data.projects
						: data.projects.filter((project) => project.type === projectTypeConfig.id)}
				<Tabs.Content value={projectTypeConfig.id} class="mt-0">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8">
						{#each projectsForThisTab as project (project.id)}
							<ProjectCard {project} />
						{/each}
					</div>
					{#if projectsForThisTab.length === 0}
						<p class="mt-8 text-center text-lg text-muted-foreground">
							{m.fair_front_cat_aim()}
						</p>
					{/if}
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	</div>
</section>

<Estiamtor />
