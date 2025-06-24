<script lang="ts">
	import type { ProjecctTypeModel, ProjectWithThumbNail } from '$lib/interface/project'; // Ensure ProjectWithThumbNail is imported
	import { GlassWater, FlaskConical, Droplet, BrickWall, Home } from '@lucide/svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageData } from './$types'; // Correct type for page data
	import ProjectCard from '$lib/ProjectCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import { fade } from 'svelte/transition';
	import Loader from '$lib/Loader.svelte';

	
	let { data }: { data: PageData } = $props();

	let activeTabId = $state(
		data.projectTypes.find((pt: ProjecctTypeModel) => pt.types === 'all')?.id ||
			data.projectTypes[0]?.id
	);



	$effect(() => {
		
		const initialTab = data.projectTypes.find((pt: ProjecctTypeModel) => pt.types === 'all')?.id;
		if (initialTab) {
			activeTabId = initialTab;
		} else if (data.projectTypes.length > 0) {
			activeTabId = data.projectTypes[0].id;
		}
	});

	const iconMap: Record<string, typeof Home> = {
		[data.projectTypes.find((pt: ProjecctTypeModel) => pt.types === 'all')?.id || '']: Home
	};

	const getIcon = (typeId: string, index: number) => {
		return iconMap[typeId] || [BrickWall, Droplet, FlaskConical, GlassWater][index % 4];
	};

	function onTabChange(value: string) {
		activeTabId = value;
	}
</script>

<svelte:head>
	<title>{m.mean_small_anteater_hush()} | {m.company_name()} Projects</title>
	<meta name="title" content="{m.mean_small_anteater_hush()} | {m.company_name()} Projects" />
	<meta
		name="description"
		content="Browse our resin project portfolio by type or material. Explore transformations in flooring, tables, decor and more by {m.company_name()} across Saudi Arabia."
	/>
	<meta
		name="keywords"
		content="resin projects, epoxy installations, resin flooring, epoxy furniture, project filters, Saudi Arabia resin company, {m.company_name()}"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://grresin.com/projects" />
	<meta property="og:title" content="{m.mean_small_anteater_hush()} | {m.company_name()}" />
	<meta
		property="og:description"
		content="Filter and explore a wide variety of completed resin projects by type, application, and material. Perfect for design inspiration."
	/>
	<meta property="og:image" content="https://grresin.com/og-image/projects-cover.jpg" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://grresin.com/projects" />
	<meta name="twitter:title" content="{m.mean_small_anteater_hush()} | {m.company_name()}" />
	<meta
		name="twitter:description"
		content="Discover before-and-after visuals of premium resin projects by {m.company_name()} – tailored by resin type and material."
	/>
	<meta name="twitter:image" content="https://grresin.com/og-image/projects-cover.jpg" />

	<link rel="canonical" href="https://grresin.com/projects" />
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
				class="bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105 hover:bg-[#a71580]"
			>
				<a href={localizeHref(`/projects#${activeTabId}`)}>{m.vexed_jolly_boar_blend()}</a>
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
		<Tabs.Root value={activeTabId} onValueChange={onTabChange}  class="mb-8">
			<Tabs.List
				class=" grid h-auto w-full grid-cols-2 gap-2 rounded-lg bg-card p-2 sm:grid-cols-4"
			>
				{#each data.projectTypes as projectTypeConfig, i (projectTypeConfig.id)}
					{@const Icon = getIcon(projectTypeConfig.id, i)}
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
				<Tabs.Content value={projectTypeConfig.id} class="mt-0">
					{#await data.projects}
						<div class="flex h-full w-full items-center justify-center">
							<Loader />
						</div>
					{:then resolvedProjects}
						{@const filteredProjects = (() => {
							const selectedProjectType = data.projectTypes.find(
								(pt: ProjecctTypeModel) => pt.id === activeTabId
							);

							if (selectedProjectType?.types === 'all') {
								return resolvedProjects; // Use the resolved projects
							} else {
								return resolvedProjects.filter((project) => project.type === activeTabId);
							}
						})()}

						<div
							class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8"
							in:fade={{ delay: 100, duration: 200 }}
						>
							{#each filteredProjects as project (project.id)}
								<ProjectCard {project} />
							{/each}
						</div>
						{#if filteredProjects.length === 0}
							<p class="mt-8 text-center text-lg text-muted-foreground">
								{m.fair_front_cat_aim()}
							</p>
						{/if}
					{:catch error}
						<div class="py-8 text-center">
							<p class="text-lg text-red-600">Failed to load projects: {error.message}</p>
							<p class="text-muted-foreground">Please try refreshing the page.</p>
						</div>
					{/await}
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	</div>
</section>

<div class="min-h-[10rem]"></div>
